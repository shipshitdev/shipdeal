import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import {
	generateContractDraft,
	isTemplateId,
	type TemplateId,
} from "@shipdeal/contracts";
import { Command } from "commander";

const require = createRequire(import.meta.url);
const { version } = require("../package.json") as { version: string };

type DraftOptions = {
	client?: string;
	type?: string;
	value?: string;
	email?: string;
	scope?: string;
	jurisdiction?: string;
	paymentTerms?: string;
	startDate?: string;
	output?: string;
	print?: boolean;
	template?: string;
	counterparty?: string;
	provider?: string;
	pdf?: boolean;
};

const DEFAULT_OUTPUT_DIR = "shipdeal-contracts";

function resolveTemplate(value?: string): TemplateId | undefined {
	if (!value) return undefined;
	if (!isTemplateId(value)) {
		throw new Error(
			`Unknown template "${value}". Expected one of: legacy, msa, ai-architect.`,
		);
	}
	return value;
}

async function writeDraft(options: DraftOptions) {
	const template = resolveTemplate(options.template);

	const contract = generateContractDraft({
		client: options.client,
		contractType: options.type,
		value: options.value,
		email: options.email,
		scope: options.scope,
		jurisdiction: options.jurisdiction,
		paymentTerms: options.paymentTerms,
		startDate: options.startDate,
		template,
		counterparty: options.counterparty,
		provider: options.provider,
	});

	if (options.print) {
		process.stdout.write(contract.markdown);
		return;
	}

	const outputPath = resolve(
		options.output ?? `${DEFAULT_OUTPUT_DIR}/${contract.fileName}`,
	);

	mkdirSync(dirname(outputPath), { recursive: true });
	writeFileSync(outputPath, contract.markdown);
	console.log(`Created ${outputPath}`);

	if (options.pdf) {
		const pdfPath = outputPath.replace(/\.md$/i, ".pdf");
		try {
			const { markdownToPdf } = await import("@shipdeal/contracts/pdf");
			const buffer = await markdownToPdf(contract.markdown, {
				title: contract.title,
			});
			writeFileSync(pdfPath, buffer);
			console.log(`Created ${pdfPath}`);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			console.error(`PDF generation failed: ${message}`);
			console.error(
				"Hint: ensure puppeteer is installed and run `bunx puppeteer browsers install chrome`.",
			);
			process.exitCode = 1;
		}
	}
}

function initWorkspace() {
	const workspacePath = resolve(DEFAULT_OUTPUT_DIR);
	mkdirSync(workspacePath, { recursive: true });
	console.log(`Shipdeal workspace ready at ${workspacePath}`);
}

const program = new Command();

program
	.name("shipdeal")
	.description("Shipdeal - AI contract maker for consultants and agencies")
	.version(version);

program
	.command("init")
	.description("Create the local Shipdeal workspace folders")
	.action(initWorkspace);

program
	.command("new")
	.description("Generate a local Markdown contract draft")
	.option("-c, --client <name>", "client or company name")
	.option("-t, --type <type>", "contract type")
	.option("-v, --value <value>", "commercial value")
	.option("-e, --email <email>", "client email")
	.option("-s, --scope <scope>", "scope of work")
	.option("-j, --jurisdiction <jurisdiction>", "contract jurisdiction")
	.option("--payment-terms <terms>", "payment terms")
	.option("--start-date <date>", "expected start date")
	.option("-o, --output <path>", "output Markdown path")
	.option("--print", "print the generated draft instead of writing a file")
	.option(
		"--template <id>",
		"contract template: legacy | msa | ai-architect",
	)
	.option(
		"--counterparty <slug>",
		"counterparty preset (e.g. vitae-ai)",
	)
	.option("--provider <slug>", "provider preset (default: decod3rs)")
	.option("--pdf", "also emit a PDF next to the Markdown file")
	.action(writeDraft);

program.parse();
