import { Stack } from "expo-router";

const ExpensesLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="createExpenses/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="updateExpenses/index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default ExpensesLayout;
