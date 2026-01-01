import TripListItem from "@/components/TripListItem";
import { theme } from "@/constants/theme";
import { useGetTrips } from "@/hooks/useTrip";
import { storageService } from "@/services/storageService";
import { TripListResponseType } from "@/types/tripTypes";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const CACHE_KEY = "trips_cache";
const CACHE_EXPIRY_KEY = "trips_cache_expiry";
const CACHE_DURATION = 1000 * 60 * 5; // 5분

const MyTripList = () => {
  const router = useRouter();
  const [cachedData, setCachedData] = useState<TripListResponseType | null>(
    null
  );

  const {
    data: trips,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetTrips();

  // 캐시에 데이터 저장
  const saveToCache = useCallback(async (data: TripListResponseType) => {
    try {
      await Promise.all([
        storageService.setItem(CACHE_KEY, JSON.stringify(data)),
        storageService.setItem(
          CACHE_EXPIRY_KEY,
          JSON.stringify(Date.now() + CACHE_DURATION)
        ),
      ]);
    } catch (error) {
      console.error("캐시 저장 실패:", error);
    }
  }, []);

  // 캐시에서 데이터 로드
  const loadFromCache = useCallback(async () => {
    try {
      const [cached, expiry] = await Promise.all([
        storageService.getItem(CACHE_KEY),
        storageService.getItem(CACHE_EXPIRY_KEY),
      ]);

      if (cached && expiry) {
        const isExpired = Date.now() > expiry;
        if (!isExpired) {
          setCachedData(cached);
        }
      }
    } catch (error) {
      console.error("캐시 로드 실패:", error);
    }
  }, []);

  // 컴포넌트 마운트 시 캐시 로드
  useEffect(() => {
    loadFromCache();
  }, [loadFromCache]);

  // API 데이터 받아오면 캐시 업데이트 (첫 페이지만)
  useEffect(() => {
    if (trips?.pages[0]) {
      saveToCache(trips.pages[0]);
    }
  }, [trips, saveToCache]);

  const combinedTrips = useMemo(() => {
    // API 데이터가 있으면 우선 사용, 없으면 캐시 데이터 사용
    if (trips?.pages.length) {
      const data = trips.pages.flatMap((page) => page.data) ?? [];
      const meta = trips.pages[0]?.meta;
      return { data, meta };
    }

    // API 로딩 중이거나 에러일 때 캐시 데이터 사용
    if (cachedData) {
      return { data: cachedData.data, meta: cachedData.meta };
    }

    return { data: [], meta: undefined };
  }, [trips, cachedData]);

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
