import { describe, expect, test } from "bun:test";
import { generateContractDraft } from "../src/index";

describe("legacy template (default)", () => {
	test("renders defaults with original 9-section structure", () => {
		const result = generateContractDraft({});
		expect(result.fileName).toBe(
			"northstar-ventures-ai-automation-retainer.md",
		);
		expect(result.title).toBe("AI automation retainer for Northstar Ventures");
		expect(result.markdown).toContain("# AI automation retainer");
		expect(result.markdown).toContain("Prepared for: Northstar Ventures");
		expect(result.markdown).toContain("Prepared by: Shipdeal");
		expect(result.markdown).toContain("## 1. Engagement Summary");
		expect(result.markdown).toContain("## 2. Scope of Work");
		expect(result.markdown).toContain("## 3. Commercial Terms");
		expect(result.markdown).toContain("## 9. Next Step");
	});

	test("explicit template=legacy matches default behaviour", () => {
		const explicit = generateContractDraft({ template: "legacy" });
		const implicit = generateContractDraft({});
		expect(explicit.markdown).toBe(implicit.markdown);
		expect(explicit.fileName).toBe(implicit.fileName);
	});

	test("custom client overrides default fields", () => {
		const result = generateContractDraft({
			client: "Acme Corp",
			contractType: "Workflow audit",
		});
		expect(result.title).toBe("Workflow audit for Acme Corp");
		expect(result.fileName).toBe("acme-corp-workflow-audit.md");
		expect(result.markdown).toContain("Prepared for: Acme Corp");
	});
});
