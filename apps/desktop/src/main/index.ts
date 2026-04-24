import fs from "node:fs";
import path from "node:path";
import { generateContractDraft } from "@shipdeal/contracts";
import { app, BrowserWindow, dialog, ipcMain, Menu, shell } from "electron";

app.setName("Shipdeal");

let mainWindow: BrowserWindow | null = null;

const DIST = path.join(__dirname, "..");
const RENDERER_URL = process.env.VITE_DEV_SERVER_URL;
const RENDERER_HTML = path.join(DIST, "index.html");

function requireMainWindow() {
	if (!mainWindow) throw new Error("Main window not initialized");
	return mainWindow;
}

function registerIpcHandlers() {
	ipcMain.handle("contract:generate", (_event, args) =>
		generateContractDraft(args ?? {}),
	);

	ipcMain.handle("contract:save-draft", async (_event, args) => {
		const contract = args?.contract;
		if (!contract?.markdown || !contract?.fileName) {
			throw new Error("Missing generated contract");
		}

		const result = await dialog.showSaveDialog(requireMainWindow(), {
			title: "Save contract draft",
			defaultPath: path.join(app.getPath("documents"), contract.fileName),
			filters: [{ name: "Markdown", extensions: ["md"] }],
		});

		if (result.canceled || !result.filePath) return null;
		fs.mkdirSync(path.dirname(result.filePath), { recursive: true });
		fs.writeFileSync(result.filePath, contract.markdown);
		return { path: result.filePath };
	});

	ipcMain.handle("shell:open-path", async (_event, args) => {
		const targetPath = args?.path;
		if (typeof targetPath !== "string" || targetPath.length === 0) return;
		shell.showItemInFolder(targetPath);
	});
}

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1380,
		height: 900,
		minWidth: 1040,
		minHeight: 680,
		backgroundColor: "#050607",
		show: false,
		titleBarStyle: "hiddenInset",
		webPreferences: {
			preload: path.join(DIST, "preload", "index.js"),
			contextIsolation: true,
			nodeIntegration: false,
			sandbox: false,
		},
	});

	mainWindow.once("ready-to-show", () => {
		mainWindow?.show();
	});

	const scriptSrc = RENDERER_URL
		? "'self' 'unsafe-eval' 'unsafe-inline'"
		: "'self'";
	const connectSrc = RENDERER_URL
		? "'self' ws://localhost:* http://localhost:*"
		: "'self'";

	mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
		callback({
			responseHeaders: {
				...details.responseHeaders,
				"Content-Security-Policy": [
					`default-src 'none'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; connect-src ${connectSrc}; img-src 'self' data:; font-src 'self' data:`,
				],
			},
		});
	});

	if (RENDERER_URL) {
		mainWindow.loadURL(RENDERER_URL);
	} else {
		mainWindow.loadFile(RENDERER_HTML);
	}

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

app.whenReady().then(() => {
	registerIpcHandlers();

	const menu = Menu.buildFromTemplate([
		{
			label: "Shipdeal",
			submenu: [
				{ label: "About Shipdeal", role: "about" },
				{ type: "separator" },
				{ label: "Hide Shipdeal", role: "hide" },
				{ label: "Hide Others", role: "hideOthers" },
				{ label: "Show All", role: "unhide" },
				{ type: "separator" },
				{ label: "Quit Shipdeal", role: "quit" },
			],
		},
		{
			label: "Edit",
			submenu: [
				{ role: "undo" },
				{ role: "redo" },
				{ type: "separator" },
				{ role: "cut" },
				{ role: "copy" },
				{ role: "paste" },
				{ role: "selectAll" },
			],
		},
		{
			label: "Window",
			role: "window",
			submenu: [
				{ role: "minimize" },
				{ role: "zoom" },
				{ type: "separator" },
				{ role: "front" },
				{ role: "close" },
			],
		},
		{
			label: "Community",
			submenu: [
				{
					label: "GitHub",
					click: () =>
						shell.openExternal("https://github.com/shipshitdev/shipdeal"),
				},
				{
					label: "shipshit.dev",
					click: () => shell.openExternal("https://shipshit.dev"),
				},
			],
		},
	]);
	Menu.setApplicationMenu(menu);
	createWindow();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
