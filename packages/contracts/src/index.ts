import { resolveCounterparty, type CounterpartyProfile } from "./counterparty";
import { slugify, todayIso } from "./helpers";
import { resolveProvider, type ProviderProfile } from "./provider";
import {
	isTemplateId,
	templates,
	type TemplateId,
} from "./templates";

export type ContractDraftInput = {
	client: string;
	contractType: string;
	value: string;
	email: string;
	scope: string;
	jurisdiction: string;
	paymentTerms: string;
	startDate: string;
	template?: TemplateId;
	counterparty?: string;
	provider?: string;
	providerOverride?: ProviderProfile;
};

export type GeneratedContract = {
	title: string;
	fileName: string;
	markdown: string;
	summary: string[];
};

export const defaultContractDraftInput: ContractDraftInput = {
	client: "Northstar Ventures",
	contractType: "AI automation retainer",
	value: "EUR 8,500/mo",
	email: "client@example.com",
	scope:
		"Discovery, workflow mapping, AI automation buildout, prompt system handoff, and launch support.",
	jurisdiction: "Malta",
	paymentTerms: "Due on receipt unless agreed otherwise",
	startDate: "To be confirmed",
};

export function slugifyContractPart(value: string): string {
	return slugify(value);
}

export function normalizeContractDraftInput(
	input: Partial<ContractDraftInput>,
): ContractDraftInput {
	return {
		client: input.client?.trim() || defaultContractDraftInput.client,
		contractType:
			input.contractType?.trim() || defaultContractDraftInput.contractType,
		value: input.value?.trim() || defaultContractDraftInput.value,
		email: input.email?.trim() || defaultContractDraftInput.email,
		scope: input.scope?.trim() || defaultContractDraftInput.scope,
		jurisdiction:
			input.jurisdiction?.trim() || defaultContractDraftInput.jurisdiction,
		paymentTerms:
			input.paymentTerms?.trim() || defaultContractDraftInput.paymentTerms,
		startDate: input.startDate?.trim() || defaultContractDraftInput.startDate,
		template: isTemplateId(input.template) ? input.template : undefined,
		counterparty: input.counterparty?.trim() || undefined,
		provider: input.provider?.trim() || undefined,
		providerOverride: input.providerOverride,
	};
}

export { templateIds, isTemplateId, type TemplateId } from "./templates";
export {
	type ProviderProfile,
	resolveProvider,
	decod3rsProfile,
} from "./provider";
export {
	type CounterpartyProfile,
	resolveCounterparty,
	vitaeAiProfile,
} from "./counterparty";

export function generateContractDraft(
	input: Partial<ContractDraftInput>,
): GeneratedContract {
	const contract = normalizeContractDraftInput(input);
	const template = contract.template ?? "legacy";

	if (template === "legacy") {
		return renderLegacyTemplate(contract);
	}

	const provider: ProviderProfile =
		contract.providerOverride ?? resolveProvider(contract.provider);
	const counterparty: CounterpartyProfile = resolveCounterparty(
		contract.counterparty,
		contract.client,
	);

	const renderer = templates[template];
	const markdown = renderer({
		provider,
		counterparty,
		effectiveDate: contract.startDate,
		paymentTerms: contract.paymentTerms,
	});

	const titlePrefix =
		template === "msa"
			? "Master Services Agreement"
			: template === "ai-architect"
				? "AI Architect Consultancy Agreement"
				: "Equity Side Letter";
	const title = `${titlePrefix} — ${counterparty.legalName}`;
	const fileName = `${slugify(provider.shortName)}-${slugify(template)}-${slugify(counterparty.legalName)}.md`;

	const summary = [
		`${provider.legalName} → ${counterparty.legalName}`,
		titlePrefix,
		provider.jurisdiction,
		contract.startDate,
	];

	return { title, fileName, markdown, summary };
}

function renderLegacyTemplate(contract: ContractDraftInput): GeneratedContract {
	const generatedAt = todayIso();
	const title = `${contract.contractType} for ${contract.client}`;
	const fileName = `${slugify(contract.client)}-${slugify(contract.contractType)}.md`;

	const markdown = `# ${contract.contractType}

Prepared for: ${contract.client}
Prepared by: Shipdeal
Generated: ${generatedAt}
Jurisdiction: ${contract.jurisdiction}

## 1. Engagement Summary

Shipdeal will provide AI consulting, automation design, implementation support, and advisory services for ${contract.client}. The parties will confirm the final delivery plan in writing before work begins.

## 2. Scope of Work

${contract.scope}

## 3. Commercial Terms

- Contract value: ${contract.value}
- Payment terms: ${contract.paymentTerms}
- Start date: ${contract.startDate}
- Client contact: ${contract.email}

## 4. Core Deliverables

- Discovery of current workflows, systems, and business requirements
- AI automation or advisory plan with milestones and acceptance criteria
- Implementation, review, and handoff of agreed deliverables
- Documentation required for the client to operate the delivered system

## 5. AI Output Review

AI-generated outputs require human review before production use. Shipdeal will use commercially reasonable care when configuring prompts, tools, and automations, but final business approval remains with the client.

## 6. Intellectual Property

After full payment, the client owns custom deliverables created specifically for the engagement. Shipdeal retains ownership of pre-existing templates, prompts, libraries, processes, and reusable know-how.

## 7. Confidentiality

Each party will protect confidential information received from the other party and use it only for the engagement.

## 8. Change Requests

Work outside the agreed scope requires written approval. Shipdeal may quote additional fees or revise delivery timelines before accepting a change request.

## 9. Next Step

Review this draft, replace placeholders, attach jurisdiction-specific legal terms, and send the final agreement for signature.
`;

	return {
		title,
		fileName,
		markdown,
		summary: [
			`${contract.client} / ${contract.contractType}`,
			contract.value,
			contract.jurisdiction,
			contract.startDate,
		],
	};
}
