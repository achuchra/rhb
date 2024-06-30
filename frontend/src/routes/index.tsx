import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const callTotalSpent = async () => {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) {
    throw new Error("Failed to fetch total spent");
  }
  return await res.json();
};

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [count, setCount] = useState(0);

  const { data, error, isPending, isRefetching } = useQuery({
    queryKey: ["total-spent"],
    queryFn: callTotalSpent,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <Card className="w-[30rem] mx-auto">
      <CardHeader>
        <CardTitle>Vite + React</CardTitle>
        <CardDescription>Test app</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center gap-4">
        <Button onClick={() => setCount((count) => count + 1)}>Increase</Button>
        <Button
          variant={"outline"}
          onClick={() => setCount((count) => count - 1)}
        >
          Decrease
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <p>Result: {count} </p>
        <div className="mt-4">
          {isPending || isRefetching ? (
            <Skeleton className="h-6 w-[50px]" />
          ) : (
            `$${data.total}`
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
