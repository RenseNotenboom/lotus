import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../theme/tokens";

export function SurfaceCard({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    backgroundColor: theme.colors.surface.card,
    padding: theme.spacing.lg,
    ...theme.elevation.card
  }
});