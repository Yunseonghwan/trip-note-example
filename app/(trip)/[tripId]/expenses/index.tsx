import PlusButton from "@/components/PlusButton";
import { theme } from "@/constants/theme";
import { useGetExpenses } from "@/hooks/useExpenses";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ExpensesListScreen = () => {
  const { tripId } = useLocalSearchParams();
  const router = useRouter();

  const {
    data: expenses,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetExpenses(tripId as string);

  const combinedExpenses = useMemo(() => {
    const data = expenses?.pages.flatMap((page) => page.data) ?? [];
    const meta = expenses?.pages[0]?.meta;
    const totalAmount = expenses?.pages[0]?.totalAmount ?? 0;
    return { data: data ?? [], meta: meta ?? undefined, totalAmount };
  }, [expenses]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <FlatList
        data={combinedExpenses.data ?? []}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <></>}
        renderItem={({ item }) => <></>}
        ListEmptyComponent={() => (
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: theme.colors.gray,
              fontFamily: theme.fonts.medium,
            }}
          >
            경비를 추가 해주세요!
          </Text>
        )}
        ListFooterComponent={() =>
          isFetchingNextPage ? <ActivityIndicator /> : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      <PlusButton
        onPress={() =>
          router.navigate({
            pathname: "/(trip)/[tripId]/expenses/createExpenses",
            params: { tripId: tripId as string },
          })
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  listContainer: {
    gap: 20,
  },
});

export default ExpensesListScreen;
