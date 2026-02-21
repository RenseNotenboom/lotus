import { createInMemoryDb, getSchemaStatements, initSchema } from "../../src/data/db";
import { createChildProfileRepo } from "../../src/data/repositories/childProfileRepo";
import { createSleepSessionRepo } from "../../src/data/repositories/sleepSessionRepo";
import { createSuggestionSnapshotRepo } from "../../src/data/repositories/suggestionRepo";

test("defines required mvp schema tables", () => {
  const schema = getSchemaStatements().join("\n");
  expect(schema).toContain("child_profiles");
  expect(schema).toContain("sleep_sessions");
  expect(schema).toContain("suggestion_snapshots");
});

test("supports create and list across mvp repositories", async () => {
  const db = createInMemoryDb();
  initSchema(db);

  const childRepo = createChildProfileRepo(db);
  const sessionRepo = createSleepSessionRepo(db);
  const suggestionRepo = createSuggestionSnapshotRepo(db);

  const child = await childRepo.upsert({
    id: "child-1",
    name: "Milo",
    dateOfBirth: "2025-09-01",
    createdAt: "2026-02-21T00:00:00.000Z",
    updatedAt: "2026-02-21T00:00:00.000Z"
  });

  await sessionRepo.create({
    id: "session-1",
    startAt: "2026-02-21T10:00:00.000Z",
    endAt: "2026-02-21T10:45:00.000Z",
    source: "manual",
    createdAt: "2026-02-21T10:45:00.000Z",
    updatedAt: "2026-02-21T10:45:00.000Z"
  });

  await suggestionRepo.create({
    id: "suggestion-1",
    generatedAt: "2026-02-21T11:00:00.000Z",
    recommendedNapStartAt: "2026-02-21T11:30:00.000Z",
    estimatedDurationMin: 50,
    rationale: "Age baseline and recent nap pattern",
    inputsVersion: "v1"
  });

  expect(child.name).toBe("Milo");
  expect((await sessionRepo.listAll()).length).toBe(1);
  expect((await suggestionRepo.listAll()).length).toBe(1);
});