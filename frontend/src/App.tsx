import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-2xl font-bold">Vite + React</h1>
      <div className="flex flex-col gap-2">
        <button
          className="bg-stone-500 hover:bg-stone-600 px-8 py-2 rounded-md text-white"
          onClick={() => setCount((count) => count + 1)}
        >
          Increase
        </button>
        <button
          className="bg-stone-500 hover:bg-stone-600 px-8 py-2 rounded-md text-white"
          onClick={() => setCount((count) => count - 1)}
        >
          Decrease
        </button>
        <p className="text-center">Count is {count}</p>
      </div>
      <p className="read-the-docs text-center">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
