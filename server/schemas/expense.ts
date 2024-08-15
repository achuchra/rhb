import { z } from "zod";

export const expenseSchema = z.object({
  id: z.number(),
  title: z.string().min(3),
  amount: z.string(),
  description: z.string().optional(),
});

export type Expense = z.infer<typeof expenseSchema>;

export const expensePostSchema = expenseSchema.omit({ id: true });
