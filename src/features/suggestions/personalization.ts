type PersonalizationInput = {
  recentWakeToNapMinutes: number[];
  recentNapDurationMinutes: number[];
};

type CoreRecommendation = {
  recommendedNapStartInMin: number;
  estimatedDurationMin: number;
};

const MAX_DELTA_RATIO = 0.2;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function average(values: number[]): number {
  const sum = values.reduce((acc, value) => acc + value, 0);
  return sum / values.length;
}

function filterOutliers(values: number[], min: number, max: number): number[] {
  return values.filter((value) => value >= min && value <= max);
}

function adapt(base: number, observedAvg: number): number {
  const min = base * (1 - MAX_DELTA_RATIO);
  const max = base * (1 + MAX_DELTA_RATIO);
  return clamp(Math.round(observedAvg), Math.round(min), Math.round(max));
}

export function applyPersonalization(
  baseline: CoreRecommendation,
  input: PersonalizationInput
): CoreRecommendation {
  const wakeSamples = filterOutliers(input.recentWakeToNapMinutes, 15, 300);
  const durationSamples = filterOutliers(input.recentNapDurationMinutes, 15, 240);

  const adaptedWake = wakeSamples.length
    ? adapt(baseline.recommendedNapStartInMin, average(wakeSamples))
    : baseline.recommendedNapStartInMin;

  const adaptedDuration = durationSamples.length
    ? adapt(baseline.estimatedDurationMin, average(durationSamples))
    : baseline.estimatedDurationMin;

  return {
    recommendedNapStartInMin: Math.max(0, adaptedWake),
    estimatedDurationMin: Math.max(15, adaptedDuration)
  };
}
