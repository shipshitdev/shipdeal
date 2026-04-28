import { createRequire } from "node:module";
import path from "node:path";
import type { DatabaseSync } from "node:sqlite";
import { migrate } from "./schema";

export { CompaniesQueries, type StoredCompany } from "./queries/companies";
export { DraftsQueries, type StoredDraft } from "./queries/drafts";
export { transaction } from "./utils";

const _require = createRequire(
	typeof __filename === "string" ? __filename : import.meta.url,
);

let _DatabaseSyncCtor: typeof DatabaseSync | null = null;

function loadDatabaseSync(): typeof DatabaseSync {
	if (_DatabaseSyncCtor) return _DatabaseSyncCtor;
	const mod = _require("node:sqlite") as {
		DatabaseSync: typeof DatabaseSync;
	};
	_DatabaseSyncCtor = mod.DatabaseSync;
	return _DatabaseSyncCtor;
}

let db: DatabaseSync | null = null;

export function getDatabase(dataDir: string): DatabaseSync {
	if (db) return db;

	const dbPath = path.join(dataDir, "shipdeal.db");
	const Ctor = loadDatabaseSync();
	db = new Ctor(dbPath, { enableForeignKeyConstraints: true });

	db.exec("PRAGMA journal_mode = WAL");
	db.exec("PRAGMA busy_timeout = 5000");

	migrate(db);

	return db;
}

export function closeDatabase(): void {
	if (db) {
		db.close();
		db = null;
	}
}
