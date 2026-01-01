import { api } from "@/api";
import {
  CreateTripRequestType,
  TripItemType,
  TripListResponseType,
} from "@/types/tripTypes";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

export const useCreateTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: CreateTripRequestType) => {
      const res = await api.post("/trips", body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
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

export const useGetTrip = (tripId: string): UseQueryResult<TripItemType> => {
  return useQuery({
    queryKey: ["trip", tripId],
    queryFn: async () => {
      const res = await api.get(`/trips/${tripId}`);
      return res.data;
    },
  });
};

export const useUpdateTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: CreateTripRequestType & { tripId: string }) => {
      const res = await api.patch(`/trips/${body.tripId}`, {
        title: body.title,
        startDate: body.startDate,
        endDate: body.endDate,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};
