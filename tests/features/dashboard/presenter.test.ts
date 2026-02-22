import {
  buildDashboardHeroModel,
  formatClockLabel,
  formatRelativeMinutes
} from "../../../src/features/dashboard/presenter";

test("builds active hero model", () => {
  const model = buildDashboardHeroModel({
    nowIso: "2026-02-22T12:00:00.000Z",
    isRunning: true,
    activeSessionStartAtIso: "2026-02-22T11:15:00.000Z",
    recommendedNapStartAtIso: "2026-02-22T12:30:00.000Z"
  });

  expect(model.mode).toBe("active");
  expect(model.primaryLabel).toBe("Stop Nap");
  expect(model.mainText).toContain("00:45:00");
});

test("builds idle hero model with recommendation", () => {
  const model = buildDashboardHeroModel({
    nowIso: "2026-02-22T12:00:00.000Z",
    isRunning: false,
    recommendedNapStartAtIso: "2026-02-22T12:25:00.000Z"
  });

  expect(model.mode).toBe("idle");
  expect(model.primaryLabel).toBe("Start Nap");
  expect(model.mainText).toContain("in 25 min");
});

test("formats relative minutes and clock labels", () => {
  expect(formatRelativeMinutes(20)).toBe("in 20 min");
  expect(formatRelativeMinutes(-15)).toBe("15 min ago");
  expect(formatClockLabel("2026-02-22T17:05:00.000Z")).toBe("17:05");
});