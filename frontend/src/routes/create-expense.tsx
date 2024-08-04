import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create-expense")({
	component: CreateExpense,
});

function CreateExpense() {
	return (
		<div className="mx-13 max-w-xl p-2 first-letter:mx-0">
			<form>
				<Label htmlFor="title">Title</Label>
				<Input id="title" name="title" type="text" placeholder="title" />
				<Label htmlFor="value">value</Label>
				<Input id="value" name="value" type="number" placeholder="value" />
				<Label htmlFor="description">description</Label>
				<Input id="description" name="description" type="text" placeholder="description" />
				<Label htmlFor="date">date</Label>
				<Input id="date" name="date" type="date" placeholder="date" />
				<Label htmlFor="category">category</Label>
				<Input id="category" name="category" type="text" placeholder="category" />
			</form>
		</div>
	);
}
