import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "@/components/ui/sonner";

import { type QueryClient } from "@tanstack/react-query";

interface RootRouteContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
	component: Root,
});

function Navbar() {
	return (
		<div className="flex justify-center gap-2 bg-primary-foreground p-2">
			<Link
				to="/"
				className="hover:text-primary/50 [&.active]:underline [&.active]:underline-offset-4 [&.active]:hover:text-primary"
			>
				Home
			</Link>
			<Link
				to="/expenses"
				className="hover:text-primary/50 [&.active]:underline [&.active]:underline-offset-4 [&.active]:hover:text-primary"
			>
				Expenses
			</Link>
			<Link
				to="/create-expense"
				className="hover:text-primary/50 [&.active]:underline [&.active]:underline-offset-4 [&.active]:hover:text-primary"
			>
				Create
			</Link>
			<Link
				to="/about"
				className="hover:text-primary/50 [&.active]:underline [&.active]:underline-offset-4 [&.active]:hover:text-primary"
			>
				About
			</Link>
			<Link
				to="/profile"
				className="hover:text-primary/50 [&.active]:underline [&.active]:underline-offset-4 [&.active]:hover:text-primary"
			>
				Profile
			</Link>
		</div>
	);
}

function Root() {
	return (
		<>
			<Navbar></Navbar>
			<Outlet />
			<Toaster />
			<TanStackRouterDevtools />
		</>
	);
}
