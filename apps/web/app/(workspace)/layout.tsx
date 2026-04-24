export default function WorkspaceLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen">
			<nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
				<a
					className="text-sm font-semibold text-primary uppercase"
					href="/overview"
				>
					shipdeal
				</a>
				<div className="flex flex-wrap items-center justify-end gap-1">
					<a
						className="rounded-md px-3 py-2 text-sm text-secondary transition hover:bg-hover hover:text-primary"
						href="/overview"
					>
						Overview
					</a>
					<a
						className="rounded-md px-3 py-2 text-sm text-secondary transition hover:bg-hover hover:text-primary"
						href="/new-task"
					>
						New Contract
					</a>
					<a
						className="rounded-md px-3 py-2 text-sm text-secondary transition hover:bg-hover hover:text-primary"
						href="/search"
					>
						Library
					</a>
					<a
						className="rounded-md px-3 py-2 text-sm text-secondary transition hover:bg-hover hover:text-primary"
						href="/inbox"
					>
						Inbox
					</a>
					<a
						className="rounded-md px-3 py-2 text-sm text-secondary transition hover:bg-hover hover:text-primary"
						href="/activities"
					>
						Activity
					</a>
				</div>
			</nav>
			<div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
		</div>
	);
}
