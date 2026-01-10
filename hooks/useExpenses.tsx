import { api } from "@/api";
import { CreateExpensesRequestType } from "@/types/expenses";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

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

export const useGetExpenses = (tripId: string) => {
  return useInfiniteQuery({
    queryKey: ["expenses", tripId],
    queryFn: async ({ pageParam }) => {
      const res = await api.get("/expenses", {
        params: {
          page: pageParam,
          tripId,
        },
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.hasNextPage) {
        return lastPage.meta.currentPage + 1;
      }
      return undefined;
    },
  });
};
