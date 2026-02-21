import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createSuggestionEngine } from "../suggestions/SuggestionEngine";
import { RecommendationCard } from "./RecommendationCard";
import { QuickActions } from "./QuickActions";
import { useSleepTimer } from "../sleepTimer/useSleepTimer";

const engine = createSuggestionEngine();

export function DashboardScreen() {
  const { state, start, stop } = useSleepTimer();
  const [message, setMessage] = useState("");

  const recommendation = useMemo(
    () =>
      engine.getRecommendation({
        dateOfBirth: "2025-11-12",
        nowIso: new Date().toISOString(),
        recentWakeToNapMinutes: [88, 94, 86, 90],
        recentNapDurationMinutes: [58, 62, 64, 59]
      }),
    []
  );

  const onToggleTimer = async () => {
    const nowIso = new Date().toISOString();
    if (state.isRunning) {
      await stop(nowIso);
      setMessage("Sleep session saved.");
      return;
    }

    await start(nowIso);
    setMessage("Sleep timer started.");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.brand}>Lotus</Text>
        <Text style={styles.subtitle}>Sleep flow for tiny humans</Text>
      </View>

      <Pressable accessibilityRole="button" onPress={onToggleTimer} style={styles.timerButton}>
        <Text style={styles.timerLabel}>{state.isRunning ? "Stop Sleep" : "Start Sleep"}</Text>
      </Pressable>

      <RecommendationCard
        startInMinutes={recommendation.recommendedNapStartInMin}
        durationMinutes={recommendation.estimatedDurationMin}
        rationale={recommendation.rationale}
      />

      <QuickActions
        onManualAdd={() => setMessage("Manual add opened (MVP placeholder).")}
        onEditLast={() => setMessage("Edit last entry opened (MVP placeholder).")}
      />

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 14,
    backgroundColor: "#f3f5f7"
  },
  hero: {
    marginBottom: 4
  },
  brand: {
    fontSize: 34,
    fontFamily: "Georgia",
    color: "#0f172a"
  },
  subtitle: {
    color: "#475569",
    fontSize: 14
  },
  timerButton: {
    backgroundColor: "#0f172a",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center"
  },
  timerLabel: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20
  },
  message: {
    color: "#334155",
    fontWeight: "600"
  }
});
