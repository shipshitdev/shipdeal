import { randomUUID } from "node:crypto";
import type { DatabaseSync } from "node:sqlite";
import type { ContractDraftInput, GeneratedContract } from "@shipdeal/contracts";
import { asRow, asRows } from "../utils";

type DraftRow = {
	id: string;
	company_id: string | null;
	template_id: string;
	counterparty: string | null;
	client: string | null;
	title: string;
	file_name: string;
	markdown: string;
	summary_json: string;
	input_json: string;
	created_at: string;
};

export type StoredDraft = GeneratedContract & {
	id: string;
	companyId: string | null;
	templateId: string;
	counterparty: string | null;
	client: string | null;
	input: Partial<ContractDraftInput>;
	createdAt: string;
};

function rowToDraft(row: DraftRow): StoredDraft {
	return {
		id: row.id,
		companyId: row.company_id,
		templateId: row.template_id,
		counterparty: row.counterparty,
		client: row.client,
		title: row.title,
		fileName: row.file_name,
		markdown: row.markdown,
		summary: JSON.parse(row.summary_json) as string[],
		input: JSON.parse(row.input_json) as Partial<ContractDraftInput>,
		createdAt: row.created_at,
	};
}

export const DraftsQueries = {
	create(
		db: DatabaseSync,
		params: {
			companyId: string | null;
			input: Partial<ContractDraftInput>;
			contract: GeneratedContract;
		},
	): StoredDraft {
		const id = randomUUID();
		const now = new Date().toISOString();
		const templateId = params.input.template ?? "legacy";
		const counterparty = params.input.counterparty ?? null;
		const client = params.input.client ?? null;

		const sanitizedInput = { ...params.input };
		delete sanitizedInput.providerOverride;

		db.prepare(
			`INSERT INTO contract_drafts (
				id, company_id, template_id, counterparty, client,
				title, file_name, markdown, summary_json, input_json, created_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		).run(
			id,
			params.companyId,
			templateId,
			counterparty,
			client,
			params.contract.title,
			params.contract.fileName,
			params.contract.markdown,
			JSON.stringify(params.contract.summary),
			JSON.stringify(sanitizedInput),
			now,
		);

		const row = asRow<DraftRow>(
			db.prepare("SELECT * FROM contract_drafts WHERE id = ?").get(id),
		);
		return rowToDraft(row);
	},

	list(db: DatabaseSync, limit = 50): StoredDraft[] {
		const rows = asRows<DraftRow>(
			db
				.prepare(
					"SELECT * FROM contract_drafts ORDER BY created_at DESC LIMIT ?",
				)
				.all(limit),
		);
		return rows.map(rowToDraft);
	},

	get(db: DatabaseSync, id: string): StoredDraft | null {
		const row = asRow<DraftRow | undefined>(
			db.prepare("SELECT * FROM contract_drafts WHERE id = ?").get(id),
		);
		return row ? rowToDraft(row) : null;
	},

	delete(db: DatabaseSync, id: string): void {
		db.prepare("DELETE FROM contract_drafts WHERE id = ?").run(id);
	},
};
