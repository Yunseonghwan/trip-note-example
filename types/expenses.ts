export type ExpenseCategory = "FOOD" | "TRANSPORT" | "LODGING" | "ACTIVITY";

export interface CreateExpensesRequestType {
  tripId: string;
  amount: number;
  category: ExpenseCategory;
  memo?: string;
}
