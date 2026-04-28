import type {
	ContractDraftInput,
	GeneratedContract,
	ProviderProfile,
} from "@shipdeal/contracts";

export type DraftRecord = GeneratedContract & {
	id: string;
	companyId: string | null;
	templateId: string;
	counterparty: string | null;
	client: string | null;
	input: Partial<ContractDraftInput>;
	createdAt: string;
};

export type ShipdealInvokeMap = {
	"contract:generate": {
		args: Partial<ContractDraftInput>;
		result: GeneratedContract;
	};
	"contract:save-draft": {
		args: { contract: GeneratedContract };
		result: { path: string } | null;
	};
	"shell:open-path": {
		args: { path: string };
		result: void;
	};
	"settings:get-company": {
		args: undefined;
		result: ProviderProfile;
	};
	"settings:set-company": {
		args: { company: ProviderProfile };
		result: { ok: true };
	};
	"drafts:list": {
		args: undefined;
		result: DraftRecord[];
	};
	"drafts:delete": {
		args: { id: string };
		result: { ok: true };
	};
};

export type ShipdealAPI = {
	invoke<K extends keyof ShipdealInvokeMap>(
		channel: K,
		args: ShipdealInvokeMap[K]["args"],
	): Promise<ShipdealInvokeMap[K]["result"]>;
	invoke<T = unknown>(channel: string, args?: unknown): Promise<T>;
	on(channel: string, callback: (...args: unknown[]) => void): () => void;
};
