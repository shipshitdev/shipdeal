import type { CounterpartyProfile } from "./counterparty";
import type { ProviderProfile } from "./provider";

export function slugify(value: string): string {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 80);
}

export function formatLongDate(input?: string): string {
	if (!input) return "[EFFECTIVE DATE]";
	const date = new Date(input);
	if (Number.isNaN(date.getTime())) return input;
	return date.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

export function todayIso(): string {
	return new Date().toISOString().slice(0, 10);
}

export function renderAddress(lines: string[]): string {
	return lines.map((line) => line.trim()).filter(Boolean).join("  \n");
}

export function renderPartyBlock(label: string, party: ProviderProfile | CounterpartyProfile): string {
	const provider = party as Partial<ProviderProfile>;
	const reg = provider.registration ? `Company Registration: ${provider.registration}  \n` : "";
	const vat = provider.vatNumber ? `VAT: ${provider.vatNumber}  \n` : "";
	return [
		`**${label}:**`,
		"",
		`**${party.legalName}**  `,
		renderAddress(party.address),
		reg || vat ? `${reg}${vat}` : "",
	]
		.filter(Boolean)
		.join("\n");
}

export function renderSignatureBlock(party: ProviderProfile | CounterpartyProfile): string {
	const name = party.signatoryName ?? "[SIGNATORY NAME]";
	const role = party.signatoryRole ?? "[SIGNATORY ROLE]";
	return [
		`**${party.legalName}**`,
		"",
		`Signed: _______________________________`,
		"",
		`Name: ${name}`,
		"",
		`Title: ${role}`,
		"",
		`Date: _______________________________`,
	].join("\n");
}

export function bulletList(items: string[]): string {
	return items.map((item) => `- ${item}`).join("\n");
}

export function numberedList(items: string[]): string {
	return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}
