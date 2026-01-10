import { useTripInfoStore } from "@/store/tripInfoStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

const ExpensesLayout = () => {
  const router = useRouter();
  const { title } = useTripInfoStore((state) => state);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: `${title} 경비`,
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
        name="createExpenses/index"
        options={{
          title: `${title} 경비 생성`,
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
        name="updateExpenses/index"
        options={{
          title: `${title} 경비 수정`,
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
    </Stack>
  );
};

export default ExpensesLayout;
