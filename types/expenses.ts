import { MetaType } from "./common";

export type ExpenseCategory = "FOOD" | "TRANSPORT" | "LODGING" | "ACTIVITY";

export interface CreateExpensesRequestType {
  tripId: string;
  amount: number;
  category: ExpenseCategory;
  memo?: string;
}

export interface ExpenseItemType {
  id: string;
  amount: number;
  category: ExpenseCategory;
  createdAt: string | Date;
  memo?: string;
}

export interface ExpenseListResponseType {
  data: ExpenseItemType[];
  meta: MetaType;
  totalAmout: number;
}
