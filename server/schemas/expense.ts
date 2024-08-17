import { z } from "zod";

export const expenseSchema = z.object({
  id: z.number(),
  title: z.string().min(3, {
    message: "Incorrect Title length. Must be at least 3 characters long",
  }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid amount" }),
  description: z.string().optional(),
});

export type Expense = z.infer<typeof expenseSchema>;

export const expensePostSchema = expenseSchema.omit({ id: true });
