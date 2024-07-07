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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { type Expense } from "@server/schemas/expense";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const getAllExpenses = async () => {
  const response = await api.expenses.$get();
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  const data = await response.json();
  return data as Expense[];
};

export const Route = createFileRoute("/expenses")({
  component: Expenses,
});

function Expenses() {
  const queryClient = useQueryClient();
  const { data, error, isPending, isRefetching } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <Button
          onClick={() => {
            queryClient.invalidateQueries("get-all-expenses");
          }}
          disabled={isPending || isRefetching}
        >
          Refresh
        </Button>
      </div>
      <div className="mt-4">
        {error && <div>Error: {error.message}</div>}
        <Table>
          <TableCaption>A list of your recent expenses</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending || isRefetching
              ? [0, 1, 2, 3, 4].map((i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-[100%]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100%]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100%]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100%]" />
                    </TableCell>
                  </TableRow>
                ))
              : data?.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.id}</TableCell>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell className="text-right">
                      ${expense.value}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter className="sticky bottom-0">
            <TableRow>
              <TableCell colSpan={4} className="text-right">
                Total:
                {isPending || isRefetching ? (
                  <Skeleton className="h-6 w-[50px]" />
                ) : (
                  `$${data?.reduce((acc, expense) => acc + expense.value, 0)}`
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
