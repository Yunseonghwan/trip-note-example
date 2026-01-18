import Modal from "@/components/Modal";
import PlusButton from "@/components/PlusButton";
import TripListItem from "@/components/TripListItem";
import { theme } from "@/constants/theme";
import { useDeleteTrip, useGetTrips } from "@/hooks/useTrip";
import { useTripInfoStore } from "@/store/tripInfoStore";
import { useTripStore } from "@/store/tripStore";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { SafeAreaView } from "react-native-safe-area-context";

const MyTripList = () => {
  const router = useRouter();
  const { setTripInfo } = useTripInfoStore((state) => state.action);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  const { mutateAsync } = useDeleteTrip();

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
    mutateAsync(tripId, {
      onSuccess: () => {
        handleCloseModal();
      },
    });
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
      <BannerAd
        // 프로덕션: 실제 광고 ID 사용
        // unitId="ca-app-pub-0000000000/000000000"
        // 개발: 테스트 ID 사용 (TestIds.BANNER)
        unitId={TestIds.ADAPTIVE_BANNER}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
          networkExtras: {
            collapsible: "bottom",
          },
        }}
      />
      <FlatList
        data={combinedTrips?.data}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripListItem
            title={item.title}
            startDate={item.startDate}
            endDate={item.endDate}
            goDetail={() => {
              setTripInfo(item.title, item.id);
              router.push({
                pathname: "/(trip)/[tripId]",
                params: { tripId: item.id },
              });
            }}
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
      <PlusButton onPress={() => router.push("/createTrip")} />
      <Modal
        isOpen={isModalOpen}
        selectedId={selectedTripId}
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
