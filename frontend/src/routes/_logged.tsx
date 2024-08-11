import { userQueryOptions } from "@/lib/api";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { toast } from "sonner";

const LoggedGateComponent = () => {
	const { user } = Route.useRouteContext();

	if (!user) {
		return (
			<h3>
				You are not logged in. Please{" "}
				<a
					href="/api/v1/auth/login"
					title="Login"
					className="text-blue-700 underline-offset-4 hover:underline"
				>
					log in
				</a>{" "}
				to have access to this page.
			</h3>
		);
	}
	return (
		<div className="border p-2">
			<h3>This has to be an Outlet template for logged users</h3>
			<Outlet />
		</div>
	);
};

export const Route = createFileRoute("/_logged")({
	beforeLoad: async ({ context: { queryClient } }) => {
		try {
			const data = await queryClient.fetchQuery(userQueryOptions);
			return { user: data };
		} catch (e: unknown) {
			console.error(e);
			toast.error("An error occurred while fetching user data. Please log in.");
			return { user: null };
		}
	},
	component: LoggedGateComponent,
});
