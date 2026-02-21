import type { ChildProfile, SleepSession, SuggestionSnapshot } from "../domain/types";

type TableName = "child_profiles" | "sleep_sessions" | "suggestion_snapshots";
type TableRow = ChildProfile | SleepSession | SuggestionSnapshot;

export type LocalDb = {
  initialize(): void;
  isInitialized(): boolean;
  upsert<T extends TableRow>(table: TableName, row: T): T;
  listAll<T extends TableRow>(table: TableName): T[];
};

const SCHEMA_STATEMENTS = [
  "CREATE TABLE IF NOT EXISTS child_profiles (id TEXT PRIMARY KEY, name TEXT NOT NULL, dateOfBirth TEXT NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL);",
  "CREATE TABLE IF NOT EXISTS sleep_sessions (id TEXT PRIMARY KEY, startAt TEXT NOT NULL, endAt TEXT NOT NULL, source TEXT NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL);",
  "CREATE TABLE IF NOT EXISTS suggestion_snapshots (id TEXT PRIMARY KEY, generatedAt TEXT NOT NULL, recommendedNapStartAt TEXT NOT NULL, estimatedDurationMin INTEGER NOT NULL, rationale TEXT NOT NULL, inputsVersion TEXT NOT NULL);"
];

export function getSchemaStatements(): string[] {
  return [...SCHEMA_STATEMENTS];
}

export function createInMemoryDb(): LocalDb {
  const tables: Record<TableName, Map<string, TableRow>> = {
    child_profiles: new Map(),
    sleep_sessions: new Map(),
    suggestion_snapshots: new Map()
  };
  let initialized = false;

  return {
    initialize() {
      initialized = true;
    },
    isInitialized() {
      return initialized;
    },
    upsert<T extends TableRow>(table: TableName, row: T): T {
      if (!initialized) {
        throw new Error("Database schema not initialized");
      }
      tables[table].set(row.id, row);
      return row;
    },
    listAll<T extends TableRow>(table: TableName): T[] {
      if (!initialized) {
        throw new Error("Database schema not initialized");
      }
      return Array.from(tables[table].values()) as T[];
    }
  };
}

export function initSchema(db: LocalDb): void {
  db.initialize();
}
