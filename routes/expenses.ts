import type { Expense } from "@/types/expense";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const expensePostSchema = z.object({
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
  });
