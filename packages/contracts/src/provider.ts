export type ProviderProfile = {
	legalName: string;
	shortName: string;
	address: string[];
	registration?: string;
	vatNumber?: string;
	signatoryName: string;
	signatoryRole: string;
	contactEmail: string;
	jurisdiction: string;
};

export const decod3rsProfile: ProviderProfile = {
	legalName: "Decod3RS Labs Ltd.",
	shortName: "Decod3RS",
	address: [
		"107 Penthouse No. 4",
		"Triq Manwel Dimech",
		"SLM 1055 Sliema",
		"Malta",
	],
	registration: "MT C 103670",
	vatNumber: "MT29707136",
	signatoryName: "Vincent Tellier",
	signatoryRole: "Director",
	contactEmail: "vincent@genfeed.ai",
	jurisdiction: "Malta",
};

export const providers: Record<string, ProviderProfile> = {
	decod3rs: decod3rsProfile,
};

export function resolveProvider(slug?: string): ProviderProfile {
	if (!slug) return decod3rsProfile;
	return providers[slug] ?? decod3rsProfile;
}
