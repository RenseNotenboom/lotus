import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme/tokens";
import { PrimaryAction } from "../../ui/PrimaryAction";
import { SurfaceCard } from "../../ui/SurfaceCard";
import type { DashboardHeroModel } from "./presenter";

type PredictionHeroProps = {
  model: DashboardHeroModel;
  onPrimaryAction(): void;
  onSecondaryAction(): void;
};

export function PredictionHero({ model, onPrimaryAction, onSecondaryAction }: PredictionHeroProps) {
  const isIdle = model.mode === "idle";

  return (
    <SurfaceCard>
      <View style={styles.wrap}>
        <Text style={styles.kicker}>{isIdle ? "Recommended next nap" : "Nap in progress"}</Text>

        {isIdle ? (
          <View style={styles.recommendationRow}>
            <Text style={styles.time}>{model.recommendedTimeLabel}</Text>
            <Text style={styles.countdown}>{model.countdownLabel}</Text>
          </View>
        ) : (
          <Text style={styles.activeMain}>{model.mainText}</Text>
        )}

        {model.confidenceLabel ? <Text style={styles.confidence}>{model.confidenceLabel}</Text> : null}
        {model.reason ? <Text style={styles.reason}>{model.reason}</Text> : <Text style={styles.reason}>{model.subText}</Text>}

        <PrimaryAction label={model.primaryLabel} onPress={onPrimaryAction} />
        {model.secondaryLabel ? (
          <PrimaryAction label={model.secondaryLabel} onPress={onSecondaryAction} tone="secondary" />
        ) : null}
      </View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: theme.spacing.md
  },
  kicker: {
    color: theme.colors.ink.muted,
    fontFamily: theme.type.family.ui,
    fontSize: theme.type.size.small,
    textTransform: "uppercase",
    letterSpacing: 0.8
  },
  recommendationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  time: {
    color: theme.colors.ink.strong,
    fontFamily: theme.type.family.display,
    fontSize: theme.type.size.hero
  },
  countdown: {
    color: theme.colors.ink.default,
    fontFamily: theme.type.family.ui,
    fontSize: theme.type.size.h2
  },
  activeMain: {
    color: theme.colors.ink.strong,
    fontFamily: theme.type.family.display,
    fontSize: theme.type.size.h1
  },
  confidence: {
    alignSelf: "flex-start",
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surface.subtle,
    color: theme.colors.ink.default,
    fontFamily: theme.type.family.ui,
    fontSize: theme.type.size.small,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md
  },
  reason: {
    color: theme.colors.ink.muted,
    fontFamily: theme.type.family.body,
    fontSize: theme.type.size.body
  }
});
