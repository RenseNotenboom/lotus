import { StyleSheet, Text, View } from "react-native";
import type { SleepSession } from "../../domain/types";
import { ListRow } from "../../ui/ListRow";
import { SurfaceCard } from "../../ui/SurfaceCard";
import { theme } from "../../theme/tokens";

type TodayTimelineScreenProps = {
  sessions: SleepSession[];
};

export function TodayTimelineScreen({ sessions }: TodayTimelineScreenProps) {
  const sorted = [...sessions].sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Today rhythm</Text>
      <SurfaceCard>
        <View style={styles.list}>
          {sorted.map((session) => (
            <View key={session.id} testID="timeline-row">
              <ListRow
                title={session.id}
                subtitle={`${session.startAt} - ${session.endAt}`}
                onPress={() => undefined}
              />
            </View>
          ))}
        </View>
      </SurfaceCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    gap: theme.spacing.sm
  },
  title: {
    color: theme.colors.ink.strong,
    fontFamily: theme.type.family.body,
    fontSize: theme.type.size.h2,
    fontWeight: theme.type.weight.bold
  },
  list: {
    gap: theme.spacing.sm
  }
});