import { api } from "@/api";
import { TripItemListResponseType } from "@/types/tripTypes";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

export const useGetTripDetails = (
  tripId: string
): UseInfiniteQueryResult<{
  pages: TripItemListResponseType[];
  pageParams: number[];
}> => {
  return useInfiniteQuery({
    queryKey: ["trip-items"],
    queryFn: async ({ pageParam }) => {
      const response = await api.get(`/trip-items`, {
        params: {
          page: pageParam,
          tripId,
        },
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.hasNextPage) {
        return lastPage.meta.currentPage + 1;
      }
      return undefined;
    },
    enabled: !!tripId,
  });
};
