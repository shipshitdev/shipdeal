import { OverviewPage } from "@shipdeal/product";

export function ProductMockup() {
	return (
		<div className="mx-auto w-full max-w-[1180px] overflow-hidden rounded-2xl border border-white/10 bg-primary shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
			<div className="flex items-center gap-2 border-white/8 border-b bg-white/[0.035] px-4 py-3">
				<span className="size-2.5 rounded-full bg-danger" />
				<span className="size-2.5 rounded-full bg-warning" />
				<span className="size-2.5 rounded-full bg-success" />
				<span className="ml-3 text-xs text-muted">
					shipdeal local workspace
				</span>
			</div>
			<div className="h-[620px] overflow-hidden bg-primary p-6">
				<div className="origin-top scale-[0.88] md:scale-95">
					<OverviewPage />
				</div>
			</div>
		</div>
	);
}
