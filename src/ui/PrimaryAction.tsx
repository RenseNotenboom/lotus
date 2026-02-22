import { Pressable, StyleSheet, Text } from "react-native";
import { theme } from "../theme/tokens";

type PrimaryActionProps = {
  label: string;
  onPress(): void;
  disabled?: boolean;
  tone?: "primary" | "secondary";
};

export function PrimaryAction({ label, onPress, disabled = false, tone = "primary" }: PrimaryActionProps) {
  const handlePress = () => {
    if (disabled) {
      return;
    }
    onPress();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={handlePress}
      style={[
        styles.button,
        disabled ? styles.disabled : tone === "secondary" ? styles.secondary : styles.active
      ]}
    >
      <Text style={[styles.label, tone === "secondary" ? styles.secondaryLabel : undefined]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.radius.pill,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl
  },
  active: {
    backgroundColor: theme.colors.state.action
  },
  secondary: {
    backgroundColor: theme.colors.surface.subtle
  },
  disabled: {
    backgroundColor: theme.colors.surface.border
  },
  label: {
    color: "#ffffff",
    fontFamily: theme.type.family.ui,
    fontSize: theme.type.size.h2,
    fontWeight: theme.type.weight.bold
  },
  secondaryLabel: {
    color: theme.colors.ink.default
  }
});
