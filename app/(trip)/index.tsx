import Modal from "@/components/Modal";
import TripListItem from "@/components/TripListItem";
import { theme } from "@/constants/theme";
import { useGetTrips } from "@/hooks/useTrip";
import { useTripStore } from "@/store/tripStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const MyTripList = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const handleModal = (tripId: string) => {
    setIsModalOpen(true);
    setSelectedTripId(tripId);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTripId(null);
  };

  const handleEdit = (tripId: string) => {
    router.push({
      pathname: "/updateTrip",
      params: { tripId },
    });
    handleCloseModal();
  };

  const handleDelete = (tripId: string) => {
    console.log(tripId);
    handleCloseModal();
  };
  // Zustand store
  const { cachedTrips, setCachedTrips, isCacheValid } = useTripStore();

  const {
    data: trips,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetTrips();

  // API 데이터 받아오면 캐시 업데이트 (첫 페이지만)
  useEffect(() => {
    if (trips?.pages[0]) {
      setCachedTrips(trips.pages[0]);
    }
  }, [trips, setCachedTrips]);

  const combinedTrips = useMemo(() => {
    // API 데이터가 있으면 우선 사용
    if (trips?.pages.length) {
      const data = trips.pages.flatMap((page) => page.data) ?? [];
      const meta = trips.pages[0]?.meta;
      return { data, meta };
    }

    // API 로딩 중이거나 에러일 때 유효한 캐시 데이터 사용
    if (cachedTrips && isCacheValid()) {
      return { data: cachedTrips.data, meta: cachedTrips.meta };
    }

    return { data: [], meta: undefined };
  }, [trips, cachedTrips, isCacheValid]);

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
            handleModal={() => handleModal(item.id)}
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
      <Modal
        isOpen={isModalOpen}
        selectedTripId={selectedTripId}
        onEdit={handleEdit}
        onPressDelete={handleDelete}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 40,
    fontSize: 28,
    fontFamily: theme.fonts.bold,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.gray,
  },
  offlineNotice: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFF3CD",
    borderRadius: 8,
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: "#856404",
    textAlign: "center",
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
