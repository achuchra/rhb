import type { Expense } from "@/types/expense";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

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

const expensePostSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(3),
  value: z.number().positive(),
  description: z.string().optional(),
  date: z.coerce.date(),
  category: z.string(),
});

export const expenses = new Hono()
  .get("/", (c) => {
    return c.json({ exprenses: [{ value: 4.8 }] });
  })
  .post("/", zValidator("json", expensePostSchema), async (c) => {
    const expense = await c.req.valid("json");
    return c.json(expense);
  })
  .delete("/", (c) => {
    return c.json({});
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = c.req.param("id");
    return c.json(fakeExpenses.find((e) => e.id === Number(id)));
  });
