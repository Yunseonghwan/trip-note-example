import TripListItem from "@/components/TripListItem";
import { theme } from "@/constants/theme";
import { useGetTrips } from "@/hooks/useTrip";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const MyTripList = () => {
  const router = useRouter();
  const {
    data: trips,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetTrips();

  const combinedTrips = useMemo(() => {
    const data = trips?.pages.flatMap((page) => page.data) ?? [];
    const meta = trips?.pages[0]?.meta;
    return { data, meta };
  }, [trips]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>내 여행</Text>
      <FlatList
        data={combinedTrips?.data}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripListItem
            title={item.title}
            startDate={item.startDate}
            endDate={item.endDate}
            goDetail={() =>
              router.push({
                pathname: "/(trip)/[tripId]",
                params: { tripId: item.id },
              })
            }
            handleModal={() => {}}
          />
        )}
        ListEmptyComponent={() => (
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: theme.colors.gray,
              fontFamily: theme.fonts.medium,
            }}
          >
            여행을 추가 해주세요!
          </Text>
        )}
        ListFooterComponent={() =>
          isFetchingNextPage ? <ActivityIndicator /> : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      <Pressable
        style={styles.button}
        onPress={() => router.push("/createTrip")}
      >
        <AntDesign name="plus" size={24} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  title: {
    marginTop: 40,
    fontSize: 28,
    fontFamily: theme.fonts.bold,
  },

  listContainer: {
    paddingTop: 30,
    gap: 20,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default MyTripList;
