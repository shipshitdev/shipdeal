import {
	defaultContractDraftInput,
	generateContractDraft,
	type ContractDraftInput,
	type GeneratedContract,
} from "@shipdeal/contracts";
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CheckCircle2,
	Clock3,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Copy,
	Download,
	FilePlus,
	Inbox,
	Input,
	Label,
	LayoutGrid,
	Lock,
	Mail,
	Modal,
	Plus,
	Search,
	Send,
	Settings,
	Sparkles,
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
} from "@shipshitdev/ui";
import type { ComponentType } from "react";
import { useMemo, useState } from "react";

type ViewMode = "overview" | "generator" | "inbox" | "settings";

type CustomerDraftStatus = "Draft ready" | "Needs review" | "Boilerplate locked";

const customerDraftStatusVariant: Record<
	CustomerDraftStatus,
	"success" | "warning" | "accent"
> = {
	"Draft ready": "success",
	"Needs review": "warning",
	"Boilerplate locked": "accent",
};

const customers: Array<{
	client: string;
	type: string;
	status: CustomerDraftStatus;
	value: string;
}> = [
	{
		client: "Northstar Ventures",
		type: "AI automation retainer",
		status: "Draft ready",
		value: "EUR 8,500/mo",
	},
	{
		client: "LedgerField Ops",
		type: "Workflow audit SOW",
		status: "Needs review",
		value: "EUR 14,000 fixed",
	},
	{
		client: "Blue Harbor Studio",
		type: "Fractional AI CTO",
		status: "Boilerplate locked",
		value: "EUR 6,000/mo",
	},
];

const navItems: Array<{
	id: ViewMode | "search" | "new-customer";
	label: string;
	icon: ComponentType<{ size?: number; className?: string }>;
}> = [
	{ id: "new-customer", label: "New Customer", icon: Plus },
	{ id: "search", label: "Search", icon: Search },
	{ id: "overview", label: "Overview", icon: LayoutGrid },
	{ id: "inbox", label: "Inbox", icon: Inbox },
	{ id: "settings", label: "Settings", icon: Settings },
];

function ShipdealMark({ size = 32 }: { size?: number }) {
	return (
		<svg
			viewBox="0 0 1024 1024"
			aria-hidden="true"
			width={size}
			height={size}
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="1024" height="1024" rx="224" ry="224" fill="#0d1117" />
			<rect
				width="1024"
				height="1024"
				rx="224"
				ry="224"
				fill="none"
				stroke="#30363d"
				strokeWidth="4"
			/>
			{/* Handshake / deal motif — two angled bars meeting */}
			<rect x="200" y="360" width="160" height="440" rx="48" ry="48" fill="#f59e0b" />
			<rect x="432" y="240" width="160" height="560" rx="48" ry="48" fill="#10b981" />
			<rect x="664" y="320" width="160" height="480" rx="48" ry="48" fill="#6366f1" />
		</svg>
	);
}

function Titlebar() {
	return (
		<header className="app-region-drag flex h-titlebar shrink-0 items-center justify-between border-border border-b bg-primary/95 px-4">
			<div className="ml-[72px] flex items-center gap-2">
				<ShipdealMark />
				<div>
					<div className="text-[12px] font-semibold text-primary">Shipdeal</div>
					<div className="text-[10px] text-muted">AI contract maker</div>
				</div>
			</div>
			<div className="app-region-no-drag text-[11px] text-muted">
				Local draft workspace
			</div>
		</header>
	);
}

