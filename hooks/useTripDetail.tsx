import { api } from "@/api";
import { TripItemListResponseType } from "@/types/tripTypes";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

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

export const useGetWeather = (latitude: number, longitude: number) => {
  return useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.EXPO_PUBLIC_APP_WEATHER_API_KEY}`
      );
      return res.data;
    },
  });
};
