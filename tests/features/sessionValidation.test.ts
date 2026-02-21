import type { SleepSession } from "../../src/domain/types";
import { validateManualSession } from "../../src/features/sessions/sessionValidation";

const existing: SleepSession[] = [
  {
    id: "existing-1",
    startAt: "2026-02-21T10:00:00.000Z",
    endAt: "2026-02-21T11:00:00.000Z",
    source: "manual",
    createdAt: "2026-02-21T11:00:00.000Z",
    updatedAt: "2026-02-21T11:00:00.000Z"
  }
];

test("rejects manual session when end is not after start", () => {
  const result = validateManualSession(
    {
      id: "new-1",
      startAt: "2026-02-21T12:00:00.000Z",
      endAt: "2026-02-21T12:00:00.000Z",
      source: "manual",
      createdAt: "2026-02-21T12:00:00.000Z",
      updatedAt: "2026-02-21T12:00:00.000Z"
    },
    existing
  );

  expect(result.valid).toBe(false);
  expect(result.error).toContain("after start");
});

test("rejects unrealistic duration", () => {
  const result = validateManualSession(
    {
      id: "new-2",
      startAt: "2026-02-21T00:00:00.000Z",
      endAt: "2026-02-21T14:30:00.000Z",
      source: "manual",
      createdAt: "2026-02-21T14:30:00.000Z",
      updatedAt: "2026-02-21T14:30:00.000Z"
    },
    existing
  );

  expect(result.valid).toBe(false);
  expect(result.error).toContain("duration");
});

test("rejects overlap unless override flag is true", () => {
  const session: SleepSession = {
    id: "new-3",
    startAt: "2026-02-21T10:30:00.000Z",
    endAt: "2026-02-21T11:30:00.000Z",
    source: "manual",
    createdAt: "2026-02-21T11:30:00.000Z",
    updatedAt: "2026-02-21T11:30:00.000Z"
  };

  const blocked = validateManualSession(session, existing);
  expect(blocked.valid).toBe(false);
  expect(blocked.error).toContain("overlap");

  const forced = validateManualSession(session, existing, { allowOverlap: true });
  expect(forced.valid).toBe(true);
});