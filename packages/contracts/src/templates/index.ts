import type { CounterpartyProfile } from "../counterparty";
import type { ProviderProfile } from "../provider";
import { renderAiArchitect } from "./ai-architect";
import { renderEquitySideLetter } from "./equity-side-letter";
import { renderMsa } from "./msa";

export type TemplateId =
	| "legacy"
	| "msa"
	| "ai-architect"
	| "equity-side-letter";

export type TemplateContext = {
	provider: ProviderProfile;
	counterparty: CounterpartyProfile;
	effectiveDate?: string;
	paymentTerms?: string;
};

export const templateIds: TemplateId[] = [
	"legacy",
	"msa",
	"ai-architect",
	"equity-side-letter",
];

export function isTemplateId(value: unknown): value is TemplateId {
	return typeof value === "string" && templateIds.includes(value as TemplateId);
}

export const templates = {
	msa: renderMsa,
	"ai-architect": renderAiArchitect,
	"equity-side-letter": renderEquitySideLetter,
} as const;
