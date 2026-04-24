import {
	Activity,
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CheckCircle2,
	Clock3,
	Download,
	FilePlus,
	Input,
	Label,
	Mail,
	Search,
	Send,
	StatCard,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Textarea,
	WandSparkles,
	Workflow,
} from "@shipshitdev/ui";
import type { ReactNode } from "react";
import {
	activities,
	type ContractStatus,
	clauses,
	contracts,
	contractTypes,
} from "./data";

const statusTone: Record<ContractStatus, string> = {
	Draft: "bg-tertiary text-secondary",
	Review: "bg-warning/15 text-warning",
	Sent: "bg-agent/15 text-agent",
	Signed: "bg-success/15 text-success",
};

function PageHeader({
	eyebrow,
	title,
	description,
	action,
}: {
	eyebrow: string;
	title: string;
	description: string;
	action?: ReactNode;
}) {
	return (
		<header className="flex flex-col gap-4 border-border border-b pb-6 md:flex-row md:items-end md:justify-between">
			<div className="max-w-3xl">
				<Badge>{eyebrow}</Badge>
				<h1 className="mt-3 max-w-4xl text-4xl font-semibold text-primary tracking-normal md:text-5xl">
					{title}
				</h1>
				<p className="mt-3 text-base leading-7 text-secondary">{description}</p>
			</div>
			{action ? <div className="flex shrink-0 gap-2">{action}</div> : null}
		</header>
	);
}

