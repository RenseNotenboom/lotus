import { useCallback, useMemo, useState } from "react";
import { createInMemoryDb, initSchema } from "../../data/db";
import { createSleepSessionRepo } from "../../data/repositories/sleepSessionRepo";
import { createSleepTimerStore, type KeyValueStorage, type SleepTimerState } from "./sleepTimerStore";

function createMemoryStorage(): KeyValueStorage {
  const values = new Map<string, string>();
  return {
    async getItem(key) {
      return values.has(key) ? values.get(key)! : null;
    },
    async setItem(key, value) {
      values.set(key, value);
    },
    async removeItem(key) {
      values.delete(key);
    }
  };
}

const db = createInMemoryDb();
initSchema(db);
const store = createSleepTimerStore(createSleepSessionRepo(db), createMemoryStorage());

export function useSleepTimer() {
  const [state, setState] = useState<SleepTimerState>(store.getState());

  const refresh = useCallback(() => {
    setState(store.getState());
  }, []);

  const actions = useMemo(
    () => ({
      async start(startAt: string) {
        await store.start(startAt);
        refresh();
      },
      async stop(endAt: string) {
        await store.stop(endAt);
        refresh();
      },
      async rehydrate() {
        await store.rehydrate();
        refresh();
      }
    }),
    [refresh]
  );

  return { state, ...actions };
}
