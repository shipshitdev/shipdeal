import { marked } from "marked";
import puppeteer from "puppeteer";

export type PdfFormat = "Letter" | "A4";

export type MarkdownToPdfOptions = {
	title?: string;
	format?: PdfFormat;
	margin?: { top?: string; right?: string; bottom?: string; left?: string };
};

const DEFAULT_MARGIN = {
	top: "1.1in",
	right: "0.95in",
	bottom: "1.1in",
	left: "0.95in",
};

const PRINT_CSS = `
:root { color-scheme: light; }
* { box-sizing: border-box; }
html, body {
	margin: 0;
	padding: 0;
	font-family: "Times New Roman", Times, "Liberation Serif", serif;
	font-size: 11pt;
	line-height: 1.45;
	color: #111;
	background: #fff;
}
.doc {
	max-width: 7.2in;
	margin: 0 auto;
}
h1, h2, h3, h4 {
	font-weight: 700;
	page-break-after: avoid;
}
h1 {
	font-size: 18pt;
	text-align: center;
	margin: 0 0 1.2em;
	padding-bottom: 0.4em;
	border-bottom: 1px solid #222;
}
h2 {
	font-size: 13pt;
	margin: 1.6em 0 0.6em;
	page-break-before: auto;
}
h2:has(+ p:first-of-type) { page-break-after: avoid; }
h3 {
	font-size: 11.5pt;
	margin: 1.2em 0 0.4em;
}
p {
	margin: 0 0 0.7em;
	text-align: justify;
	orphans: 99;
	widows: 99;
	page-break-inside: avoid !important;
	break-inside: avoid !important;
}
ul, ol {
	margin: 0.4em 0 0.9em 1.6em;
	padding: 0;
	page-break-inside: auto;
	break-inside: auto;
}
li {
	margin: 0.25em 0;
	page-break-inside: avoid !important;
	break-inside: avoid !important;
	orphans: 99;
	widows: 99;
}
strong { font-weight: 700; }
hr {
	border: 0;
	border-top: 1px solid #999;
	margin: 1.6em 0;
}
table {
	width: 100%;
	border-collapse: collapse;
	margin: 0.8em 0 1.2em;
	page-break-inside: avoid;
}
th, td {
	border: 1px solid #444;
	padding: 6px 9px;
	text-align: left;
	vertical-align: top;
}
code {
	font-family: "Menlo", "Courier New", monospace;
	font-size: 0.92em;
}
mark.todo {
	background: #fff59d;
	color: #4a3500;
	padding: 0 3px;
	border-radius: 2px;
	font-weight: 600;
	-webkit-print-color-adjust: exact;
	print-color-adjust: exact;
}
mark.todo code { background: transparent; color: inherit; }
blockquote {
	margin: 0.6em 0 0.9em;
	padding: 0.2em 0.9em;
	border-left: 3px solid #888;
	color: #333;
}
h2:contains("Schedule") { page-break-before: always; }
.signatures, .signature-block { page-break-inside: avoid; }
@page {
	size: Letter;
	margin: 0;
}
@media print {
	html, body { width: 100%; }
}
`;

function wrapHtml(htmlBody: string, title: string): string {
	return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<style>${PRINT_CSS}</style>
</head>
<body>
<article class="doc">
${htmlBody}
</article>
</body>
</html>`;
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function injectScheduleBreaks(html: string): string {
	return html.replace(
		/<h2>(\s*Schedule [A-Z][^<]*)<\/h2>/g,
		'<h2 style="page-break-before: always;">$1</h2>',
	);
}

const PLACEHOLDER_PATTERN = /\[[^\]\n]+\](?!\()/g;

function highlightPlaceholders(markdown: string): string {
	const segments = markdown.split(/(```[\s\S]*?```|`[^`\n]+`)/g);
	return segments
		.map((segment, index) => {
			if (index % 2 === 1) return segment;
			return segment.replace(
				PLACEHOLDER_PATTERN,
				(match) => `<mark class="todo">${match}</mark>`,
			);
		})
		.join("");
}

export async function markdownToHtml(
	markdown: string,
	title = "Contract",
): Promise<string> {
	const highlighted = highlightPlaceholders(markdown);
	const body = await marked.parse(highlighted, { async: true, gfm: true });
	const withBreaks = injectScheduleBreaks(body);
	return wrapHtml(withBreaks, title);
}

export async function markdownToPdf(
	markdown: string,
	options: MarkdownToPdfOptions = {},
): Promise<Buffer> {
	const title = options.title ?? "Contract";
	const format = options.format ?? "Letter";
	const margin = { ...DEFAULT_MARGIN, ...(options.margin ?? {}) };

	const html = await markdownToHtml(markdown, title);

	let browser: Awaited<ReturnType<typeof puppeteer.launch>> | undefined;
	try {
		browser = await puppeteer.launch({
			headless: true,
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		if (/Could not find Chrome|Chromium|browsers install/i.test(message)) {
			throw new Error(
				"puppeteer chromium is missing. Run `bunx puppeteer browsers install chrome` to install it.",
				{ cause: error as Error },
			);
		}
		throw error;
	}

	try {
		const page = await browser.newPage();
		await page.setContent(html, { waitUntil: "networkidle0" });
		await page.emulateMediaType("print");
		const pdf = await page.pdf({
			format,
			printBackground: true,
			displayHeaderFooter: false,
			margin,
			preferCSSPageSize: false,
		});
		return Buffer.from(pdf);
	} finally {
		await browser.close();
	}
}
