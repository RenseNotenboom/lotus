import { StyleSheet, Text, View } from "react-native";
import type { SleepSession } from "../../domain/types";
import { buildDailySummary } from "./summary";

type HistoryScreenProps = {
  sessions: SleepSession[];
  dayKey: string;
};

export function HistoryScreen({ sessions, dayKey }: HistoryScreenProps) {
  const summary = buildDailySummary(sessions, dayKey);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>History</Text>
      <Text style={styles.meta}>Day: {summary.date}</Text>
      <Text style={styles.meta}>Total sleep: {summary.totalMinutes} min</Text>
      <Text style={styles.meta}>Sessions: {summary.sessions.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
    width: "100%"
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a"
  },
  meta: {
    color: "#334155"
  }
});
