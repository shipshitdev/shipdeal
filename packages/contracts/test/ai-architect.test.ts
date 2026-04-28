import { describe, expect, test } from "bun:test";
import { generateContractDraft } from "../src/index";

describe("AI Architect template (Vitae preset)", () => {
	test("renders with Vitae counterparty and $1,500/mo retainer", () => {
		const result = generateContractDraft({
			template: "ai-architect",
			counterparty: "vitae-ai",
			startDate: "27 April 2026",
		});
		expect(result.fileName).toMatch(/^decod3rs-ai-architect-vitae/);
		expect(result.title).toContain("Vitae AI Ltd.");
		expect(result.markdown).toContain("Vitae AI Ltd.");
		expect(result.markdown).toContain("Decod3RS Labs Ltd.");
		expect(result.markdown).toContain("AI Architect");
		expect(result.markdown).toMatch(/USD\s*1[,.]?500/);
		expect(result.markdown).toMatch(/USD\s*500/);
	});

	test("includes unit-acceptance schedule and probation", () => {
		const result = generateContractDraft({
			template: "ai-architect",
			counterparty: "vitae-ai",
		});
		expect(result.markdown).toMatch(/five \(5\) business days/i);
		expect(result.markdown).toMatch(/probation/i);
		expect(result.markdown).toMatch(/Schedule B/);
	});
});
