import type { SleepSession } from "../../domain/types";

type ValidationOptions = {
  allowOverlap?: boolean;
  maxDurationMinutes?: number;
};

type ValidationResult = {
  valid: boolean;
  error?: string;
};

const DEFAULT_MAX_DURATION_MINUTES = 240;

function overlaps(aStartMs: number, aEndMs: number, bStartMs: number, bEndMs: number): boolean {
  return aStartMs < bEndMs && aEndMs > bStartMs;
}

export function validateManualSession(
  candidate: SleepSession,
  existingSessions: SleepSession[],
  options: ValidationOptions = {}
): ValidationResult {
  const startMs = new Date(candidate.startAt).getTime();
  const endMs = new Date(candidate.endAt).getTime();

  if (Number.isNaN(startMs) || Number.isNaN(endMs)) {
    return { valid: false, error: "Invalid session timestamps." };
  }

  if (endMs <= startMs) {
    return { valid: false, error: "End time must be after start time." };
  }

  const maxDuration = options.maxDurationMinutes ?? DEFAULT_MAX_DURATION_MINUTES;
  const durationMinutes = Math.floor((endMs - startMs) / 60000);
  if (durationMinutes > maxDuration) {
    return { valid: false, error: "Manual session duration is outside safe bounds." };
  }

  if (options.allowOverlap) {
    return { valid: true };
  }

  const hasOverlap = existingSessions.some((session) => {
    if (session.id === candidate.id) {
      return false;
    }

    return overlaps(startMs, endMs, new Date(session.startAt).getTime(), new Date(session.endAt).getTime());
  });

  if (hasOverlap) {
    return { valid: false, error: "Manual session overlap detected with an existing entry." };
  }

  return { valid: true };
}
