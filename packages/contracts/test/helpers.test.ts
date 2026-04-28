import { describe, expect, test } from "bun:test";
import { slugify, formatLongDate, todayIso } from "../src/helpers";

describe("helpers", () => {
	test("slugify lowercases and dashes", () => {
		expect(slugify("Vitae AI Ltd.")).toBe("vitae-ai-ltd");
		expect(slugify("  Decod3RS Labs   Ltd.  ")).toBe("decod3rs-labs-ltd");
		expect(slugify("AI Architect — Consultancy")).toBe(
			"ai-architect-consultancy",
		);
	});

	test("formatLongDate handles ISO and pass-through", () => {
		expect(formatLongDate("2026-04-27")).toBe("27 April 2026");
		expect(formatLongDate("To be confirmed")).toBe("To be confirmed");
	});

	test("todayIso returns YYYY-MM-DD", () => {
		expect(todayIso()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});
});
