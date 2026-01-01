import AsyncStorage from "@react-native-async-storage/async-storage";
import { TripListResponseType } from "@/types/tripTypes";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const CACHE_DURATION = 1000 * 60 * 5; // 5분

interface TripCacheState {
  cachedTrips: TripListResponseType | null;
  cachedAt: number | null;

  // Actions
  setCachedTrips: (data: TripListResponseType) => void;
  clearCache: () => void;
  isCacheValid: () => boolean;
}

export const useTripStore = create<TripCacheState>()(
  persist(
    (set, get) => ({
      cachedTrips: null,
      cachedAt: null,

      setCachedTrips: (data: TripListResponseType) => {
        set({
          cachedTrips: data,
          cachedAt: Date.now(),
        });
      },

      clearCache: () => {
        set({
          cachedTrips: null,
          cachedAt: null,
        });
      },

      isCacheValid: () => {
        const { cachedAt } = get();
        if (!cachedAt) return false;
        return Date.now() - cachedAt < CACHE_DURATION;
      },
    }),
    {
      name: "trip-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        cachedTrips: state.cachedTrips,
        cachedAt: state.cachedAt,
      }),
    }
  )
);

