import TripForm from "@/components/TripForm";
import { useGetTrip, useUpdateTrip } from "@/hooks/useTrip";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

const UpdateTripScreen = () => {
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { data } = useGetTrip(tripId);
  const { mutateAsync } = useUpdateTrip();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setStartDate(new Date(data.startDate));
      setEndDate(new Date(data.endDate));
    }
  }, [data]);

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleUpdateTrip = () => {
    mutateAsync(
      { tripId, title, startDate, endDate },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  return (
    <TripForm
      title={title}
      startDate={startDate}
      endDate={endDate}
      handleTitleChange={handleTitleChange}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      onPress={handleUpdateTrip}
    />
  );
};
export default UpdateTripScreen;
