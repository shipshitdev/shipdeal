import { InstallCommand } from "./InstallCommand";
import { ProductMockup } from "./ProductMockup";

export function Hero() {
	return (
		<section className="px-6 pt-[11vh] pb-16 text-center md:pt-[13vh]">
			<div className="mx-auto max-w-6xl">
				<div className="animate-fade-in-up">
					<div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-secondary uppercase">
						Shipdeal
						<span className="text-muted">CLI + local workspace</span>
					</div>
					<h1 className="mx-auto mt-8 max-w-5xl text-5xl font-semibold text-primary md:text-7xl">
						AI contracts without
						<br />
						the copy-paste grind.
					</h1>
					<p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-secondary md:text-xl">
						Generate branded AI consulting agreements from client facts,
						reusable boilerplate, pricing, and delivery terms. Run it locally
						with <code>npx shipdeal</code> or install the command with Homebrew.
					</p>
				</div>

				<div
					className="animate-fade-in-up mt-10 flex flex-col items-center gap-5"
					style={{ animationDelay: "120ms", animationFillMode: "both" }}
				>
					<div className="flex flex-wrap items-center justify-center gap-4">
						<a
							href="/overview"
							className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[0_0_24px_rgba(242,209,107,0.12)] transition-transform duration-200 hover:scale-[1.03]"
						>
							Open local app
							<span aria-hidden="true">{"->"}</span>
						</a>
						<a
							href="https://github.com/shipshitdev/shipdeal"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-muted underline decoration-white/25 underline-offset-4 transition-colors duration-200 hover:text-secondary"
						>
							View on GitHub
						</a>
					</div>
					<InstallCommand compact />
					<p className="text-sm text-muted">
						Homebrew for a persistent command. npx for one-off contract drafts.
					</p>
				</div>

				<div
					className="animate-screenshot-in mt-12"
					style={{ animationDelay: "200ms", animationFillMode: "both" }}
				>
					<ProductMockup />
				</div>
			</div>
		</section>
	);
}
