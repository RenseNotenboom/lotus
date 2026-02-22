export type DashboardHeroInput = {
  nowIso: string;
  isRunning: boolean;
  activeSessionStartAtIso?: string;
  recommendedNapStartAtIso: string;
};

export type DashboardHeroModel = {
  mode: "active" | "idle";
  primaryLabel: "Start Nap" | "Stop Nap";
  mainText: string;
  subText: string;
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

  return {
    mode: "idle",
    primaryLabel: "Start Nap",
    mainText: `Recommended next nap ${formatRelativeMinutes(delta)}`,
    subText: `Suggested time ${formatClockLabel(input.recommendedNapStartAtIso)}`
  };
}
