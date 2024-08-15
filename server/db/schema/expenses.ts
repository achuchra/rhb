import {
  serial,
  text,
  pgTable,
  numeric,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (expenses) => ({
    userIdIndex: index("user_idx").on(expenses.userId),
  })
);
