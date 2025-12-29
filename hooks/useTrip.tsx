import { api } from "@/api";
import { CreateTripRequestType, TripListResponseType } from "@/types/tripTypes";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

export const useCreateTrip = () => {
  return useMutation({
    mutationFn: async (body: CreateTripRequestType) => {
      const res = await api.post("/trips", body);
      return res.data;
    },
  });
};

export const useGetTrips = (): UseQueryResult<TripListResponseType> => {
  return useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const res = await api.get("/trips");
      return res.data;
    },
  });
};
