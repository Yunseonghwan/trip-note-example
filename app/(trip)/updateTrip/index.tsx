import TripForm from "@/components/TripForm";
import { useState } from "react";

const UpdateTripScreen = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  return (
    <TripForm
      title={title}
      startDate={startDate}
      endDate={endDate}
      handleTitleChange={handleTitleChange}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      onPress={() => null}
    />
  );
};
export default UpdateTripScreen;
