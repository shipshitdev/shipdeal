import { describe, expect, test } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { decod3rsProfile, generateContractDraft } from "@shipdeal/contracts";
import {
	CompaniesQueries,
	DraftsQueries,
	closeDatabase,
	getDatabase,
} from "../src/index";

function freshDb() {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), "shipdeal-db-"));
	closeDatabase();
	return getDatabase(dir);
}

describe("DraftsQueries", () => {
	test("create persists generated contract + lists newest first", () => {
		const db = freshDb();
		const company = CompaniesQueries.upsertActive(db, decod3rsProfile);

		const input = {
			template: "msa" as const,
			client: "[CLIENT NAME]",
			providerOverride: decod3rsProfile,
		};
		const contract = generateContractDraft(input);

		const draft = DraftsQueries.create(db, {
			companyId: company.id,
			input,
			contract,
		});

		expect(draft.companyId).toBe(company.id);
		expect(draft.templateId).toBe("msa");
		expect(draft.markdown).toBe(contract.markdown);
		expect(draft.input.providerOverride).toBeUndefined();

		const list = DraftsQueries.list(db);
		expect(list).toHaveLength(1);
		expect(list[0]?.id).toBe(draft.id);
	});

	test("delete removes draft", () => {
		const db = freshDb();
		const input = { template: "ai-architect" as const, counterparty: "vitae-ai" };
		const contract = generateContractDraft(input);
		const draft = DraftsQueries.create(db, {
			companyId: null,
			input,
			contract,
		});
		DraftsQueries.delete(db, draft.id);
		expect(DraftsQueries.get(db, draft.id)).toBeNull();
	});
});
