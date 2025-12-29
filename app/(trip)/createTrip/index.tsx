import TripForm from "@/components/TripForm";
import { useCreateTrip } from "@/hooks/useTrip";
import { useRouter } from "expo-router";
import { useState } from "react";

const CreateTripScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { mutateAsync } = useCreateTrip();

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleCreateTrip = () => {
    mutateAsync(
      { title, startDate, endDate },
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
      onPress={handleCreateTrip}
    />
  );
};

export default CreateTripScreen;
