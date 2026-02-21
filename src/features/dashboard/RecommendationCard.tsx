import { StyleSheet, Text, View } from "react-native";

type RecommendationCardProps = {
  startInMinutes: number;
  durationMinutes: number;
  rationale: string;
};

export function RecommendationCard({ startInMinutes, durationMinutes, rationale }: RecommendationCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Next Nap Signal</Text>
      <Text style={styles.metric}>Best nap start: in ~{startInMinutes} min</Text>
      <Text style={styles.metric}>Expected length: ~{durationMinutes} min</Text>
      <Text style={styles.rationale}>{rationale}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 20,
    padding: 16,
    backgroundColor: "#f7efe0",
    borderWidth: 1,
    borderColor: "#e7d2aa"
  },
  heading: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: "#8b5e1a",
    fontFamily: "Georgia",
    marginBottom: 8
  },
  metric: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937"
  },
  rationale: {
    marginTop: 10,
    color: "#475569"
  }
});
