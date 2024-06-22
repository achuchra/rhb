import { expensePostSchema, type Expense } from "@/schemas/expense";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const fakeExpenses: Expense[] = [
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
];

export const expenses = new Hono()
  .get("/", (c) => {
    return c.json({ exprenses: [{ value: 4.8 }] });
  })
  .post("/", zValidator("json", expensePostSchema), async (c) => {
    const expense = await c.req.valid("json");
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
  });
