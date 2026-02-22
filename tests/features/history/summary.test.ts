import type { SleepSession } from "../../../src/domain/types";
import { buildDailySummary } from "../../../src/features/history/summary";

const sessions: SleepSession[] = [
  {
    id: "s2",
    startAt: "2026-02-21T12:00:00.000Z",
    endAt: "2026-02-21T12:45:00.000Z",
    source: "manual",
    createdAt: "2026-02-21T12:45:00.000Z",
    updatedAt: "2026-02-21T12:45:00.000Z"
  },
  {
    id: "s1",
    startAt: "2026-02-21T09:30:00.000Z",
    endAt: "2026-02-21T10:30:00.000Z",
    source: "timer",
    createdAt: "2026-02-21T10:30:00.000Z",
    updatedAt: "2026-02-21T10:30:00.000Z"
  }
];

test("calculates total sleep minutes for day", () => {
  const summary = buildDailySummary(sessions, "2026-02-21");
  expect(summary.totalMinutes).toBe(105);
  expect(summary.averageNapMinutes).toBe(53);
});

test("returns sessions in chronological order", () => {
  const summary = buildDailySummary(sessions, "2026-02-21");
  expect(summary.sessions[0].id).toBe("s1");
  expect(summary.sessions[1].id).toBe("s2");
});
