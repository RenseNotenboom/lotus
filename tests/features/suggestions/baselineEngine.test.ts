import { buildBaselineSuggestion } from "../../../src/features/suggestions/baselineEngine";

test("maps newborn age to short wake window baseline", () => {
  const suggestion = buildBaselineSuggestion({
    dateOfBirth: "2026-02-01",
    nowIso: "2026-02-21T10:00:00.000Z",
    lastWakeAtIso: "2026-02-21T09:10:00.000Z"
  });

  expect(suggestion.ageBand.label).toContain("0-6 weeks");
  expect(suggestion.recommendedNapStartInMin).toBeGreaterThanOrEqual(0);
  expect(suggestion.recommendedNapStartInMin).toBeLessThanOrEqual(30);
  expect(suggestion.estimatedDurationMin).toBeGreaterThanOrEqual(60);
});

test("maps older infant age to longer wake window baseline", () => {
  const suggestion = buildBaselineSuggestion({
    dateOfBirth: "2025-07-01",
    nowIso: "2026-02-21T14:00:00.000Z",
    lastWakeAtIso: "2026-02-21T11:30:00.000Z"
  });

  expect(suggestion.ageBand.label).toContain("6-9 months");
  expect(suggestion.recommendedNapStartInMin).toBeGreaterThanOrEqual(0);
  expect(suggestion.estimatedDurationMin).toBeGreaterThanOrEqual(40);
  expect(suggestion.estimatedDurationMin).toBeLessThanOrEqual(120);
});

test("falls back safely when wake time is missing", () => {
  const suggestion = buildBaselineSuggestion({
    dateOfBirth: "2025-10-01",
    nowIso: "2026-02-21T14:00:00.000Z"
  });

  expect(suggestion.recommendedNapStartInMin).toBeGreaterThanOrEqual(0);
  expect(suggestion.rationale).toContain("baseline");
});