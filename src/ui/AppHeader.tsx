import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/tokens";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
};

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xs
  },
  title: {
    fontFamily: theme.type.family.display,
    fontSize: theme.type.size.hero,
    color: theme.colors.ink.strong
  },
  subtitle: {
    fontFamily: theme.type.family.body,
    fontSize: theme.type.size.body,
    color: theme.colors.ink.muted
  }
});