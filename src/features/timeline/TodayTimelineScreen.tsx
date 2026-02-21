import { StyleSheet, Text, View } from "react-native";
import type { SleepSession } from "../../domain/types";

type TodayTimelineScreenProps = {
  sessions: SleepSession[];
};

export function TodayTimelineScreen({ sessions }: TodayTimelineScreenProps) {
  const sorted = [...sessions].sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Today Timeline</Text>
      {sorted.map((session) => (
        <View key={session.id} testID="timeline-row" style={styles.row}>
          <Text style={styles.rowTitle}>{session.id}</Text>
          <Text style={styles.rowMeta}>
            {session.startAt} - {session.endAt}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    gap: 8
  },
  title: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "700"
  },
  row: {
    borderRadius: 12,
    backgroundColor: "#e2e8f0",
    padding: 10
  },
  rowTitle: {
    fontWeight: "700",
    color: "#1f2937"
  },
  rowMeta: {
    color: "#334155",
    fontSize: 12
  }
});
