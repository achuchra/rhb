import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const getAllExpenses = async () => {
	const response = await api.expenses.$get();
	if (!response.ok) {
		toast.error("An error occurred while fetching expenses. Please try again later.");
		return;
	}
	toast.success("Expenses fetched successfully", { duration: 5000 });
	const data = await response.json();
	return data;
};

export const Route = createFileRoute("/_logged/expenses")({
	component: Expenses,
});

function Expenses() {
	const queryClient = useQueryClient();
	const { data, error, isPending, isRefetching } = useQuery({
		queryKey: ["get-all-expenses"],
		queryFn: getAllExpenses,
		gcTime: 1000 * 60 * 5,
		staleTime: 1000 * 60 * 5,
	});

	return (
		<div className="p-2">
			<div className="flex justify-between">
				<h1 className="text-2xl font-bold">Expenses</h1>
				<Button
					onClick={() => {
						queryClient.invalidateQueries({ queryKey: ["get-all-expenses"] });
					}}
					disabled={isPending || isRefetching}
				>
					Refresh
				</Button>
			</div>
			<div className="mt-4">
				{error && <div>Something went wrong</div>}
				<Table>
					<TableCaption>A list of your recent expenses</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Id</TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Creation date</TableHead>
							<TableHead className="text-right">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isPending || isRefetching
							? Array(10)
									.fill(0)
									.map((_, i) => (
										<TableRow key={i}>
											{Array(4)
												.fill(0)
												.map((_, i) => (
													<TableCell key={i}>
														<Skeleton className="h-4 w-[100%]" />
													</TableCell>
												))}
										</TableRow>
									))
							: data?.map((expense) => (
									<TableRow key={expense.id}>
										<TableCell className="font-medium">{expense.id}</TableCell>
										<TableCell>{expense.title}</TableCell>
										<TableCell>{expense.description}</TableCell>
										<TableCell>{new Date(expense.createdAt).toLocaleDateString()}</TableCell>
										<TableCell className="text-right">${expense.amount}</TableCell>
									</TableRow>
								))}
					</TableBody>
					<TableFooter className="sticky bottom-0">
						<TableRow>
							<TableCell colSpan={5} className="text-right">
								Total:
								{isPending || isRefetching ? (
									<Skeleton className="h-6 w-[50px]" />
								) : (
									`$${data?.reduce((acc, expense) => acc + +expense.amount, 0)}`
								)}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</div>
	);
}
