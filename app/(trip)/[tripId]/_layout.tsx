import { theme } from "@/constants/theme";
import { useTripInfoStore } from "@/store/tripInfoStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

const TripDetailLayout = () => {
  const router = useRouter();
  const { title, tripId } = useTripInfoStore((state) => state);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: title ?? "여행 상세 리스트",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="black"
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(trip)/[tripId]/expenses",
                  params: { tripId },
                })
              }
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: theme.fonts.medium,
                  color: theme.colors.primary,
                }}
              >
                경비
              </Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="[tripDetailId]/index"
        options={{
          title: title ?? "여행 상세",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="black"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="createTripDetail/index"
        options={{
          title: title ?? "여행 기록 생성",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="black"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="updateTripDetail/index"
        options={{
          title: title ?? "여행 기록 수정",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="black"
              />
            </Pressable>
          ),
        }}
      />

      <Stack.Screen name="expenses" options={{ headerShown: false }} />
    </Stack>
  );
};

export default TripDetailLayout;
