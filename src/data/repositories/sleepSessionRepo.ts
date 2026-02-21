import type { LocalDb } from "../db";
import type { SleepSession } from "../../domain/types";

export type SleepSessionRepo = {
  create(session: SleepSession): Promise<SleepSession>;
  listAll(): Promise<SleepSession[]>;
  findOverlaps(startAt: string, endAt: string, excludeId?: string): Promise<SleepSession[]>;
};

export function createSleepSessionRepo(db: LocalDb): SleepSessionRepo {
  return {
    async create(session) {
      return db.upsert("sleep_sessions", session);
    },
    async listAll() {
      return db.listAll<SleepSession>("sleep_sessions");
    },
    async findOverlaps(startAt, endAt, excludeId) {
      const startMs = new Date(startAt).getTime();
      const endMs = new Date(endAt).getTime();
      const all = db.listAll<SleepSession>("sleep_sessions");
      return all.filter((session) => {
        if (excludeId && session.id === excludeId) {
          return false;
        }

        const sessionStartMs = new Date(session.startAt).getTime();
        const sessionEndMs = new Date(session.endAt).getTime();
        return startMs < sessionEndMs && endMs > sessionStartMs;
      });
    }
  };
}
