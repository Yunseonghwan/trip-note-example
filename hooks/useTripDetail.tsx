import { api } from "@/api";
import {
  CreateTripDetailRequestType,
  TripItemListResponseType,
} from "@/types/tripTypes";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
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
    queryKey: ["trip-items", tripId],
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

// TripItem 생성 (multipart form data)
export const useCreateTripDetail = () => {
  return useMutation({
    mutationFn: async (data: CreateTripDetailRequestType) => {
      const formData = new FormData();

      formData.append("tripId", data.tripId);
      formData.append("title", data.title);

      if (data.content) {
        formData.append("content", data.content);
      }

      if (data.weather) {
        formData.append("weather", data.weather);
      }

      if (data.image) {
        const filename = data.image.fileName ?? "image.jpg";
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image/jpeg";

        formData.append("image", {
          uri: data.image.uri,
          name: filename,
          type,
        } as unknown as Blob);
      }

      const res = await api.post("/trip-items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
  });
};
