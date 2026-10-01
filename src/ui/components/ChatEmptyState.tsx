/**
 * The empty chat, after the new UI: the boar, the name and a tagline, then a few short questions to
 * start with (chat/suggestions.ts picks the ones checked for this model and language). Tap sends;
 * long-press puts the question in the input box to edit.
 */
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Text } from "./AppText";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { spacing } from "../theme/spacing";

interface Props {
  /** Keys (q2, q8…) from suggestionsFor. */
  suggestions: string[];
  onAsk: (question: string) => void;
  onFill: (question: string) => void;
}

export function ChatEmptyState({ suggestions, onAsk, onFill }: Props) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Image source={require("../../../assets/boar.png")} style={styles.mascot} resizeMode="contain" />
        <Text style={styles.wordmark}>BOAR</Text>
        <Text style={styles.tagline}>{t("chat.empty.tagline")}</Text>
      </View>
      {suggestions.length > 0 && (
        <View style={styles.list}>
          <Text style={styles.label}>{t("chat.empty.suggestionsLabel")}</Text>
          {suggestions.map((k) => {
            const q = t(`chat.suggestions.${k}`);
            return (
              <Pressable
                key={k}
                style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
                onPress={() => onAsk(q)}
                onLongPress={() => onFill(q)}
                accessibilityRole="button"
                accessibilityLabel={t("chat.empty.ask", { question: q })}
                accessibilityHint={t("chat.empty.fill")}
              >
                <Text style={styles.topic}>{t(`chat.suggestionTopics.${k}`)}</Text>
                <Text style={styles.question}>{q}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, gap: spacing.md, paddingTop: spacing.lg },
  hero: { alignItems: "center", gap: 6, paddingBottom: spacing.sm },
  mascot: { width: 96, height: 96 },
  wordmark: { ...typography.ui.headline, color: colors.text.heading },
  tagline: { ...typography.ui.subtext, fontWeight: "500", color: colors.text.accentEmerald, textAlign: "center" },
  list: { gap: spacing.sm },
  label: { ...typography.ui.caption, color: colors.text.secondary, paddingHorizontal: spacing.xs },
  // Flat cards, told apart from the background by a lighter fill, as in the new UI.
  card: { backgroundColor: colors.bg.card, borderRadius: 18, paddingHorizontal: spacing.base, paddingVertical: spacing.md, gap: 4 },
  cardPressed: { backgroundColor: colors.bg.cardHover },
  topic: { ...typography.ui.caption, fontWeight: "600", color: colors.text.accentEmerald },
  question: { ...typography.ui.body, color: colors.text.primary },
});
