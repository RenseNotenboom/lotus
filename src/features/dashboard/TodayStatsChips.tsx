import { StyleSheet, View } from "react-native";
import { StatChip } from "../../ui/StatChip";
import { theme } from "../../theme/tokens";

type TodayStatsChipsProps = {
  totalToday: string;
  naps: string;
  lastNap: string;
};

export function TodayStatsChips({ totalToday, naps, lastNap }: TodayStatsChipsProps) {
  return (
    <View style={styles.row}>
      <StatChip label="Total today" value={totalToday} />
      <StatChip label="Naps" value={naps} />
      <StatChip label="Last nap" value={lastNap} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    justifyContent: "space-between"
  }
});