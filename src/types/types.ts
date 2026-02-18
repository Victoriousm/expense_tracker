export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category:
    | "food & Dinning "
    | "transportation"
    | "shopping"
    | "health"
    | "bills & utilities"
    | "entertainment"
    | "other";
}
