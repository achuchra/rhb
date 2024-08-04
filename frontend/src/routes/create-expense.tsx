import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/create-expense")({
	component: CreateExpense,
});

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
			date: new Date().toISOString(),
			category: "",
		},
	});
	const [showFormInvalid, setShowFormInvalid] = useState(false);

	const onSubmitValid = () => {
		setShowFormInvalid(false);
		console.log(getValues());
		console.log("akcja submit");
	};

	const onSubmitInvalid = () => {
		setShowFormInvalid(true);
	};

	return (
		<div className="mx-13 max-w-xl p-2 first-letter:mx-0">
			<form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
				<Label htmlFor="title">Title</Label>
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
						<span>{errors.title.message}</span>
					</div>
				)}
				<Label htmlFor="value">value</Label>
				<Input id="value" {...register("value")} type="number" placeholder="value" />

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
			{showFormInvalid && <h3 className="text-red-700">Form is invalid</h3>}
		</div>
	);
}
