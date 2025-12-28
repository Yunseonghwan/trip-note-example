import { Stack } from "expo-router";

const TripDetailLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "여행 상세 리스트" }} />
      <Stack.Screen
        name="[tripDetailId]/index"
        options={{ title: "여행 상세" }}
      />
      <Stack.Screen
        name="createTripDetail/index"
        options={{ title: "여행 기록 생성" }}
      />
      <Stack.Screen
        name="updateTripDetail/index"
        options={{ title: "여행 기록 수정" }}
      />

      <Stack.Screen name="expenses" options={{ title: "여행 상세 경비" }} />
    </Stack>
  );
};

export default TripDetailLayout;
