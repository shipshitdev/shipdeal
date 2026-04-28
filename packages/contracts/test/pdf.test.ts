import { describe, expect, test } from "bun:test";
import { markdownToHtml, markdownToPdf } from "../src/pdf";

describe("pdf", () => {
	test("markdownToHtml wraps body in print-styled document", async () => {
		const html = await markdownToHtml(
			"# Hello\n\nThis is a paragraph.",
			"Hello",
		);
		expect(html).toContain("<!doctype html>");
		expect(html).toContain("<title>Hello</title>");
		expect(html).toContain("<h1>Hello</h1>");
		expect(html).toContain("<p>This is a paragraph.</p>");
	});

	test("schedule headings get page-break-before", async () => {
		const html = await markdownToHtml(
			"## Schedule A — Services\n\nbody\n",
			"x",
		);
		expect(html).toMatch(/page-break-before:\s*always/);
	});

	test("markdownToPdf returns a PDF buffer (skipped if chromium missing)", async () => {
		try {
			const pdf = await markdownToPdf("# Smoke\n\nHello.");
			expect(pdf.byteLength).toBeGreaterThan(500);
			const head = pdf.subarray(0, 4).toString("ascii");
			expect(head).toBe("%PDF");
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			if (
				/puppeteer is not installed|chromium is missing|Could not find Chrome/i.test(
					message,
				)
			) {
				console.warn(`Skipping PDF smoke: ${message}`);
				return;
			}
			throw error;
		}
	}, 60_000);
});
