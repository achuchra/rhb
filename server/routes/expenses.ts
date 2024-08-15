import { expenses as expensesDbSchema } from "./../db/schema/expenses";
import { expensePostSchema, type Expense } from "@/schemas/expense";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { userMiddleware } from "../kinde";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const expenses = new Hono()
  .get("/", userMiddleware, async (c) => {
    const user = c.get("user");
    c.header("user", JSON.stringify(user));
    const expenses = db
      .select()
      .from(expensesDbSchema)
      .where(eq(expensesDbSchema.userId, user.id));

    return c.json(expenses);
  })
  .post(
    "/",
    userMiddleware,
    //@ts-expect-error // because of the zValidator weak typings...
    zValidator("json", expensePostSchema),
    async (c) => {
      const expense = await (c.req.valid as (arg: string) => Expense)("json");
      const user = c.var.user;

      const result = await db
        .insert(expensesDbSchema)
        .values({
          ...expense,
          userId: user.id,
        })
        .returning();

      c.status(201);
      return c.json(result);
    }
  )
  .delete("/", userMiddleware, (c) => {
    return c.json({});
  })
  .get("/:id{[0-9]+}", userMiddleware, (c) => {
    const id = Number(c.req.param("id"));
    const expense = db
      .select()
      .from(expensesDbSchema)
      .where(eq(expensesDbSchema.id, id));

    if (!expense) {
      return c.notFound();
    }
    return c.json(expense);
  })
  .get("/total-spent", userMiddleware, async (c) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesDbSchema)
      .where(eq(expensesDbSchema.userId, user.id));

    const total = expenses.reduce((acc, curr) => {
      return acc + +curr.amount;
    }, 0);

    return c.json({ total });
  });
