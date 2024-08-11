import { hc } from "hono/client";

import { type ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";

const client = hc<ApiRoutes>("/");

export const api = client.api.v1;

export const userQueryOptions = queryOptions({
	queryKey: ["get-profile"],
	queryFn: async () => {
		const response = await api.auth.me.$get();
		if (!response.ok) {
			throw new Error("Failed to fetch profile");
		}
		const data = await response.json();
		return data.user;
	},
	staleTime: Infinity,
});
