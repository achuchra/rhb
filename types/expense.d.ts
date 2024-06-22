export type Expense = {
  id: number;
  title: string;
  value: number;
  description?: string;
  date: Date;
  category: string;
};
