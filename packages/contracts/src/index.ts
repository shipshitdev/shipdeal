export type ContractDraftInput = {
	client: string;
	contractType: string;
	value: string;
	email: string;
	scope: string;
	jurisdiction: string;
	paymentTerms: string;
	startDate: string;
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

export function slugifyContractPart(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 80);
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
	};
}

export function generateContractDraft(
	input: Partial<ContractDraftInput>,
): GeneratedContract {
	const contract = normalizeContractDraftInput(input);
	const generatedAt = new Date().toISOString().slice(0, 10);
	const title = `${contract.contractType} for ${contract.client}`;
	const fileName = `${slugifyContractPart(contract.client)}-${slugifyContractPart(
		contract.contractType,
	)}.md`;

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
