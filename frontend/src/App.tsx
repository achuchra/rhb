import { useState } from "react";
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
      <CardFooter className="flex justify-center">
        <p>Result: {count} </p>
      </CardFooter>
    </Card>
  );
}

export default App;
