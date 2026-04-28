import { describe, expect, test } from "bun:test";
import { generateContractDraft } from "../src/index";

describe("Equity side letter template", () => {
	test("renders one-pager with vesting + tax sections", () => {
		const result = generateContractDraft({
			template: "equity-side-letter",
			counterparty: "vitae-ai",
			startDate: "27 April 2026",
		});
		expect(result.fileName).toMatch(/^decod3rs-equity-side-letter-vitae/);
		expect(result.title).toContain("Equity Side Letter");
		expect(result.markdown).toContain("Vesting");
		expect(result.markdown).toContain("cliff");
		expect(result.markdown).toMatch(/Tax|tax/);
		expect(result.markdown).toMatch(/Set-off prohibited/);
		expect(result.markdown).toMatch(/Consultancy Agreement/);
	});
});

describe("MSA template", () => {
	test("renders with Decod3RS provider and Maltese law", () => {
		const result = generateContractDraft({ template: "msa" });
		expect(result.title).toMatch(/^Master Services Agreement —/);
		expect(result.fileName).toMatch(/^decod3rs-msa-.+\.md$/);
		expect(result.markdown).toContain("Decod3RS Labs Ltd.");
		expect(result.markdown).toContain("Malta");
		expect(result.markdown).toContain("Schedule A");
		expect(result.markdown).toContain("Schedule C");
	});

	test("includes the protective clauses required for Maltese consultancy", () => {
		const result = generateContractDraft({ template: "msa" });
		expect(result.markdown).toMatch(/statutory commercial late-payment/i);
		expect(result.markdown).toMatch(/Liability/i);
		expect(result.markdown).toMatch(/non-solicit|non-solicitation/i);
		expect(result.markdown).toMatch(/AI[- ]output|AI Output/i);
		expect(result.markdown).toMatch(/Data Protection|GDPR/i);
		expect(result.markdown).toMatch(/VAT/);
	});
});