function StatusBadge({ status }: { status: ContractStatus }) {
	return (
		<span
			className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${statusTone[status]}`}
		>
			{status}
		</span>
	);
}

function ContractTable() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Client</TableHead>
					<TableHead>Contract</TableHead>
					<TableHead>Value</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Next step</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{contracts.map((contract) => (
					<TableRow key={contract.client}>
						<TableCell className="font-medium text-primary">
							{contract.client}
						</TableCell>
						<TableCell>{contract.type}</TableCell>
						<TableCell>{contract.value}</TableCell>
						<TableCell>
							<StatusBadge status={contract.status} />
						</TableCell>
						<TableCell>{contract.due}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

function ContractPreview() {
	return (
		<Card className="overflow-hidden">
			<CardHeader>
				<CardTitle>Branded PDF preview</CardTitle>
				<CardDescription>
					Generated contract pack for an AI consulting engagement.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="rounded-lg border border-border bg-primary p-5 shadow-2xl">
					<div className="flex items-start justify-between border-border border-b pb-4">
						<div>
							<div className="text-xs font-semibold tracking-[0.18em] text-success uppercase">
								shipdeal
							</div>
							<h3 className="mt-4 text-2xl font-semibold text-primary">
								AI Services Agreement
							</h3>
							<p className="mt-1 text-sm text-secondary">
								Prepared for Northstar Ventures
							</p>
						</div>
						<Badge variant="accent">PDF</Badge>
					</div>
					<div className="grid gap-3 py-5 sm:grid-cols-3">
						{["Scope", "Fees", "Acceptance"].map((item) => (
							<div
								className="rounded-md border border-border bg-secondary p-3"
								key={item}
							>
								<div className="text-xs text-muted">{item}</div>
								<div className="mt-2 h-2 rounded bg-hover" />
								<div className="mt-2 h-2 w-2/3 rounded bg-hover" />
							</div>
						))}
					</div>
					<div className="space-y-2">
						<div className="h-2 rounded bg-hover" />
						<div className="h-2 rounded bg-hover" />
						<div className="h-2 w-4/5 rounded bg-hover" />
					</div>
					<div className="mt-6 grid gap-3 sm:grid-cols-2">
						<div className="rounded-md border border-border p-4">
							<div className="text-xs text-muted">Consultant signature</div>
							<div className="mt-7 border-border border-t pt-2 text-sm text-secondary">
								Vincent
							</div>
						</div>
						<div className="rounded-md border border-border p-4">
							<div className="text-xs text-muted">Client signature</div>
							<div className="mt-7 border-border border-t pt-2 text-sm text-secondary">
								Pending
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export function OverviewPage() {
	return (
		<main className="space-y-8">
			<PageHeader
				eyebrow="contract command center"
				title="Generate, send, and track AI agency contracts from one workspace."
				description="Shipdeal turns client details, contract type, pricing, boilerplate, and brand settings into a ready-to-send PDF workflow."
				action={
					<>
						<Button asChild>
							<a href="/new-task">
								<FilePlus className="mr-2 size-4" />
								New contract
							</a>
						</Button>
						<Button asChild variant="secondary">
							<a href="/inbox">
								<Send className="mr-2 size-4" />
								Send queue
							</a>
						</Button>
					</>
				}
			/>

			<section className="grid gap-4 md:grid-cols-4">
				<StatCard
					label="Active contracts"
					value="12"
					subtitle="4 need action"
					icon={<Workflow />}
					tone="agent"
				/>
				<StatCard
					label="Awaiting signature"
					value="3"
					subtitle="EUR 28.5k pipeline"
					icon={<Clock3 />}
					tone="warn"
				/>
				<StatCard
					label="Signed this month"
					value="7"
					subtitle="EUR 46.2k booked"
					icon={<CheckCircle2 />}
					tone="success"
				/>
				<StatCard
					label="Template coverage"
					value="92%"
					subtitle="6 guarded clauses"
					icon={<WandSparkles />}
					tone="default"
				/>
			</section>

			<section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
				<Card>
					<CardHeader>
						<CardTitle>Contract pipeline</CardTitle>
						<CardDescription>
							Live state for drafts, legal review, delivery, and signatures.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ContractTable />
					</CardContent>
				</Card>
				<ContractPreview />
			</section>
		</main>
	);
}

export function NewTaskPage() {
	return (
		<main className="space-y-8">
			<PageHeader
				eyebrow="contract generator"
				title="Create the contract pack from client facts and reusable boilerplate."
				description="Capture the deal inputs once, then generate the branded PDF, delivery email, and signature-ready agreement."
			/>

			<section className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
				<Card>
					<CardHeader>
						<CardTitle>Client and deal details</CardTitle>
						<CardDescription>
							Primary fields for the first generated draft.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-5">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="client">Client name</Label>
								<Input id="client" placeholder="Acme AI Labs Ltd." />
							</div>
							<div className="space-y-2">
								<Label htmlFor="contract-type">Contract type</Label>
								<Input
									id="contract-type"
									placeholder="AI automation retainer"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="fee">Fee structure</Label>
								<Input id="fee" placeholder="EUR 8,500 monthly retainer" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="jurisdiction">Jurisdiction</Label>
								<Input id="jurisdiction" placeholder="Malta / EU" />
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="scope">Scope summary</Label>
							<Textarea
								id="scope"
								placeholder="Build AI lead qualification, automate proposal follow-up, and provide weekly implementation advisory."
								rows={5}
							/>
						</div>
						<div className="flex flex-wrap gap-2">
							<Button>
								<WandSparkles className="mr-2 size-4" />
								Generate branded PDF
							</Button>
							<Button variant="secondary">
								<Download className="mr-2 size-4" />
								Export draft
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Boilerplate stack</CardTitle>
						<CardDescription>
							Clauses selected for AI consulting and freelance delivery.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{clauses.map((clause) => (
							<div
								className="flex items-start gap-3 rounded-md border border-border bg-secondary p-3"
								key={clause}
							>
								<CheckCircle2 className="mt-0.5 size-4 text-success" />
								<div>
									<div className="text-sm font-medium text-primary">
										{clause}
									</div>
									<p className="mt-1 text-xs leading-5 text-secondary">
										Included in the generated agreement and marked for review
										before sending.
									</p>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			</section>
		</main>
	);
}

export function SearchPage() {
	return (
		<main className="space-y-8">
			<PageHeader
				eyebrow="contract library"
				title="Find clients, generated PDFs, templates, and reusable clauses."
				description="Search across signed agreements, draft packs, delivery emails, and the clause library behind each generated contract."
			/>

			<Card>
				<CardContent className="pt-6">
					<div className="flex flex-col gap-3 md:flex-row">
						<div className="relative flex-1">
							<Search className="absolute top-3 left-3 size-4 text-muted" />
							<Input
								className="pl-9"
								placeholder="Search by client, contract type, clause, status, or owner"
							/>
						</div>
						<Button variant="secondary">Search library</Button>
					</div>
				</CardContent>
			</Card>

			<section className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
				<Card>
					<CardHeader>
						<CardTitle>Recent contracts</CardTitle>
						<CardDescription>
							Indexed records available for PDF regeneration or resend.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ContractTable />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Template catalog</CardTitle>
						<CardDescription>
							Starting points for new client engagements.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{contractTypes.map((type) => (
							<div
								className="rounded-md border border-border bg-secondary p-3"
								key={type}
							>
								<div className="font-medium text-sm text-primary">{type}</div>
								<div className="mt-1 text-xs text-secondary">
									Brand-ready PDF, boilerplate, and delivery email.
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			</section>
		</main>
	);
}

export function InboxPage() {
	return (
		<main className="space-y-8">
			<PageHeader
				eyebrow="delivery inbox"
				title="Manage client requests, outgoing sends, and signature follow-ups."
				description="Keep contract delivery tied to the generated PDF, the exact email copy, and the latest client response."
			/>

			<section className="grid gap-6 lg:grid-cols-[0.85fr_1fr]">
				<Card>
					<CardHeader>
						<CardTitle>Send queue</CardTitle>
						<CardDescription>
							Agreements ready for client delivery.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{contracts
							.filter((contract) => contract.status !== "Signed")
							.map((contract) => (
								<div
									className="flex items-center justify-between gap-3 rounded-md border border-border bg-secondary p-3"
									key={contract.client}
								>
									<div>
										<div className="font-medium text-sm text-primary">
											{contract.client}
										</div>
										<div className="mt-1 text-xs text-secondary">
											{contract.type}
										</div>
									</div>
									<StatusBadge status={contract.status} />
								</div>
							))}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Delivery email</CardTitle>
						<CardDescription>
							Generated from the selected client and contract pack.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="to">To</Label>
								<Input id="to" value="founder@northstar.example" readOnly />
							</div>
							<div className="space-y-2">
								<Label htmlFor="subject">Subject</Label>
								<Input
									id="subject"
									value="Northstar Ventures AI services agreement"
									readOnly
								/>
							</div>
						</div>
						<Textarea
							rows={8}
							value={
								"Hi Sarah,\n\nAttached is the branded AI services agreement with the scope, monthly retainer, confidentiality language, and signature block included.\n\nOnce signed, I will countersign and send the kickoff checklist.\n\nVincent"
							}
							readOnly
						/>
						<div className="flex flex-wrap gap-2">
							<Button>
								<Mail className="mr-2 size-4" />
								Send to client
							</Button>
							<Button variant="secondary">
								<Download className="mr-2 size-4" />
								Download PDF
							</Button>
						</div>
					</CardContent>
				</Card>
			</section>
		</main>
	);
}

export function ActivitiesPage() {
	return (
		<main className="space-y-8">
			<PageHeader
				eyebrow="audit trail"
				title="Track every generation, clause edit, send, signature, and resend."
				description="A timeline for the operational history behind each contract, useful when clients ask what changed and when."
			/>

			<section className="grid gap-6 lg:grid-cols-[0.75fr_1fr]">
				<Card>
					<CardHeader>
						<CardTitle>Automation health</CardTitle>
						<CardDescription>
							Current state of generation and delivery actions.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="flex items-center justify-between rounded-md border border-border bg-secondary p-3">
							<span className="text-sm text-secondary">PDF render queue</span>
							<Badge variant="success">clear</Badge>
						</div>
						<div className="flex items-center justify-between rounded-md border border-border bg-secondary p-3">
							<span className="text-sm text-secondary">Email provider</span>
							<Badge variant="success">connected</Badge>
						</div>
						<div className="flex items-center justify-between rounded-md border border-border bg-secondary p-3">
							<span className="text-sm text-secondary">
								Signature follow-ups
							</span>
							<Badge variant="warning">3 scheduled</Badge>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Recent activity</CardTitle>
						<CardDescription>
							Operational events from contract generation to delivery.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{activities.map((item) => (
							<div
								className="grid grid-cols-[5rem_1fr] gap-4"
								key={`${item.time}-${item.title}`}
							>
								<div className="text-xs font-medium text-muted">
									{item.time}
								</div>
								<div className="border-border border-l pl-4">
									<div className="flex items-center gap-2">
										<Activity className="size-4 text-success" />
										<h3 className="font-medium text-sm text-primary">
											{item.title}
										</h3>
									</div>
									<p className="mt-1 text-sm leading-6 text-secondary">
										{item.detail}
									</p>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			</section>
		</main>
	);
}

export const desktopTabs = [
	{ id: "overview", label: "Overview", content: <OverviewPage /> },
	{ id: "new-task", label: "New Contract", content: <NewTaskPage /> },
	{ id: "search", label: "Library", content: <SearchPage /> },
	{ id: "inbox", label: "Inbox", content: <InboxPage /> },
	{ id: "activities", label: "Activity", content: <ActivitiesPage /> },
] as const;

export function DesktopSurface() {
	return (
		<Tabs defaultValue="overview" className="space-y-6">
			<TabsList className="flex h-auto flex-wrap justify-start">
				{desktopTabs.map((route) => (
					<TabsTrigger key={route.id} value={route.id}>
						{route.label}
					</TabsTrigger>
				))}
			</TabsList>
			{desktopTabs.map((route) => (
				<TabsContent key={route.id} value={route.id}>
					{route.content}
				</TabsContent>
			))}
		</Tabs>
	);
}
