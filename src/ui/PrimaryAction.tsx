import { Pressable, StyleSheet, Text } from "react-native";
import { theme } from "../theme/tokens";

type PrimaryActionProps = {
  label: string;
  onPress(): void;
  disabled?: boolean;
};

export function PrimaryAction({ label, onPress, disabled = false }: PrimaryActionProps) {
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
      style={[styles.button, disabled ? styles.disabled : styles.active]}
    >
      <Text style={styles.label}>{label}</Text>
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
  disabled: {
    backgroundColor: theme.colors.surface.border
  },
  label: {
    color: "#ffffff",
    fontFamily: theme.type.family.ui,
    fontSize: theme.type.size.h2,
    fontWeight: theme.type.weight.bold
  }
});
