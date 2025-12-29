import { api } from "@/api";
import { CreateTripRequestType, TripListResponseType } from "@/types/tripTypes";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
} from "@tanstack/react-query";

export const useCreateTrip = () => {
  return useMutation({
    mutationFn: async (body: CreateTripRequestType) => {
      const res = await api.post("/trips", body);
      return res.data;
    },
  });
};

export const useGetTrips = (): UseInfiniteQueryResult<{
  pages: TripListResponseType[];
  pageParams: number[];
}> => {
  return useInfiniteQuery({
    queryKey: ["trips"],
    queryFn: async ({ pageParam }) => {
      const res = await api.get("/trips", {
        params: { page: pageParam },
      });
      return res.data as TripListResponseType;
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
