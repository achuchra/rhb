import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
	component: Profile,
});

function Profile() {
	const { isPending, data } = useQuery({
		queryFn: async () => {
			const response = await api.auth.me.$get();
			if (!response.ok) {
				throw new Error("Failed to fetch profile");
			}
			const data = await response.json();
			return data.user;
		},
		queryKey: ["get-profile"],
		gcTime: 0,
		staleTime: 0,
	});

	return (
		<>
			{isPending ? <h3>Loading profile</h3> : null}
			<div>
				<h1>Profile</h1>
				<div>
					<p>Name: {data?.given_name}</p>
					<p>Email: {data?.email}</p>
				</div>
			</div>
		</>
	);
}
