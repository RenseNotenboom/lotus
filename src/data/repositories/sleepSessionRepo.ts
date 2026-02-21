import type { LocalDb } from "../db";
import type { SleepSession } from "../../domain/types";

export type SleepSessionRepo = {
  create(session: SleepSession): Promise<SleepSession>;
  listAll(): Promise<SleepSession[]>;
};

export function createSleepSessionRepo(db: LocalDb): SleepSessionRepo {
  return {
    async create(session) {
      return db.upsert("sleep_sessions", session);
    },
    async listAll() {
      return db.listAll<SleepSession>("sleep_sessions");
    }
  };
}
