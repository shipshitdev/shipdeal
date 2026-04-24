"use client";

import { useEffect, useState } from "react";

function ShipdealMark() {
	return (
		<span className="grid size-8 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
			<span className="h-3 w-4 rounded-[2px] border border-accent/80 border-t-2" />
		</span>
	);
}

export function Header() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={`sticky top-0 z-50 transition-all duration-300 ${
				scrolled ? "bg-primary/78 backdrop-blur-xl" : "bg-transparent"
			}`}
		>
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
				<a
					href="/"
					className="flex items-center gap-3 text-sm font-semibold text-primary uppercase"
				>
					<ShipdealMark />
					Shipdeal
				</a>
				<div className="flex items-center gap-6 text-sm">
					<a
						href="/overview"
						className="text-secondary transition-colors hover:text-primary"
					>
						App
					</a>
					<a
						href="https://github.com/shipshitdev/shipdeal"
						target="_blank"
						rel="noopener noreferrer"
						className="text-secondary transition-colors hover:text-primary"
					>
						GitHub
					</a>
				</div>
			</nav>
		</header>
	);
}
