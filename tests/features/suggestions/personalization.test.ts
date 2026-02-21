import { applyPersonalization } from "../../../src/features/suggestions/personalization";
import { createSuggestionEngine } from "../../../src/features/suggestions/SuggestionEngine";

test("adapts recommendation from recent nap history", () => {
  const adjusted = applyPersonalization(
    {
      recommendedNapStartInMin: 40,
      estimatedDurationMin: 60
    },
    {
      recentWakeToNapMinutes: [30, 35, 34, 32],
      recentNapDurationMinutes: [70, 72, 68, 71]
    }
  );

  expect(adjusted.recommendedNapStartInMin).toBeLessThan(40);
  expect(adjusted.estimatedDurationMin).toBeGreaterThan(60);
});

test("caps personalization delta at plus-minus twenty percent", () => {
  const adjusted = applyPersonalization(
    {
      recommendedNapStartInMin: 50,
      estimatedDurationMin: 80
    },
    {
      recentWakeToNapMinutes: [5, 5, 5],
      recentNapDurationMinutes: [240, 240, 240]
    }
  );

  expect(adjusted.recommendedNapStartInMin).toBeGreaterThanOrEqual(40);
  expect(adjusted.recommendedNapStartInMin).toBeLessThanOrEqual(60);
  expect(adjusted.estimatedDurationMin).toBeGreaterThanOrEqual(64);
  expect(adjusted.estimatedDurationMin).toBeLessThanOrEqual(96);
});

test("ignores outliers and stays stable", () => {
  const adjusted = applyPersonalization(
    {
      recommendedNapStartInMin: 45,
      estimatedDurationMin: 70
    },
    {
      recentWakeToNapMinutes: [44, 46, 43, 500],
      recentNapDurationMinutes: [69, 71, 70, 1]
    }
  );

  expect(adjusted.recommendedNapStartInMin).toBeGreaterThanOrEqual(40);
  expect(adjusted.recommendedNapStartInMin).toBeLessThanOrEqual(50);
  expect(adjusted.estimatedDurationMin).toBeGreaterThanOrEqual(65);
  expect(adjusted.estimatedDurationMin).toBeLessThanOrEqual(75);
});

test("suggestion engine exposes stable interface", () => {
  const engine = createSuggestionEngine();
  const result = engine.getRecommendation({
    dateOfBirth: "2025-12-01",
    nowIso: "2026-02-21T12:00:00.000Z",
    lastWakeAtIso: "2026-02-21T10:40:00.000Z",
    recentWakeToNapMinutes: [80, 85, 78],
    recentNapDurationMinutes: [65, 70, 68]
  });

  expect(typeof result.recommendedNapStartInMin).toBe("number");
  expect(typeof result.estimatedDurationMin).toBe("number");
  expect(result.rationale.length).toBeGreaterThan(0);
});