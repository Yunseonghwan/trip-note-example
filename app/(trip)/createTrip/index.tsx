import TripForm from "@/components/TripForm";
import { useState } from "react";

const CreateTripScreen = () => {
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
    />
  );
};

export default CreateTripScreen;