function NewCustomerModal({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [contractType, setContractType] = useState("");

	const handleCreate = () => {
		onClose();
		setName("");
		setEmail("");
		setContractType("");
	};

	return (
		<Modal open={isOpen} onClose={onClose} title="New customer">
			<div className="space-y-4 p-4">
				<div className="space-y-2">
					<Label htmlFor="new-customer-name">Name</Label>
					<Input
						id="new-customer-name"
						placeholder="Acme Corp"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="new-customer-email">Email</Label>
					<Input
						id="new-customer-email"
						placeholder="contact@acme.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="new-customer-type">Contract type</Label>
					<Input
						id="new-customer-type"
						placeholder="AI automation retainer"
						value={contractType}
						onChange={(e) => setContractType(e.target.value)}
					/>
				</div>
			</div>
			<div className="flex justify-end gap-2 border-border border-t p-4">
				<Button variant="ghost" onClick={onClose}>
					Cancel
				</Button>
				<Button onClick={handleCreate} disabled={!name.trim()}>
					<Plus size={14} />
					Create customer
				</Button>
			</div>
		</Modal>
	);
}

function SearchPalette({
	isOpen,
	onClose,
	onSelect,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSelect: (view: ViewMode) => void;
}) {
	return (
		<CommandDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<CommandInput placeholder="Search customers, contracts, settings…" />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Customers">
					{customers.map((item) => (
						<CommandItem
							key={item.client}
							onSelect={() => {
								onSelect("generator");
								onClose();
							}}
						>
							{item.client}
							<Badge
								variant={customerDraftStatusVariant[item.status]}
								className="ml-auto"
							>
								{item.status}
							</Badge>
						</CommandItem>
					))}
				</CommandGroup>
				<CommandGroup heading="Navigation">
					{navItems
						.filter((n) => n.id !== "search" && n.id !== "new-customer")
						.map((item) => {
							const Icon = item.icon;
							return (
								<CommandItem
									key={item.id}
									onSelect={() => {
										onSelect(item.id as ViewMode);
										onClose();
									}}
								>
									<Icon size={14} className="mr-2" />
									{item.label}
								</CommandItem>
							);
						})}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}

function Sidebar({
	viewMode,
	onChangeView,
	onOpenNewCustomer,
	onOpenSearch,
}: {
	viewMode: ViewMode;
	onChangeView: (view: ViewMode) => void;
	onOpenNewCustomer: () => void;
	onOpenSearch: () => void;
}) {
	return (
		<aside className="flex w-[248px] shrink-0 flex-col border-border border-r bg-primary">
			<div className="space-y-0.5 px-2 pt-3">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isAction = item.id === "new-customer" || item.id === "search";
					const active = !isAction && viewMode === item.id;
					return (
						<Button
							key={item.id}
							type="button"
							variant={active ? "secondary" : "ghost"}
							className="h-auto w-full justify-start gap-2 px-3 py-2 text-[13px] font-normal text-secondary"
							onClick={() => {
								if (item.id === "new-customer") {
									onOpenNewCustomer();
								} else if (item.id === "search") {
									onOpenSearch();
								} else {
									onChangeView(item.id);
								}
							}}
						>
							<Icon size={14} className="shrink-0" />
							<span className="truncate">{item.label}</span>
						</Button>
					);
				})}
			</div>

			<div className="mt-3 flex-1 overflow-y-auto px-2">
				<div className="mb-1 px-3 text-[10px] font-semibold text-muted uppercase tracking-wider">
					Customers
				</div>
				<div className="space-y-0.5">
					{customers.map((item) => (
						<Button
							type="button"
							key={item.client}
							variant="ghost"
							className="h-auto w-full justify-start gap-2 px-3 py-2 text-left font-normal"
							onClick={() => onChangeView("generator")}
						>
							<span className="min-w-0 truncate text-[13px] text-primary">
								{item.client}
							</span>
							<Badge
								variant={customerDraftStatusVariant[item.status]}
								className="ml-auto shrink-0"
							>
								{item.status}
							</Badge>
						</Button>
					))}
				</div>
			</div>
		</aside>
	);
}

