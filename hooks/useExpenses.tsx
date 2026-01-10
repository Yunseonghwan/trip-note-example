import { api } from "@/api";
import { CreateExpensesRequestType } from "@/types/expenses";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateExpenses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: CreateExpensesRequestType) => {
      const res = await api.post("/expenses", body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
