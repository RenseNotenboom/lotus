export type AgeBand = {
  label: string;
  minWeeks: number;
  maxWeeks: number;
  wakeWindowMin: [number, number];
  napDurationMin: [number, number];
};

export type BaselineSuggestionInput = {
  dateOfBirth: string;
  nowIso: string;
  lastWakeAtIso?: string;
};

export type BaselineSuggestion = {
  ageBand: AgeBand;
  recommendedNapStartInMin: number;
  estimatedDurationMin: number;
  rationale: string;
};
