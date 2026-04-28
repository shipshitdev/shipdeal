import type { DatabaseSync } from "node:sqlite";

export function migrate(db: DatabaseSync): void {
	db.exec(`
		CREATE TABLE IF NOT EXISTS companies (
			id TEXT PRIMARY KEY,
			is_active INTEGER NOT NULL DEFAULT 0,
			legal_name TEXT NOT NULL,
			short_name TEXT NOT NULL,
			address_json TEXT NOT NULL,
			registration TEXT,
			vat_number TEXT,
			signatory_name TEXT NOT NULL,
			signatory_role TEXT NOT NULL,
			contact_email TEXT NOT NULL,
			jurisdiction TEXT NOT NULL,
			created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
			updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
		);

		CREATE UNIQUE INDEX IF NOT EXISTS companies_active_unique
			ON companies(is_active) WHERE is_active = 1;

		CREATE TABLE IF NOT EXISTS contract_drafts (
			id TEXT PRIMARY KEY,
			company_id TEXT REFERENCES companies(id) ON DELETE SET NULL,
			template_id TEXT NOT NULL,
			counterparty TEXT,
			client TEXT,
			title TEXT NOT NULL,
			file_name TEXT NOT NULL,
			markdown TEXT NOT NULL,
			summary_json TEXT NOT NULL,
			input_json TEXT NOT NULL,
			created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
		);

		CREATE INDEX IF NOT EXISTS contract_drafts_created_idx
			ON contract_drafts(created_at DESC);
	`);
}