function OverviewDashboard({ onNewContract }: { onNewContract: () => void }) {
	return (
		<div className="flex flex-1 flex-col overflow-hidden">
			<div className="flex items-center justify-between border-border border-b px-6 py-4">
				<div>
					<h1 className="text-base font-semibold text-primary">Overview</h1>
					<p className="text-xs text-muted">
						Local command center for drafts, clauses, exports, and send queue.
					</p>
				</div>
				<Button onClick={onNewContract}>
					<FilePlus size={14} />
					New contract
				</Button>
			</div>
			<div className="flex-1 overflow-y-auto px-6 py-6">
				<div className="max-w-6xl space-y-6">
					<div className="grid gap-4 md:grid-cols-4">
						<StatCard
							label="Customers"
							value="12"
							subtitle="4 draft-ready"
							icon={<FilePlus />}
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
							label="Clause coverage"
							value="92%"
							subtitle="6 guarded clauses"
							icon={<WandSparkles />}
							tone="default"
						/>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Customer pipeline</CardTitle>
							<CardDescription>
								Customer contracts move from draft readiness to review, delivery,
								and signature.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Client</TableHead>
										<TableHead>Contract</TableHead>
										<TableHead>Value</TableHead>
										<TableHead>Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{customers.map((item) => (
										<TableRow key={item.client}>
											<TableCell className="font-medium text-primary">
												{item.client}
											</TableCell>
											<TableCell>{item.type}</TableCell>
											<TableCell>{item.value}</TableCell>
											<TableCell>
												<Badge variant={customerDraftStatusVariant[item.status]}>
													{item.status}
												</Badge>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

function ContractPreview({
	contract,
	onCopy,
	onSave,
	savePath,
	copied,
}: {
	contract: GeneratedContract;
	onCopy: () => void;
	onSave: () => void;
	savePath: string | null;
	copied: boolean;
}) {
	return (
		<aside className="flex w-[470px] shrink-0 flex-col border-border border-l bg-secondary">
			<div className="flex items-center justify-between border-border border-b px-5 py-4">
				<div>
					<h2 className="text-sm font-semibold text-primary">Live preview</h2>
					<p className="text-xs text-muted">{contract.fileName}</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="secondary" size="sm" onClick={onCopy}>
						<Copy size={13} />
						{copied ? "Copied" : "Copy"}
					</Button>
					<Button size="sm" onClick={onSave}>
						<Download size={13} />
						Save
					</Button>
				</div>
			</div>
			{savePath ? (
				<div className="border-success/25 border-b bg-success/5 px-5 py-2 text-[11px] text-success">
					Saved to {savePath}
				</div>
			) : null}
			<div className="flex-1 overflow-y-auto p-5">
				<div className="rounded-lg border border-border bg-primary p-5 shadow-2xl">
					<div className="border-border border-b pb-4">
						<div className="text-[10px] font-semibold text-success uppercase">
							shipdeal
						</div>
						<h3 className="mt-3 text-2xl font-semibold text-primary">
							{contract.title}
						</h3>
						<div className="mt-3 flex flex-wrap gap-2">
							{contract.summary.map((item) => (
								<span
									key={item}
									className="inline-flex rounded-md border border-border bg-secondary px-2 py-1 text-[11px] text-secondary"
								>
									{item}
								</span>
							))}
						</div>
					</div>
					<pre className="mt-5 whitespace-pre-wrap font-mono text-[11px] leading-5 text-secondary">
						{contract.markdown}
					</pre>
				</div>
			</div>
		</aside>
	);
}

function GeneratorView() {
	const [input, setInput] = useState<ContractDraftInput>(defaultContractDraftInput);
	const [generated, setGenerated] = useState<GeneratedContract>(() =>
		generateContractDraft(defaultContractDraftInput),
	);
	const [savePath, setSavePath] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	const preview = useMemo(() => generateContractDraft(input), [input]);

	const update = (field: keyof ContractDraftInput, value: string) => {
		setInput((current) => ({ ...current, [field]: value }));
		setSavePath(null);
	};

	const generate = async () => {
		const next = window.shipdeal?.invoke
			? await window.shipdeal.invoke("contract:generate", input)
			: generateContractDraft(input);
		setGenerated(next);
		setSavePath(null);
	};

	const save = async () => {
		const contract = generated.markdown === preview.markdown ? generated : preview;
		if (!window.shipdeal?.invoke) return;
		const result = await window.shipdeal.invoke("contract:save-draft", { contract });
		if (result?.path) setSavePath(result.path);
	};

	const copy = async () => {
		await navigator.clipboard.writeText(preview.markdown);
		setCopied(true);
		setTimeout(() => setCopied(false), 1200);
	};

	return (
		<div className="flex flex-1 overflow-hidden">
			<div className="flex min-w-0 flex-1 flex-col overflow-hidden">
				<div className="flex items-center justify-between border-border border-b px-6 py-4">
					<div>
						<h1 className="text-base font-semibold text-primary">
							Contract generator
						</h1>
						<p className="text-xs text-muted">
							Enter client facts once. Shipdeal produces the first agreement
							draft.
						</p>
					</div>
					<Button onClick={generate}>
						<Sparkles size={14} />
						Generate contract
					</Button>
				</div>
				<div className="flex-1 overflow-y-auto px-6 py-6">
					<div className="max-w-4xl space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Deal facts</CardTitle>
								<CardDescription>
									These fields feed the contract body, metadata, and export file
									name.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="client">Client</Label>
										<Input
											id="client"
											value={input.client}
											onChange={(event) => update("client", event.target.value)}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="contractType">Contract type</Label>
										<Input
											id="contractType"
											value={input.contractType}
											onChange={(event) =>
												update("contractType", event.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="value">Value</Label>
										<Input
											id="value"
											value={input.value}
											onChange={(event) => update("value", event.target.value)}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="email">Client email</Label>
										<Input
											id="email"
											value={input.email}
											onChange={(event) => update("email", event.target.value)}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="jurisdiction">Jurisdiction</Label>
										<Input
											id="jurisdiction"
											value={input.jurisdiction}
											onChange={(event) =>
												update("jurisdiction", event.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="startDate">Start date</Label>
										<Input
											id="startDate"
											value={input.startDate}
											onChange={(event) =>
												update("startDate", event.target.value)
											}
										/>
									</div>
								</div>
								<div className="mt-4 space-y-2">
									<Label htmlFor="paymentTerms">Payment terms</Label>
									<Input
										id="paymentTerms"
										value={input.paymentTerms}
										onChange={(event) =>
											update("paymentTerms", event.target.value)
										}
									/>
								</div>
								<div className="mt-4 space-y-2">
									<Label htmlFor="scope">Scope of work</Label>
									<Textarea
										id="scope"
										value={input.scope}
										onChange={(event) => update("scope", event.target.value)}
										rows={6}
									/>
								</div>
							</CardContent>
						</Card>

						<Tabs defaultValue="clauses">
							<TabsList>
								<TabsTrigger value="clauses">Guarded clauses</TabsTrigger>
								<TabsTrigger value="delivery">Delivery pack</TabsTrigger>
							</TabsList>
							<TabsContent value="clauses">
								<div className="grid gap-3 md:grid-cols-3">
									{[
										"AI output review",
										"IP after payment",
										"Scope changes",
										"Confidentiality",
										"Payment terms",
										"Human approval",
									].map((clause) => (
										<div
											key={clause}
											className="rounded-md border border-border bg-secondary p-3 text-sm text-primary"
										>
											<Lock size={13} className="mb-3 text-agent" />
											{clause}
										</div>
									))}
								</div>
							</TabsContent>
							<TabsContent value="delivery">
								<div className="grid gap-3 md:grid-cols-3">
									{[
										{ label: "Markdown draft", icon: FilePlus },
										{ label: "PDF export next", icon: Download },
										{ label: "Signature email next", icon: Mail },
									].map((item) => {
										const Icon = item.icon;
										return (
											<div
												key={item.label}
												className="rounded-md border border-border bg-secondary p-3 text-sm text-primary"
											>
												<Icon size={13} className="mb-3 text-agent" />
												{item.label}
											</div>
										);
									})}
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
			<ContractPreview
				contract={preview}
				onCopy={copy}
				onSave={save}
				savePath={savePath}
				copied={copied}
			/>
		</div>
	);
}

function PlaceholderView({ title }: { title: string }) {
	return (
		<div className="flex flex-1 items-center justify-center p-8">
			<Card className="max-w-xl">
				<CardHeader>
					<CardTitle>{title}</CardTitle>
					<CardDescription>
						The Electron shell is in place. Contract generation is live in New
						Contract; this view is ready for the next workflow slice.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center gap-3 rounded-md border border-border bg-primary p-4 text-sm text-secondary">
						<Send size={16} className="text-agent" />
						Queue, PDF export, signature sending, and clause management can build
						on the same local IPC layer.
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export function App() {
	const [viewMode, setViewMode] = useState<ViewMode>("generator");
	const [isNewCustomerOpen, setIsNewCustomerOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	return (
		<div className="flex h-screen flex-col overflow-hidden bg-primary text-primary">
			<Titlebar />
			<div className="flex min-h-0 flex-1 overflow-hidden">
				<Sidebar
					viewMode={viewMode}
					onChangeView={setViewMode}
					onOpenNewCustomer={() => setIsNewCustomerOpen(true)}
					onOpenSearch={() => setIsSearchOpen(true)}
				/>
				{viewMode === "overview" ? (
					<OverviewDashboard onNewContract={() => setViewMode("generator")} />
				) : viewMode === "generator" ? (
					<GeneratorView />
				) : viewMode === "inbox" ? (
					<PlaceholderView title="Inbox" />
				) : (
					<PlaceholderView title="Settings" />
				)}
			</div>
			<NewCustomerModal
				isOpen={isNewCustomerOpen}
				onClose={() => setIsNewCustomerOpen(false)}
			/>
			<SearchPalette
				isOpen={isSearchOpen}
				onClose={() => setIsSearchOpen(false)}
				onSelect={setViewMode}
			/>
		</div>
	);
}
