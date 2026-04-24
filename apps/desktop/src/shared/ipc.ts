import type { ContractDraftInput, GeneratedContract } from "@shipdeal/contracts";

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
};

export type ShipdealAPI = {
	invoke<K extends keyof ShipdealInvokeMap>(
		channel: K,
		args: ShipdealInvokeMap[K]["args"],
	): Promise<ShipdealInvokeMap[K]["result"]>;
	invoke<T = unknown>(channel: string, args?: unknown): Promise<T>;
	on(channel: string, callback: (...args: unknown[]) => void): () => void;
};
