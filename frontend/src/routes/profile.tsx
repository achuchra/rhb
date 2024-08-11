import { Button } from "@/components/ui/button";
import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
	component: Profile,
});

function Profile() {
	const { refetch, isFetching, data } = useQuery(userQueryOptions);

	return (
		<>
			<div>
				<h1>Profile</h1>
				<div>
					<p>Name: {data?.given_name}</p>
					<p>Email: {data?.email}</p>
					<img src={data?.picture || "hello"} alt="img"></img>
				</div>
			</div>
			<Button onClick={() => refetch()}>
				{isFetching ? "Loading profile..." : "Load profile"}
			</Button>
		</>
	);
}
