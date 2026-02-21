import { Pressable, StyleSheet, Text, View } from "react-native";

type QuickActionsProps = {
  onManualAdd(): void;
  onEditLast(): void;
};

export function QuickActions({ onManualAdd, onEditLast }: QuickActionsProps) {
  return (
    <View style={styles.row}>
      <Pressable accessibilityRole="button" onPress={onManualAdd} style={[styles.button, styles.warmButton]}>
        <Text style={styles.buttonText}>Add Manual Sleep</Text>
      </Pressable>
      <Pressable accessibilityRole="button" onPress={onEditLast} style={[styles.button, styles.coolButton]}>
        <Text style={styles.buttonText}>Edit Last Entry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    gap: 10
  },
  button: {
    flex: 1,
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 12
  },
  warmButton: {
    backgroundColor: "#d97706"
  },
  coolButton: {
    backgroundColor: "#334155"
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13
  }
});
