import type { LocalDb } from "../db";
import type { ChildProfile } from "../../domain/types";

export type ChildProfileRepo = {
  upsert(profile: ChildProfile): Promise<ChildProfile>;
  listAll(): Promise<ChildProfile[]>;
};

export function createChildProfileRepo(db: LocalDb): ChildProfileRepo {
  return {
    async upsert(profile) {
      return db.upsert("child_profiles", profile);
    },
    async listAll() {
      return db.listAll<ChildProfile>("child_profiles");
    }
  };
}
