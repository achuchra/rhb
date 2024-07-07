import { z } from "zod";

export const expenseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(3),
  value: z.number().positive(),
  description: z.string().optional(),
  date: z.date(),
  category: z.string(),
});

export type Expense = z.infer<typeof expenseSchema>;

export const expensePostSchema = expenseSchema.omit({ id: true });
