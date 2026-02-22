import { StyleSheet, View } from "react-native";
import { PrimaryAction } from "../../ui/PrimaryAction";
import { theme } from "../../theme/tokens";

type QuickActionsProps = {
  onManualAdd(): void;
  onEditLast(): void;
};

export function QuickActions({ onManualAdd, onEditLast }: QuickActionsProps) {
  return (
    <View style={styles.row}>
      <View style={styles.item}>
        <PrimaryAction label="Add Manual Sleep" onPress={onManualAdd} />
      </View>
      <View style={styles.item}>
        <PrimaryAction label="Edit Last Entry" onPress={onEditLast} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    gap: theme.spacing.sm
  },
  item: {
    flex: 1
  }
});