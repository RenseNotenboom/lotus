import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/tokens";

type ListRowProps = {
  title: string;
  subtitle?: string;
  onPress(): void;
};

export function ListRow({ title, subtitle, onPress }: ListRowProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress} style={styles.row}>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    backgroundColor: theme.colors.bg.elevated,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textWrap: {
    gap: theme.spacing.xs
  },
  title: {
    fontFamily: theme.type.family.body,
    fontSize: theme.type.size.body,
    color: theme.colors.ink.default,
    fontWeight: theme.type.weight.semibold
  },
  subtitle: {
    fontFamily: theme.type.family.body,
    fontSize: theme.type.size.small,
    color: theme.colors.ink.muted
  },
  chevron: {
    color: theme.colors.ink.muted,
    fontSize: theme.type.size.h2
  }
});