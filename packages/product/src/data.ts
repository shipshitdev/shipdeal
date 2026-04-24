export type ContractStatus = "Draft" | "Review" | "Sent" | "Signed";

export type ContractRecord = {
	client: string;
	type: string;
	value: string;
	status: ContractStatus;
	due: string;
	owner: string;
};

export const contracts: ContractRecord[] = [
	{
		client: "Northstar Ventures",
		type: "AI automation retainer",
		value: "EUR 8,500/mo",
		status: "Sent",
		due: "Signature due today",
		owner: "Vincent",
	},
	{
		client: "LedgerField Ops",
		type: "Workflow audit SOW",
		value: "EUR 14,000 fixed",
		status: "Review",
		due: "Legal notes open",
		owner: "Client counsel",
	},
	{
		client: "Blue Harbor Studio",
		type: "Fractional AI CTO",
		value: "EUR 6,000/mo",
		status: "Draft",
		due: "Needs scope lock",
		owner: "Vincent",
	},
	{
		client: "Vesta Commerce",
		type: "NDA + discovery sprint",
		value: "EUR 3,200 fixed",
		status: "Signed",
		due: "Kickoff scheduled",
		owner: "Client",
	},
];

export const contractTypes = [
	"AI automation retainer",
	"Fixed-scope implementation SOW",
	"Fractional AI CTO agreement",
	"Discovery sprint agreement",
	"NDA + technical audit",
];

export const clauses = [
	"Confidentiality and client data handling",
	"AI output review and acceptance",
	"IP ownership after payment",
	"Third-party model and API pass-through costs",
	"Change request and scope creep control",
	"Payment milestones and late fee language",
];

export const activities = [
	{
		time: "09:42",
		title: "Northstar Ventures delivery email queued",
		detail: "Branded PDF, signature link, and 7-day expiry notice prepared.",
	},
	{
		time: "08:15",
		title: "LedgerField Ops redline imported",
		detail:
			"Liability cap and data retention comments mapped to clause library.",
	},
	{
		time: "Yesterday",
		title: "Blue Harbor Studio draft generated",
		detail: "Retainer boilerplate merged with AI workflow automation scope.",
	},
	{
		time: "Monday",
		title: "Vesta Commerce signed",
		detail: "Executed PDF archived and kickoff task created.",
	},
];
