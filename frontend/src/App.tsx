import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  const [count, setCount] = useState(0);
  const [totalSpent, setTotalSpent] = useState<number | null>(null);

  useEffect(() => {
    const callTotalSpent = async () => {
      const res = await fetch("/api/v1/expenses/total-spent");
      const data = await res.json();
      setTotalSpent(data.total);
    };

    callTotalSpent();
  }, []);

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
        <p>Total spent: ${totalSpent}</p>
      </CardFooter>
    </Card>
  );
}

export default App;
