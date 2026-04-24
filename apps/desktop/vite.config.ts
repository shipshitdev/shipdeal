import { builtinModules } from "node:module";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin, type UserConfig } from "vite";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";

const NATIVE_EXTERNALS = [
	"electron",
	...builtinModules,
	...builtinModules.map((moduleName) => `node:${moduleName}`),
];

type AliasEntry = {
	find: string | RegExp;
	replacement: string;
	customResolver?: (
		source: string,
		importer?: string,
		options?: Parameters<NonNullable<Plugin["resolveId"]>>[2],
	) => ReturnType<NonNullable<Plugin["resolveId"]>>;
};

function stripInvalidFreezeOutputOption(config: UserConfig) {
	const output = config.build?.rollupOptions?.output;
	if (!output) return;

	const stripFreeze = <T extends Record<string, unknown>>(entry: T): T => {
		if (!("freeze" in entry)) return entry;
		const { freeze: _freeze, ...rest } = entry;
		return rest as T;
	};

	config.build = {
		...config.build,
		rollupOptions: {
			...config.build?.rollupOptions,
			output: Array.isArray(output)
				? output.map((entry) => stripFreeze(entry as Record<string, unknown>))
				: stripFreeze(output as Record<string, unknown>),
		},
	};
}

function resolveAliasTarget(source: string, entry: AliasEntry) {
	if (typeof entry.find === "string") {
		return {
			matched: source === entry.find,
			nextSource: source === entry.find ? entry.replacement : source,
		};
	}

	if (!entry.find.test(source)) {
		return { matched: false, nextSource: source };
	}

	return {
		matched: true,
		nextSource: source.replace(entry.find, entry.replacement),
	};
}

function extractAliasCustomResolverCompat(config: UserConfig): Plugin | null {
	const alias = config.resolve?.alias;
	if (!Array.isArray(alias)) return null;

	const resolverEntries: AliasEntry[] = [];
	const rewritten = alias.map((entry) => {
		if (!entry || typeof entry !== "object" || !("customResolver" in entry)) {
			return entry;
		}

		const aliasEntry = entry as AliasEntry;
		if (typeof aliasEntry.customResolver === "function") {
			resolverEntries.push(aliasEntry);
		}

		const { customResolver: _customResolver, ...withoutCustomResolver } =
			aliasEntry;
		return withoutCustomResolver;
	});

	config.resolve = { ...config.resolve, alias: rewritten };
	if (resolverEntries.length === 0) return null;

	return {
		name: "shipdeal-alias-custom-resolver-compat",
		enforce: "pre",
		async resolveId(source, importer, options) {
			for (const entry of resolverEntries) {
				const { matched, nextSource } = resolveAliasTarget(source, entry);
				if (!matched || typeof entry.customResolver !== "function") continue;
				const resolved = await entry.customResolver(nextSource, importer, options);
				if (resolved) return resolved;
			}
			return null;
		},
	};
}

export default defineConfig(async ({ command, mode }) => {
	const config: UserConfig = {
		plugins: [
			react(),
			tailwindcss(),
			electron([
				{
					entry: "src/main/index.ts",
					vite: {
						build: {
							outDir: "dist/main",
							lib: {
								entry: "src/main/index.ts",
								formats: ["cjs"],
								fileName: () => "index.js",
							},
							rollupOptions: {
								external: NATIVE_EXTERNALS,
								output: { format: "cjs" },
							},
						},
					},
				},
				{
					entry: "src/preload/index.ts",
					onstart(args) {
						args.reload();
					},
					vite: {
						build: {
							outDir: "dist/preload",
							lib: {
								entry: "src/preload/index.ts",
								formats: ["cjs"],
								fileName: () => "index.js",
							},
							rollupOptions: {
								external: NATIVE_EXTERNALS,
								output: { format: "cjs" },
							},
						},
					},
				},
			]),
		],
		resolve: {
			alias: [
				{
					find: "@",
					replacement: path.resolve(__dirname, "./src/renderer"),
				},
			],
		},
	};

	const rendererPlugin = renderer();
	await rendererPlugin.config?.(config, { command, mode });
	stripInvalidFreezeOutputOption(config);
	const aliasCompatPlugin = extractAliasCustomResolverCompat(config);

	return {
		...config,
		plugins: aliasCompatPlugin
			? [...(config.plugins ?? []), aliasCompatPlugin]
			: config.plugins,
	};
});
