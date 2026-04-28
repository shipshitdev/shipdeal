import fs from "node:fs";
import path from "node:path";
import {
	decod3rsProfile,
	generateContractDraft,
	type ProviderProfile,
} from "@shipdeal/contracts";
import {
	CompaniesQueries,
	DraftsQueries,
	closeDatabase,
	getDatabase,
} from "@shipdeal/db";
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

function db() {
	return getDatabase(app.getPath("userData"));
}

function legacyCompanyJsonPath(): string {
	return path.join(app.getPath("userData"), "company.json");
}

function migrateLegacyCompanyJson() {
	const legacyPath = legacyCompanyJsonPath();
	if (!fs.existsSync(legacyPath)) return;
	if (CompaniesQueries.getActive(db())) {
		fs.renameSync(legacyPath, `${legacyPath}.migrated`);
		return;
	}
	try {
		const raw = fs.readFileSync(legacyPath, "utf-8");
		const parsed = JSON.parse(raw) as Partial<ProviderProfile>;
		const merged: ProviderProfile = { ...decod3rsProfile, ...parsed };
		CompaniesQueries.upsertActive(db(), merged);
		fs.renameSync(legacyPath, `${legacyPath}.migrated`);
	} catch (err) {
		console.error("Failed to migrate company.json", err);
	}
}

function loadCompany(): ProviderProfile {
	const stored = CompaniesQueries.getActive(db());
	if (stored) {
		const { id: _id, createdAt: _c, updatedAt: _u, ...profile } = stored;
		return profile;
	}
	return decod3rsProfile;
}

function saveCompany(company: ProviderProfile) {
	CompaniesQueries.upsertActive(db(), company);
}

function registerIpcHandlers() {
	ipcMain.handle("contract:generate", (_event, args) => {
		const provider = loadCompany();
		const input = { ...(args ?? {}), providerOverride: provider };
		const contract = generateContractDraft(input);
		const active = CompaniesQueries.getActive(db());
		try {
			DraftsQueries.create(db(), {
				companyId: active?.id ?? null,
				input,
				contract,
			});
		} catch (err) {
			console.error("Failed to persist draft", err);
		}
		return contract;
	});

	ipcMain.handle("settings:get-company", () => loadCompany());

	ipcMain.handle("settings:set-company", (_event, args) => {
		const company = args?.company;
		if (!company?.legalName) throw new Error("Invalid company payload");
		saveCompany(company);
		return { ok: true };
	});

	ipcMain.handle("drafts:list", () => DraftsQueries.list(db()));

	ipcMain.handle("drafts:delete", (_event, args) => {
		const id = args?.id;
		if (typeof id !== "string" || !id) throw new Error("Missing draft id");
		DraftsQueries.delete(db(), id);
		return { ok: true };
	});

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
	migrateLegacyCompanyJson();
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

app.on("before-quit", () => {
	closeDatabase();
});
