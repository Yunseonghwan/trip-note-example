import { create } from "zustand";

interface TripInfoState {
  title: string;
  tripId: string;
  action: {
    setTripInfo: (title: string, tripId: string) => void;
  };
}

export const useTripInfoStore = create<TripInfoState>((set) => ({
  title: "",
  tripId: "",
  action: {
    setTripInfo: (title: string, tripId: string) => set({ title, tripId }),
  },
}));
