export function Footer() {
	return (
		<footer className="px-6 py-8">
			<div className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-white/8 border-t pt-6 text-sm text-muted">
				<a
					href="https://shipshit.dev"
					target="_blank"
					rel="noopener noreferrer"
					className="transition-colors hover:text-secondary"
				>
					© 2026 shipshit.dev
				</a>
				<div className="flex items-center gap-6">
					<a
						href="https://github.com/shipshitdev/shipdeal"
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors hover:text-secondary"
					>
						GitHub
					</a>
					<a
						href="/overview"
						className="transition-colors hover:text-secondary"
					>
						App
					</a>
				</div>
			</div>
		</footer>
	);
}
