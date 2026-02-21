export type SessionSource = "timer" | "manual";

export type ChildProfile = {
  id: string;
  name: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
};

export type SleepSession = {
  id: string;
  startAt: string;
  endAt: string;
  source: SessionSource;
  createdAt: string;
  updatedAt: string;
};

export type SuggestionSnapshot = {
  id: string;
  generatedAt: string;
  recommendedNapStartAt: string;
  estimatedDurationMin: number;
  rationale: string;
  inputsVersion: string;
};
