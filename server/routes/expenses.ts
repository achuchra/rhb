import { expensePostSchema, type Expense } from "@/schemas/expense";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { userMiddleware } from "../kinde";

let fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Coffee",
    value: 4.8,
    description: "Coffee at Starbucks",
    date: new Date(),
    category: "Food & Drinks",
  },
  {
    id: 2,
    title: "Lunch",
    value: 12.5,
    description: "Lunch at McDonalds",
    date: new Date(),
    category: "Food & Drinks",
  },
  {
    id: 3,
    title: "Dinner",
    value: 20,
    description: "Dinner at Olive Garden",
    date: new Date(),
    category: "Food & Drinks",
  },
  {
    id: 4,
    title: "Gas",
    value: 50,
    description: "Gas for the car",
    date: new Date(),
    category: "Transportation",
  },
  {
    id: 5,
    title: "Internet",
    value: 80,
    description: "Internet bill",
    date: new Date(),
    category: "Bills & Utilities",
  },
  {
    id: 6,
    title: "Phone",
    value: 40,
    description: "Phone bill",
    date: new Date(),
    category: "Bills & Utilities",
  },
  {
    id: 7,
    title: "Rent",
    value: 1000,
    description: "Rent for the apartment",
    date: new Date(),
    category: "Home",
  },
  {
    id: 8,
    title: "Shoes",
    value: 120,
    description: "New shoes",
    date: new Date(),
    category: "Shopping",
  },
  {
    id: 9,
    title: "T-shirt",
    value: 20,
    description: "New t-shirt",
    date: new Date(),
    category: "Shopping",
  },
  {
    id: 10,
    title: "Socks",
    value: 10,
    description: "New socks",
    date: new Date(),
    category: "Shopping",
  },
];

export const expenses = new Hono()
  .get("/", userMiddleware, async (c) => {
    const user = c.get("user");
    c.header("user", JSON.stringify(user));
    await new Promise((r) => setTimeout(r, 3000));
    const data = c.json(fakeExpenses);
    return data;
  })
  .post("/", zValidator("json", expensePostSchema), async (c) => {
    const expense = await c.req.valid("json");
    fakeExpenses = [
      ...fakeExpenses,
      { ...expense, id: fakeExpenses.length + 1 },
    ];
    c.status(201);
    return c.json(expense);
  })
  .delete("/", (c) => {
    return c.json({});
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number(c.req.param("id"));
    const expense = fakeExpenses.find((e) => e.id === id);

    if (!expense) {
      return c.notFound();
    }
    return c.json(expense);
  })
  .get("/total-spent", async (c) => {
    await new Promise((r) => setTimeout(r, 3000));
    const total =
      fakeExpenses.reduce((acc, curr) => acc + curr.value, 0) * Math.random();
    return c.json({ total });
  });
