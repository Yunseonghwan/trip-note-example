import { api } from "@/api";
import { CreateTripRequestType } from "@/types/tripTypes";
import { useMutation } from "@tanstack/react-query";

export const useCreateTrip = () => {
  return useMutation({
    mutationFn: async (body: CreateTripRequestType) => {
      const res = await api.post("/trips", body);
      return res.data;
    },
  });
};
