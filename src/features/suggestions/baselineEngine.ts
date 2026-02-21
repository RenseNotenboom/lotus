import { getAgeBandForWeeks } from "./ageBands";
import type { BaselineSuggestion, BaselineSuggestionInput } from "./types";

function minutesBetween(startIso: string, endIso: string): number {
  return Math.floor((new Date(endIso).getTime() - new Date(startIso).getTime()) / 60000);
}

function getAgeWeeks(dateOfBirth: string, nowIso: string): number {
  const ms = new Date(nowIso).getTime() - new Date(dateOfBirth).getTime();
  return Math.max(0, Math.floor(ms / (7 * 24 * 60 * 60 * 1000)));
}

export function buildBaselineSuggestion(input: BaselineSuggestionInput): BaselineSuggestion {
  const ageWeeks = getAgeWeeks(input.dateOfBirth, input.nowIso);
  const ageBand = getAgeBandForWeeks(ageWeeks);
  const [wakeLow, wakeHigh] = ageBand.wakeWindowMin;
  const [napLow, napHigh] = ageBand.napDurationMin;

  const targetWake = Math.round((wakeLow + wakeHigh) / 2);
  const elapsedWake = input.lastWakeAtIso ? Math.max(0, minutesBetween(input.lastWakeAtIso, input.nowIso)) : 0;
  const recommendedNapStartInMin = Math.max(0, targetWake - elapsedWake);
  const estimatedDurationMin = Math.round((napLow + napHigh) / 2);
  const rationale = input.lastWakeAtIso
    ? `Age baseline (${ageBand.label}) with wake-window timing.`
    : `Age baseline (${ageBand.label}) used because wake timing is unavailable.`;

  return {
    ageBand,
    recommendedNapStartInMin,
    estimatedDurationMin,
    rationale
  };
}
