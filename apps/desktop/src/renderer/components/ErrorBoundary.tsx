import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@shipshitdev/ui";

type ErrorBoundaryProps = {
	children: ReactNode;
};

type ErrorBoundaryState = {
	hasError: boolean;
	error: Error | null;
};

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("[Shipdeal] renderer error", error, info.componentStack);
	}

	render() {
		if (!this.state.hasError) return this.props.children;

		return (
			<div className="flex h-screen w-screen items-center justify-center bg-primary p-8">
				<div className="max-w-xl rounded-lg border border-danger/30 bg-danger/5 p-6 text-center">
					<h1 className="text-lg font-semibold text-danger">
						Shipdeal renderer crashed
					</h1>
					<p className="mt-2 text-sm text-secondary">
						{this.state.error?.message ?? "Unknown render error"}
					</p>
					<Button
						type="button"
						onClick={() => window.location.reload()}
						variant="destructive"
						className="mt-5"
					>
						Reload
					</Button>
				</div>
			</div>
		);
	}
}
