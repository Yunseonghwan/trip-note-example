import { theme } from "@/constants/theme";
import { useTripTitleStore } from "@/store/tripTitleStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

const TripDetailLayout = () => {
  const router = useRouter();
  const { title } = useTripTitleStore();
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
            <Link
              href="/(trip)/[tripId]/expenses"
              style={{
                fontSize: 16,
                fontFamily: theme.fonts.medium,
                color: theme.colors.primary,
              }}
            >
              경비 관리
            </Link>
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

      <Stack.Screen name="expenses" options={{ title: "여행 상세 경비" }} />
    </Stack>
  );
};

export default TripDetailLayout;
