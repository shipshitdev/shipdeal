"use client";

import { Button } from "@shipshitdev/ui";
import { useState } from "react";

const COMMANDS = {
	brew: "brew tap shipshitdev/tap\nbrew install shipdeal",
	npx: 'npx shipdeal new --client "Northstar Ventures" --type "AI automation retainer"',
} as const;

type InstallMode = keyof typeof COMMANDS;

const MODE_COPY: Record<InstallMode, { label: string; description: string }> = {
	brew: {
		label: "Homebrew",
		description: "Install the Shipdeal CLI as a local command.",
	},
	npx: {
		label: "npx",
		description: "Run the published CLI without a global install.",
	},
};

export function InstallCommand({ compact = false }: { compact?: boolean }) {
	const [copied, setCopied] = useState(false);
	const [mode, setMode] = useState<InstallMode>("npx");

	const handleCopy = async () => {
		await navigator.clipboard.writeText(COMMANDS[mode]);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className={`mx-auto w-full ${compact ? "max-w-xl" : "max-w-2xl"}`}>
			<div className="mb-3 flex items-center justify-between px-1">
				<div className="flex gap-5">
					{(["npx", "brew"] as InstallMode[]).map((item) => (
						<Button
							key={item}
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => setMode(item)}
							className={`h-auto px-0 py-0 text-xs font-medium hover:bg-transparent ${
								mode === item
									? "text-primary"
									: "text-muted hover:text-secondary"
							}`}
						>
							{MODE_COPY[item].label}
						</Button>
					))}
				</div>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={handleCopy}
					className="h-auto px-0 py-0 text-xs text-muted hover:bg-transparent hover:text-primary"
				>
					{copied ? "Copied" : "Copy"}
				</Button>
			</div>

			<p className="mb-3 px-1 text-sm text-muted">
				{MODE_COPY[mode].description}
			</p>

			<div className="rounded-lg border border-white/10 bg-white/[0.04] px-5 py-4 text-left font-mono shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
				{COMMANDS[mode].split("\n").map((line) => (
					<div key={line} className="flex gap-2 text-[13px] leading-6">
						<span className="select-none text-muted">$</span>
						<span className="text-secondary">{line}</span>
					</div>
				))}
			</div>
		</div>
	);
}
