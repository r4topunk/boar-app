import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, { Easing, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { useTheme } from "../theme";
import { CURVE, type Curve } from "../theme/motionSpec";
import { MOTION_PROBE, probe } from "./motionProbe";
import { REST, boundsAfter, boundsAtStart, hideFrom, revealDeadline, revealMove, revealOnLayout, revealTiming, type RevealMove } from "./revealTiming";

const curves: Record<Curve, ReturnType<typeof Easing.bezier>> = {
  standard: Easing.bezier(...CURVE.standard),
  enter: Easing.bezier(...CURVE.enter),
  exit: Easing.bezier(...CURVE.exit),
};

/**
 * A block of the answer that enters and leaves without a jump (SEND-MOTION D2). Its frame's height
 * animates on the UI thread, so the list below and the scroll anchored at the end follow it frame by
 * frame; Reanimated's `layout` only moves the drawing while the list's size changes at once. Durations
 * and curves are the DS roles (revealTiming → motionSpec).
 *
 * SAFETY (BUG-reveal-empty, iPhone 13 f7e8eb2): the frame never hides content that is shown. It moves
 * min/max height bounds, never `height`, and every move of a shown block ends at REST (no clamp), so
 * content that grows later (streamed text) is never cut, even if Fabric keeps the last animated value.
 * If a move or the first measurement isn't over by revealDeadline(), REST is forced.
 * At rest the block is its content's height: later changes (a fold opening) follow at once, animated by
 * the DS's animateNextLayout where the caller asks for it.
 *
 * - `shown`: false collapses it and then unmounts the content (the last content stays while it closes).
 * - `appear`: grows from 0 on its first layout (asked in this run); false shows it in place (history).
 *   A block that mounts hidden and shows later always grows.
 * - `spaceBefore`: the gap above it, inside the moving frame (a parent's `gap` would outlive it).
 */
export function Reveal({
  shown = true,
  appear = true,
  spaceBefore = 0,
  probeId,
  children,
}: {
  shown?: boolean;
  appear?: boolean;
  spaceBefore?: number;
  /** TEMPORARY (motionProbe): names this block in the device log. */
  probeId?: string;
  children?: ReactNode;
}) {
  const { reduceMotion } = useTheme();
  const [mounted, setMounted] = useState(shown);
  const grows = useRef(appear || !shown).current;
  const natural = useRef<number | null>(null);
  const minHeight = useSharedValue(REST.minHeight);
  const maxHeight = useSharedValue(grows ? 0 : REST.maxHeight);
  const opacity = useSharedValue(grows ? 0 : 1);
  const moving = useRef(false);
  const last = useRef<ReactNode>(children);
  if (shown) last.current = children;
  const shownRef = useRef(shown);
  shownRef.current = shown;

  // The safety net: once over (or past the deadline) a shown block is at REST and opaque; a hidden one unmounts.
  const deadline = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Each move has an id; only the latest one may end the block's motion. A settle queued by an older move
  // (its animation finished on the UI thread just as a hide began) unmounted the hiding block at once:
  // the declined text and its sources "vanished in one frame" on the iPhone (v9, F2-2).
  const runId = useRef(0);
  const settle = useCallback((id?: number) => {
    if (probeId) probe("reveal.settle", { block: probeId, id, current: runId.current, shown: shownRef.current, stale: id != null && id !== runId.current });
    if (id != null && id !== runId.current) return;
    moving.current = false;
    if (deadline.current) clearTimeout(deadline.current);
    deadline.current = null;
    if (shownRef.current) {
      minHeight.value = REST.minHeight;
      maxHeight.value = REST.maxHeight;
      opacity.value = 1;
    } else {
      setMounted(false);
    }
  }, [minHeight, maxHeight, opacity]);
  const arm = useCallback(
    (ms: number, id?: number) => {
      if (deadline.current) clearTimeout(deadline.current);
      deadline.current = setTimeout(() => {
        if (probeId) probe("reveal.deadline", { block: probeId, id, ms });
        settle(id);
      }, ms);
    },
    [settle]
  );
  useEffect(
    () => () => {
      if (deadline.current) clearTimeout(deadline.current);
    },
    []
  );

  const run = useCallback(
    (move: RevealMove, show: boolean) => {
      const timing = revealTiming(show, reduceMotion);
      const start = boundsAtStart(move);
      const end = boundsAfter(move);
      const bound = move.bound === "maxHeight" ? maxHeight : minHeight;
      const id = ++runId.current;
      if (probeId)
        probe("reveal.run", { block: probeId, id, show, bound: move.bound, from: move.from, to: move.to, moving: moving.current, maxNow: maxHeight.value, minNow: minHeight.value, natural: natural.current });
      if (!show) {
        // A hide starts from what shows now, never from a grow's unbounded cap (hideFrom).
        minHeight.value = REST.minHeight;
        maxHeight.value = hideFrom(move.from, maxHeight.value);
      } else if (!moving.current) {
        // A grow retargeted while it runs keeps going from where it is.
        minHeight.value = start.minHeight;
        maxHeight.value = start.maxHeight;
      }
      moving.current = true;
      bound.value = withTiming(move.to, { duration: timing.height.duration, easing: curves[timing.height.curve] }, (finished) => {
        if (!finished) return;
        minHeight.value = end.minHeight;
        maxHeight.value = end.maxHeight;
        scheduleOnRN(settle, id);
      });
      opacity.value = withTiming(show ? 1 : 0, { duration: timing.opacity.duration, easing: curves[timing.opacity.curve] });
      arm(revealDeadline(timing), id);
    },
    [reduceMotion, minHeight, maxHeight, opacity, arm, settle]
  );

  useEffect(() => {
    if (probeId) probe("reveal.shown", { block: probeId, shown, natural: natural.current, mounted, maxNow: maxHeight.value, moving: moving.current });
    if (shown) {
      setMounted(true);
      // Shown again after a hide: grow back to the last measure (the next layout retargets it).
      if (natural.current != null && maxHeight.value !== REST.maxHeight) run(revealMove("show", 0, natural.current)!, true);
      // Growing and not measured yet: the deadline shows it even if no layout ever comes.
      else if (grows && natural.current == null) arm(revealDeadline(revealTiming(true, reduceMotion)));
      return;
    }
    if (natural.current == null) {
      // Never measured: no height to fold, but still no cut. Fade out, then go.
      const id = ++runId.current;
      const timing = revealTiming(false, reduceMotion);
      opacity.value = withTiming(0, { duration: timing.opacity.duration, easing: curves[timing.opacity.curve] }, (finished) => {
        if (finished) scheduleOnRN(settle, id);
      });
      arm(revealDeadline(timing), id);
      return;
    }
    run(revealMove("hide", null, natural.current)!, false);
    // Only on a change of `shown`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const next = e.nativeEvent.layout.height;
      const step = revealOnLayout(natural.current, next, grows, spaceBefore);
      if (probeId) probe("reveal.layout", { block: probeId, next, natural: natural.current, step, shown: shownRef.current, moving: moving.current });
      if (step === "wait") return;
      const previous = natural.current;
      natural.current = next;
      if (!shownRef.current) return;
      if (step === "grow") return run(revealMove("grow", null, next)!, true);
      // A grow still running follows its content (streamed text); at rest nothing clamps it.
      if (step === "resize" && moving.current && next > (previous ?? 0)) run(revealMove("grow", null, next)!, true);
    },
    [grows, run, spaceBefore]
  );

  const style = useAnimatedStyle(() => ({ minHeight: minHeight.value, maxHeight: maxHeight.value, opacity: opacity.value }));

  // TEMPORARY probe: mount/unmount, the bounds as the UI thread moves them, the frame's real height per commit.
  useEffect(() => {
    if (!probeId) return;
    probe("reveal.mount", { block: probeId, shown, grows });
    return () => probe("reveal.unmount", { block: probeId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logBounds = useCallback((max: number, min: number, op: number) => {
    if (probeId) probe("reveal.bounds", { block: probeId, max, min, op });
  }, [probeId]);
  useAnimatedReaction(
    () => [maxHeight.value, minHeight.value, opacity.value] as const,
    (now, before) => {
      if (MOTION_PROBE && probeId && (!before || now[0] !== before[0] || now[1] !== before[1] || now[2] !== before[2])) {
        scheduleOnRN(logBounds, now[0], now[1], now[2]);
      }
    },
    [probeId, logBounds]
  );
  const onFrameLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (probeId) probe("reveal.frame", { block: probeId, height: e.nativeEvent.layout.height });
    },
    [probeId]
  );

  const content = useMemo(() => (shown ? children : last.current), [shown, children]);
  if (!mounted && !shown) return null;
  return (
    <Animated.View
      onLayout={probeId ? onFrameLayout : undefined}
      style={[{ overflow: "hidden" }, style]}
      pointerEvents={shown ? "auto" : "none"}
      importantForAccessibility={shown ? "auto" : "no-hide-descendants"}
      accessibilityElementsHidden={!shown}
    >
      {/* Its own natural height even inside a shorter frame: that's what the frame opens to. */}
      <View onLayout={onLayout} style={{ paddingTop: spaceBefore }}>
        {content}
      </View>
    </Animated.View>
  );
}
