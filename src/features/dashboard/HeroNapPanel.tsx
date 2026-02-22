import { StyleSheet, Text, View } from "react-native";
import { PrimaryAction } from "../../ui/PrimaryAction";
import { SurfaceCard } from "../../ui/SurfaceCard";
import { theme } from "../../theme/tokens";
import type { DashboardHeroModel } from "./presenter";

type HeroNapPanelProps = {
  model: DashboardHeroModel;
  onPrimaryAction(): void;
};

export function HeroNapPanel({ model, onPrimaryAction }: HeroNapPanelProps) {
  return (
    <SurfaceCard>
      <View style={styles.wrap}>
        <Text style={styles.kicker}>{model.mode === "active" ? "Nap in progress" : "Recommended next nap"}</Text>
        <Text style={styles.main}>{model.mainText}</Text>
        <Text style={styles.sub}>{model.subText}</Text>
        <PrimaryAction label={model.primaryLabel} onPress={onPrimaryAction} />
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
  main: {
    color: theme.colors.ink.strong,
    fontFamily: theme.type.family.display,
    fontSize: theme.type.size.h1
  },
  sub: {
    color: theme.colors.ink.muted,
    fontFamily: theme.type.family.body,
    fontSize: theme.type.size.body
  }
});