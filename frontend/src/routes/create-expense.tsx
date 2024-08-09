import { type Expense } from "@server/schemas/expense";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/create-expense")({
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
			value: 0,
			description: "",
			date: new Date(),
			category: "",
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
				<Label htmlFor="value">value</Label>
				<Input
					id="value"
					{...register("value", { valueAsNumber: true })}
					type="number"
					placeholder="value"
				/>

				<Label htmlFor="description">description</Label>
				<Input
					id="description"
					{...register("description")}
					type="text"
					placeholder="description"
				/>

				<Label htmlFor="date">date</Label>
				<Input
					id="date"
					{...register("date", { valueAsDate: true })}
					type="date"
					placeholder="date"
				/>

				<Label htmlFor="category">category</Label>
				<Input id="category" {...register("category")} type="text" placeholder="category" />

				<Button type="submit" onClick={() => {}}>
					Submit
				</Button>
			</form>
			{showFormInvalid && <h3 className="text-error">Form is invalid</h3>}
		</div>
	);
}
