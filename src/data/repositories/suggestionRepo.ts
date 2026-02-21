import type { LocalDb } from "../db";
import type { SuggestionSnapshot } from "../../domain/types";

export type SuggestionSnapshotRepo = {
  create(snapshot: SuggestionSnapshot): Promise<SuggestionSnapshot>;
  listAll(): Promise<SuggestionSnapshot[]>;
};

export function createSuggestionSnapshotRepo(db: LocalDb): SuggestionSnapshotRepo {
  return {
    async create(snapshot) {
      return db.upsert("suggestion_snapshots", snapshot);
    },
    async listAll() {
      return db.listAll<SuggestionSnapshot>("suggestion_snapshots");
    }
  };
}
