import { contextBridge, ipcRenderer } from "electron";
import type { ShipdealAPI } from "../shared/ipc";

const invoke: ShipdealAPI["invoke"] = ((channel: string, args?: unknown) =>
	ipcRenderer.invoke(channel, args)) as ShipdealAPI["invoke"];

const on: ShipdealAPI["on"] = (channel, callback) => {
	const handler = (_event: Electron.IpcRendererEvent, ...args: unknown[]) =>
		callback(...args);
	ipcRenderer.on(channel, handler);
	return () => {
		ipcRenderer.removeListener(channel, handler);
	};
};

contextBridge.exposeInMainWorld("shipdeal", Object.freeze({ invoke, on }));
