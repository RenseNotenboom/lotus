export type DashboardHeroInput = {
  nowIso: string;
  isRunning: boolean;
  activeSessionStartAtIso?: string;
  recommendedNapStartAtIso: string;
};

export type DashboardHeroModel = {
  mode: "active" | "idle";
  primaryLabel: "Start Nap Now" | "Stop Nap";
  secondaryLabel?: "Set Reminder";
  mainText: string;
  subText: string;
  recommendedTimeLabel?: string;
  countdownLabel?: string;
  confidenceLabel?: "High confidence" | "Medium confidence" | "Low confidence";
  reason?: string;
};

function parseIso(iso: string): Date {
  return new Date(iso);
}

function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

function formatDurationHhMmSs(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}

export function formatRelativeMinutes(deltaMinutes: number): string {
  if (deltaMinutes >= 0) {
    return `in ${deltaMinutes} min`;
  }
  return `${Math.abs(deltaMinutes)} min ago`;
}

export function formatClockLabel(iso: string): string {
  const date = parseIso(iso);
  return `${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}`;
}

function toConfidence(deltaMinutes: number): DashboardHeroModel["confidenceLabel"] {
  const absoluteDelta = Math.abs(deltaMinutes);
  if (absoluteDelta <= 30) {
    return "High confidence";
  }
  if (absoluteDelta <= 90) {
    return "Medium confidence";
  }
  return "Low confidence";
}

export function buildDashboardHeroModel(input: DashboardHeroInput): DashboardHeroModel {
  const now = parseIso(input.nowIso).getTime();

  if (input.isRunning && input.activeSessionStartAtIso) {
    const started = parseIso(input.activeSessionStartAtIso).getTime();
    return {
      mode: "active",
      primaryLabel: "Stop Nap",
      mainText: `Current nap: ${formatDurationHhMmSs(now - started)}`,
      subText: `Started at ${formatClockLabel(input.activeSessionStartAtIso)}`
    };
  }

  const recommended = parseIso(input.recommendedNapStartAtIso).getTime();
  const delta = Math.round((recommended - now) / 60000);
  const recommendedTimeLabel = formatClockLabel(input.recommendedNapStartAtIso);
  const countdownLabel = formatRelativeMinutes(delta);

  return {
    mode: "idle",
    primaryLabel: "Start Nap Now",
    secondaryLabel: "Set Reminder",
    mainText: `Recommended next nap ${countdownLabel}`,
    subText: `Suggested time ${recommendedTimeLabel}`,
    recommendedTimeLabel,
    countdownLabel,
    confidenceLabel: toConfidence(delta),
    reason: "Based on age baseline and your recent naps."
  };
}
