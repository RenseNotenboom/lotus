import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/tokens";

type StatChipProps = {
  label: string;
  value: string;
};

export function StatChip({ label, value }: StatChipProps) {
  return (
    <View style={styles.chip}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface.subtle,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.xs
  },
  label: {
    fontFamily: theme.type.family.ui,
    fontSize: theme.type.size.micro,
    color: theme.colors.ink.muted
  },
  value: {
    fontFamily: theme.type.family.ui,
    fontSize: theme.type.size.body,
    color: theme.colors.ink.strong,
    fontWeight: theme.type.weight.semibold
  }
});