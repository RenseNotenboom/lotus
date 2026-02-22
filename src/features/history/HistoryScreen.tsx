import { StyleSheet, Text, View } from "react-native";
import type { SleepSession } from "../../domain/types";
import { SurfaceCard } from "../../ui/SurfaceCard";
import { theme } from "../../theme/tokens";
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
      <SurfaceCard>
        <View style={styles.group}>
          <Text style={styles.meta}>Day: {summary.date}</Text>
          <Text style={styles.meta}>Total sleep: {summary.totalMinutes} min</Text>
          <Text style={styles.meta}>Average nap: {summary.averageNapMinutes} min</Text>
          <Text style={styles.meta}>Sessions: {summary.sessions.length}</Text>
        </View>
      </SurfaceCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.spacing.sm,
    width: "100%"
  },
  heading: {
    fontFamily: theme.type.family.body,
    fontSize: theme.type.size.h2,
    fontWeight: theme.type.weight.bold,
    color: theme.colors.ink.strong
  },
  group: {
    gap: theme.spacing.xs
  },
  meta: {
    color: theme.colors.ink.default,
    fontFamily: theme.type.family.body,
    fontSize: theme.type.size.body
  }
});