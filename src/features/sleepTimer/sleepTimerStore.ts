import type { SleepSessionRepo } from "../../data/repositories/sleepSessionRepo";

const ACTIVE_TIMER_STORAGE_KEY = "lotus.activeTimer";

type PersistedTimerState = {
  activeSessionStartAt: string;
};

export type SleepTimerState = {
  isRunning: boolean;
  activeSessionStartAt: string | null;
};

export type KeyValueStorage = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

export type SleepTimerStore = {
  getState(): SleepTimerState;
  start(startAt: string): Promise<void>;
  stop(endAt: string): Promise<void>;
  rehydrate(): Promise<void>;
};

export function createSleepTimerStore(
  sleepSessionRepo: SleepSessionRepo,
  storage: KeyValueStorage
): SleepTimerStore {
  const state: SleepTimerState = {
    isRunning: false,
    activeSessionStartAt: null
  };

  return {
    getState() {
      return { ...state };
    },
    async start(startAt) {
      state.isRunning = true;
      state.activeSessionStartAt = startAt;
      const payload: PersistedTimerState = { activeSessionStartAt: startAt };
      await storage.setItem(ACTIVE_TIMER_STORAGE_KEY, JSON.stringify(payload));
    },
    async stop(endAt) {
      if (!state.isRunning || !state.activeSessionStartAt) {
        throw new Error("Cannot stop sleep timer when no active session exists");
      }

      await sleepSessionRepo.create({
        id: `session-${Date.now()}`,
        startAt: state.activeSessionStartAt,
        endAt,
        source: "timer",
        createdAt: endAt,
        updatedAt: endAt
      });

      state.isRunning = false;
      state.activeSessionStartAt = null;
      await storage.removeItem(ACTIVE_TIMER_STORAGE_KEY);
    },
    async rehydrate() {
      const rawValue = await storage.getItem(ACTIVE_TIMER_STORAGE_KEY);
      if (!rawValue) {
        return;
      }

      const persisted = JSON.parse(rawValue) as PersistedTimerState;
      state.isRunning = true;
      state.activeSessionStartAt = persisted.activeSessionStartAt;
    }
  };
}
