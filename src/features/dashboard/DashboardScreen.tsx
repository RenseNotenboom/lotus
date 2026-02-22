import { useMemo, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../../ui/AppHeader";
import { theme } from "../../theme/tokens";
import { createNotificationService } from "../notifications/notificationService";
import { useSleepTimer } from "../sleepTimer/useSleepTimer";
import { createSuggestionEngine } from "../suggestions/SuggestionEngine";
import { PredictionHero } from "./PredictionHero";
import { QuickActions } from "./QuickActions";
import { RecentActivityPreview } from "./RecentActivityPreview";
import { TodayStatsChips } from "./TodayStatsChips";
import { buildDashboardHeroModel } from "./presenter";

const engine = createSuggestionEngine();
const notificationService = createNotificationService({
  async schedule() {
    return undefined;
  },
  async cancel() {
    return undefined;
  }
});

const recentEntries = [
  { id: "r1", title: "Nap 1", subtitle: "09:10-10:00" },
  { id: "r2", title: "Nap 2", subtitle: "12:20-13:05" },
  { id: "r3", title: "Nap 3", subtitle: "15:15-15:55" }
];

export function DashboardScreen() {
  const { state, start, stop } = useSleepTimer();
  const [message, setMessage] = useState("");

  const nowIso = new Date().toISOString();
  const recommendation = useMemo(
    () =>
      engine.getRecommendation({
        dateOfBirth: "2025-11-12",
        nowIso,
        recentWakeToNapMinutes: [88, 94, 86, 90],
        recentNapDurationMinutes: [58, 62, 64, 59]
      }),
    [nowIso]
  );

  const recommendedNapStartAtIso = new Date(
    Date.now() + recommendation.recommendedNapStartInMin * 60000
  ).toISOString();

  const heroModel = buildDashboardHeroModel({
    nowIso,
    isRunning: state.isRunning,
    activeSessionStartAtIso: state.activeSessionStartAt ?? undefined,
    recommendedNapStartAtIso
  });

  const onToggleTimer = async () => {
    const tickIso = new Date().toISOString();
    if (state.isRunning) {
      await stop(tickIso);
      setMessage("Sleep session saved.");
      return;
    }

    await start(tickIso);
    setMessage("Sleep timer started.");
  };

  const onSetReminder = async () => {
    if (!heroModel.recommendedTimeLabel) {
      return;
    }
    await notificationService.schedulePredictionReminder({
      recommendedNapStartAtIso
    });
    setMessage(`Reminder set for ${heroModel.recommendedTimeLabel}.`);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader title="Lotus" subtitle="Sleep flow for tiny humans" />

      <PredictionHero
        model={heroModel}
        onPrimaryAction={onToggleTimer}
        onSecondaryAction={onSetReminder}
      />

      <TodayStatsChips totalToday="4h 20m" naps="3" lastNap="40m" />

      <RecentActivityPreview
        items={recentEntries}
        onSelect={(id) => setMessage(`Edit opened for ${id}.`)}
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    gap: theme.spacing.md,
    backgroundColor: theme.colors.bg.base
  },
  message: {
    color: theme.colors.ink.muted,
    fontFamily: theme.type.family.body,
    fontSize: theme.type.size.small
  }
});
