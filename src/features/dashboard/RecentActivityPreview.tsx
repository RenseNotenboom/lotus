import { StyleSheet, Text, View } from "react-native";
import { ListRow } from "../../ui/ListRow";
import { theme } from "../../theme/tokens";

type RecentItem = {
  id: string;
  title: string;
  subtitle: string;
};

type RecentActivityPreviewProps = {
  items: RecentItem[];
  onSelect(id: string): void;
};

export function RecentActivityPreview({ items, onSelect }: RecentActivityPreviewProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>Recent activity</Text>
      {items.map((item) => (
        <View key={item.id} testID="recent-activity-row">
          <ListRow title={item.title} subtitle={item.subtitle} onPress={() => onSelect(item.id)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: theme.spacing.sm
  },
  heading: {
    color: theme.colors.ink.default,
    fontFamily: theme.type.family.body,
    fontSize: theme.type.size.body,
    fontWeight: theme.type.weight.semibold
  }
});