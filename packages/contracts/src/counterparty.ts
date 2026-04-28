export type CounterpartyProfile = {
	legalName: string;
	address: string[];
	signatoryName?: string;
	signatoryRole?: string;
	contactEmail?: string;
};

export const vitaeAiProfile: CounterpartyProfile = {
	legalName: "Vitae AI Ltd.",
	address: ["Floor 1 - 10 York Road", "London, UK, SE1 7ND"],
	signatoryName: "Poya Farighi",
	signatoryRole: "Managing Director",
};

export const counterparties: Record<string, CounterpartyProfile> = {
	"vitae-ai": vitaeAiProfile,
};

export function resolveCounterparty(
	slug?: string,
	fallbackName?: string,
): CounterpartyProfile {
	if (slug && counterparties[slug]) return counterparties[slug];
	return {
		legalName: fallbackName?.trim() || "[CLIENT NAME]",
		address: ["[CLIENT ADDRESS LINE 1]", "[CLIENT ADDRESS LINE 2]"],
	};
}
