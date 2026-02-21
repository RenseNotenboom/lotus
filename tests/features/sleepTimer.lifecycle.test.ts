import { createInMemoryDb, initSchema } from "../../src/data/db";
import { createSleepSessionRepo } from "../../src/data/repositories/sleepSessionRepo";
import { createSleepTimerStore } from "../../src/features/sleepTimer/sleepTimerStore";

function createMemoryStorage() {
  const values = new Map<string, string>();
  return {
    async getItem(key: string) {
      return values.has(key) ? values.get(key)! : null;
    },
    async setItem(key: string, value: string) {
      values.set(key, value);
    },
    async removeItem(key: string) {
      values.delete(key);
    }
  };
}

test("starts timer and exposes active session", async () => {
  const db = createInMemoryDb();
  initSchema(db);
  const store = createSleepTimerStore(createSleepSessionRepo(db), createMemoryStorage());

  await store.start("2026-02-21T10:00:00.000Z");

  expect(store.getState().activeSessionStartAt).toBe("2026-02-21T10:00:00.000Z");
  expect(store.getState().isRunning).toBe(true);
});

test("stops timer and persists completed sleep session", async () => {
  const db = createInMemoryDb();
  initSchema(db);
  const repo = createSleepSessionRepo(db);
  const store = createSleepTimerStore(repo, createMemoryStorage());

  await store.start("2026-02-21T10:00:00.000Z");
  await store.stop("2026-02-21T10:45:00.000Z");

  const sessions = await repo.listAll();
  expect(sessions).toHaveLength(1);
  expect(sessions[0].startAt).toBe("2026-02-21T10:00:00.000Z");
  expect(sessions[0].endAt).toBe("2026-02-21T10:45:00.000Z");
  expect(store.getState().isRunning).toBe(false);
});

test("rehydrates running timer after restart", async () => {
  const db = createInMemoryDb();
  initSchema(db);
  const storage = createMemoryStorage();
  const repo = createSleepSessionRepo(db);

  const firstStore = createSleepTimerStore(repo, storage);
  await firstStore.start("2026-02-21T11:00:00.000Z");

  const restartedStore = createSleepTimerStore(repo, storage);
  await restartedStore.rehydrate();

  expect(restartedStore.getState().isRunning).toBe(true);
  expect(restartedStore.getState().activeSessionStartAt).toBe("2026-02-21T11:00:00.000Z");
});