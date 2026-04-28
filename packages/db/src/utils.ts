import type { DatabaseSync } from "node:sqlite";

export function transaction<T>(db: DatabaseSync, fn: () => T): T {
	if (db.isTransaction) {
		return fn();
	}
	db.exec("BEGIN");
	try {
		const result = fn();
		db.exec("COMMIT");
		return result;
	} catch (err) {
		db.exec("ROLLBACK");
		throw err;
	}
}

export function asRow<T>(value: unknown): T {
	return value as T;
}

export function asRows<T>(value: unknown): T[] {
	return value as T[];
}
