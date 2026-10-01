import React, { useEffect, useRef, useState } from "react";
import { Button, Screen, Section, Text } from "./components";
import { runModelBench, type BenchProgress } from "../bench/modelBench";
import type { BenchRequest } from "../bench/modelBench.pure";

/**
 * The model benchmark a development machine asked for (scripts/bench-iphone.mjs). Text only, no
 * animation: anything that redraws competes with llama.cpp for the CPU it is measuring.
 */
export function BenchScreen({ request, onClose }: { request: BenchRequest; onClose: () => void }) {
  const [progress, setProgress] = useState<BenchProgress | null>(null);
  const [outcome, setOutcome] = useState<{ ok: boolean; text: string } | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    runModelBench(request, setProgress)
      .then((uri) => setOutcome({ ok: true, text: `Saved ${uri.split("/").pop()}` }))
      .catch((e: any) => setOutcome({ ok: false, text: e?.message ?? String(e) }));
  }, [request]);

  const last = progress?.last;
  return (
    <Screen edges={["top", "bottom", "left", "right"]}>
      <Section title="Model benchmark">
        <Text variant="callout">{request.requestId}</Text>
        <Text variant="footnote" color="secondary">
          {request.configs.length} configs × {request.reps} reps · pp {request.pp} · tg {request.tg} · cool to {request.coolUntil}
        </Text>
      </Section>
      <Section title="Progress">
        <Text variant="body">
          {progress ? `${progress.completed}/${progress.total} · ${progress.current}` : "Starting…"}
        </Text>
        <Text variant="footnote" color="secondary">Thermal: {progress?.thermal ?? "…"}</Text>
        {last ? (
          <Text variant="footnote" color={last.ok ? "secondary" : "danger"}>
            {last.ok
              ? `Last: ${last.configId} · pp ${last.ppTps?.toFixed(1)} t/s · tg ${last.tgTps?.toFixed(1)} t/s · load ${last.loadMs} ms`
              : `Last: ${last.configId} failed: ${last.error}`}
          </Text>
        ) : null}
      </Section>
      {outcome ? (
        <Section title={outcome.ok ? "Done" : "Failed"}>
          <Text variant="footnote" color={outcome.ok ? "success" : "danger"}>
            {outcome.text}
          </Text>
          <Button label="Back to chat" variant="secondary" onPress={onClose} />
        </Section>
      ) : null}
    </Screen>
  );
}
