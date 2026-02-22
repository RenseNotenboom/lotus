import { StyleSheet, Text, View } from "react-native";
import { SurfaceCard } from "../../ui/SurfaceCard";
import { theme } from "../../theme/tokens";

type RecommendationCardProps = {
  startInMinutes: number;
  durationMinutes: number;
  rationale: string;
};

export function RecommendationCard({ startInMinutes, durationMinutes, rationale }: RecommendationCardProps) {
  return (
    <SurfaceCard>
      <View style={styles.wrap}>
        <Text style={styles.heading}>Nap rationale</Text>
        <Text style={styles.metric}>Best nap start: in ~{startInMinutes} min</Text>
        <Text style={styles.metric}>Expected length: ~{durationMinutes} min</Text>
        <Text style={styles.rationale}>{rationale}</Text>
      </View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: theme.spacing.sm
  },
  heading: {
    fontFamily: theme.type.family.ui,
    fontSize: theme.type.size.small,
    color: theme.colors.ink.muted,
    textTransform: "uppercase",
    letterSpacing: 0.8
  },
  metric: {
    fontSize: theme.type.size.body,
    fontWeight: theme.type.weight.bold,
    color: theme.colors.ink.strong
  },
  rationale: {
    color: theme.colors.ink.muted,
    fontSize: theme.type.size.small
  }
});