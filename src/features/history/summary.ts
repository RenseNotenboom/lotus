import type { SleepSession } from "../../domain/types";

export type DailySummary = {
  date: string;
  totalMinutes: number;
  averageNapMinutes: number;
  sessions: SleepSession[];
};

function toDateKey(iso: string): string {
  return iso.slice(0, 10);
}

function getDurationMinutes(session: SleepSession): number {
  const start = new Date(session.startAt).getTime();
  const end = new Date(session.endAt).getTime();
  return Math.max(0, Math.round((end - start) / 60000));
}

export function buildDailySummary(allSessions: SleepSession[], dayKey: string): DailySummary {
  const sessions = allSessions
    .filter((session) => toDateKey(session.startAt) === dayKey)
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

  const totalMinutes = sessions.reduce((sum, session) => sum + getDurationMinutes(session), 0);
  const averageNapMinutes = sessions.length ? Math.round(totalMinutes / sessions.length) : 0;

  return {
    date: dayKey,
    totalMinutes,
    averageNapMinutes,
    sessions
  };
}