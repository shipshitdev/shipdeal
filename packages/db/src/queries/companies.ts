import { randomUUID } from "node:crypto";
import type { DatabaseSync } from "node:sqlite";
import type { ProviderProfile } from "@shipdeal/contracts";
import { asRow, transaction } from "../utils";

type CompanyRow = {
	id: string;
	is_active: number;
	legal_name: string;
	short_name: string;
	address_json: string;
	registration: string | null;
	vat_number: string | null;
	signatory_name: string;
	signatory_role: string;
	contact_email: string;
	jurisdiction: string;
	created_at: string;
	updated_at: string;
};

export type StoredCompany = ProviderProfile & {
	id: string;
	createdAt: string;
	updatedAt: string;
};

function rowToCompany(row: CompanyRow): StoredCompany {
	return {
		id: row.id,
		legalName: row.legal_name,
		shortName: row.short_name,
		address: JSON.parse(row.address_json) as string[],
		registration: row.registration ?? undefined,
		vatNumber: row.vat_number ?? undefined,
		signatoryName: row.signatory_name,
		signatoryRole: row.signatory_role,
		contactEmail: row.contact_email,
		jurisdiction: row.jurisdiction,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	};
}

export const CompaniesQueries = {
	getActive(db: DatabaseSync): StoredCompany | null {
		const stmt = db.prepare(
			"SELECT * FROM companies WHERE is_active = 1 LIMIT 1",
		);
		const row = asRow<CompanyRow | undefined>(stmt.get());
		return row ? rowToCompany(row) : null;
	},

	upsertActive(db: DatabaseSync, profile: ProviderProfile): StoredCompany {
		return transaction(db, () => {
			const existing = asRow<CompanyRow | undefined>(
				db.prepare("SELECT * FROM companies WHERE is_active = 1 LIMIT 1").get(),
			);

			const now = new Date().toISOString();
			const addressJson = JSON.stringify(profile.address);

			if (existing) {
				db.prepare(
					`UPDATE companies SET
						legal_name = ?,
						short_name = ?,
						address_json = ?,
						registration = ?,
						vat_number = ?,
						signatory_name = ?,
						signatory_role = ?,
						contact_email = ?,
						jurisdiction = ?,
						updated_at = ?
					WHERE id = ?`,
				).run(
					profile.legalName,
					profile.shortName,
					addressJson,
					profile.registration ?? null,
					profile.vatNumber ?? null,
					profile.signatoryName,
					profile.signatoryRole,
					profile.contactEmail,
					profile.jurisdiction,
					now,
					existing.id,
				);
				const updated = asRow<CompanyRow>(
					db.prepare("SELECT * FROM companies WHERE id = ?").get(existing.id),
				);
				return rowToCompany(updated);
			}

			const id = randomUUID();
			db.prepare(
				`INSERT INTO companies (
					id, is_active, legal_name, short_name, address_json,
					registration, vat_number, signatory_name, signatory_role,
					contact_email, jurisdiction, created_at, updated_at
				) VALUES (?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			).run(
				id,
				profile.legalName,
				profile.shortName,
				addressJson,
				profile.registration ?? null,
				profile.vatNumber ?? null,
				profile.signatoryName,
				profile.signatoryRole,
				profile.contactEmail,
				profile.jurisdiction,
				now,
				now,
			);

			const inserted = asRow<CompanyRow>(
				db.prepare("SELECT * FROM companies WHERE id = ?").get(id),
			);
			return rowToCompany(inserted);
		});
	},
};
