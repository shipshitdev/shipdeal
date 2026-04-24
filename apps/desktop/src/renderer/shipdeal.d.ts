import type { ShipdealAPI } from "../shared/ipc";

declare global {
	interface Window {
		shipdeal: ShipdealAPI;
	}
}
