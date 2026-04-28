import { describe, expect, test } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { decod3rsProfile } from "@shipdeal/contracts";
import { CompaniesQueries, getDatabase, closeDatabase } from "../src/index";

function freshDb() {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), "shipdeal-db-"));
	closeDatabase();
	return getDatabase(dir);
}

describe("CompaniesQueries", () => {
	test("getActive returns null on empty db", () => {
		const db = freshDb();
		expect(CompaniesQueries.getActive(db)).toBeNull();
	});

	test("upsertActive inserts on first call", () => {
		const db = freshDb();
		const stored = CompaniesQueries.upsertActive(db, decod3rsProfile);
		expect(stored.legalName).toBe(decod3rsProfile.legalName);
		expect(stored.registration).toBe("MT C 103670");
		expect(stored.address).toEqual(decod3rsProfile.address);
	});

	test("upsertActive updates existing row, keeps single active", () => {
		const db = freshDb();
		const first = CompaniesQueries.upsertActive(db, decod3rsProfile);
		const updated = CompaniesQueries.upsertActive(db, {
			...decod3rsProfile,
			signatoryName: "Vincent New",
		});
		expect(updated.id).toBe(first.id);
		expect(updated.signatoryName).toBe("Vincent New");

		const active = CompaniesQueries.getActive(db);
		expect(active?.id).toBe(first.id);
	});
});
