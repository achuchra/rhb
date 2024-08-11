import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_logged/profile")({
	component: Profile,
});

function Profile() {
	const { user } = Route.useRouteContext();

	return (
		<>
			<h1>Profile</h1>
			<div>
				<p>Name: {user?.given_name}</p>
				<p>Email: {user?.email}</p>
				<img src={user?.picture || "hello"} alt="img" className="border"></img>
			</div>
			<Button asChild>
				<a href="/api/v1/auth/logout">Logout</a>
			</Button>
		</>
	);
}
