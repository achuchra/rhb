import { type Expense } from "@server/schemas/expense";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_logged/create-expense")({
	beforeLoad: () => {
		return {
			random: Math.random(),
		};
	},
	component: CreateExpense,
});

const postExpense = async (data: Omit<Expense, "id">) => {
	console.log("data", data);
	const apiCall = await api.expenses.$post({ json: data });
	if (!apiCall.ok) {
		throw new Error("Failed to post expense");
	}

	const response = await apiCall.json();
	return response;
};

function CreateExpense() {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: "",
			amount: "0",
			description: "",
		},
	});
	const [showFormInvalid, setShowFormInvalid] = useState(false);
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: postExpense,
		retry: 1,
		retryDelay: 500,
		gcTime: 0,
	});
	const navigate = useNavigate();
	const { user } = Route.useRouteContext();

	const onSubmitValid = () => {
		setShowFormInvalid(false);

		mutate(getValues(), {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["get-all-expenses"] });
				navigate({ to: "/expenses" });
			},
		});
	};

	const onSubmitInvalid = () => {
		setShowFormInvalid(true);
	};

	return (
		<div className="mx-13 max-w-xl p-2 first-letter:mx-0">
			<form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
				<h5>Hi, {user?.given_name}! Add your expense here</h5>
				<Label htmlFor="title" className="text-sm text-primary">
					Title
				</Label>
				<Input
					id="title"
					type="text"
					placeholder="title"
					{...register("title", {
						required: "Title is required",
						maxLength: { value: 20, message: "Title has max length of 20 characters" },
					})}
				/>
				{errors.title && (
					<div>
						<span className="text-sm text-error">{errors.title.message}</span>
					</div>
				)}
				<Label htmlFor="amount">amount</Label>
				<Input id="amount" {...register("amount")} type="number" placeholder="amount" />

				<Label htmlFor="description">description</Label>
				<Input
					id="description"
					{...register("description")}
					type="text"
					placeholder="description"
				/>

				<Button type="submit" onClick={() => {}}>
					Submit
				</Button>
			</form>
			{showFormInvalid && <h3 className="text-error">Form is invalid</h3>}
		</div>
	);
}
