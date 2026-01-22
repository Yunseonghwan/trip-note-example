import PlusButton from "@/components/PlusButton";
import TripDetailListItem from "@/components/TripDetailListItem";
import TripDetailListItemSkeleton from "@/components/TripDetailListItemSkeleton";
import { useDeleteTripDetail, useGetTripDetails } from "@/hooks/useTripDetail";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import Modal from "@/components/Modal";
import { theme } from "@/constants/theme";
import dayjs from "dayjs";
import { SafeAreaView } from "react-native-safe-area-context";

const TripDetailScreen = () => {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTripDetailId, setSelectedTripDetailId] = useState<
    string | null
  >(null);

  const {
    data: tripDetails,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetTripDetails(tripId as string);

  const { mutateAsync } = useDeleteTripDetail();

  const combinedTripDetails = useMemo(() => {
    const data = tripDetails?.pages.flatMap((page) => page.data) ?? [];
    const meta = tripDetails?.pages[0]?.meta;
    return { data: data ?? [], meta: meta ?? undefined };
  }, [tripDetails]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleModal = (tripDetailId: string) => {
    setIsModalOpen(true);
    setSelectedTripDetailId(tripDetailId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTripDetailId(null);
  };

  const handleEdit = (tripDetailId: string) => {
    router.navigate({
      pathname: "/[tripId]/updateTripDetail",
      params: { tripId: tripId as string, tripDetailId },
    });
    handleCloseModal();
  };

  const handleDelete = (tripDetailId: string) => {
    mutateAsync(tripDetailId, {
      onSuccess: () => {
        handleCloseModal();
      },
    });
    handleCloseModal();
  };

  if (isLoading) {
    return (
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <View style={styles.listContainer}>
          {[1, 2, 3].map((item) => (
            <TripDetailListItemSkeleton key={item} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <FlatList
        data={combinedTripDetails.data ?? []}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const pageSize = combinedTripDetails.meta?.limit ?? 10;
          const totalItems = combinedTripDetails.data.length;

          // 각 페이지의 마지막 아이템인지 확인 (index는 0부터 시작)
          const isLastItemOfPage = (index + 1) % pageSize === 0;
          // 전체 데이터의 마지막 아이템인지 확인
          const isLastItem = index === totalItems - 1;
          // 총 데이터가 한 페이지 미만인지 확인
          const isLessThanOnePage = totalItems < pageSize;

          // 배너 표시 조건: 페이지의 마지막 아이템이거나, 한 페이지 미만이면서 마지막 아이템일 때
          const showAd = isLastItemOfPage || (isLessThanOnePage && isLastItem);

          return (
            <>
              <TripDetailListItem
                id={item.id}
                image={item.image}
                goDetail={() => {
                  router.push({
                    pathname: "/(trip)/[tripId]/[tripDetailId]",
                    params: { tripId: tripId as string, tripDetailId: item.id },
                  });
                }}
                title={item.title}
                date={dayjs(item.createdAt).format("YYYY.MM.DD")}
                handleModal={handleModal}
              />
              {/* 각 페이지의 마지막 아이템 뒤에 배너 광고 표시 */}
              {showAd && (
                <View style={styles.adContainer}>
                  <BannerAd
                    unitId={TestIds.ADAPTIVE_BANNER}
                    size={BannerAdSize.LARGE_BANNER}
                    requestOptions={{
                      requestNonPersonalizedAdsOnly: true,
                    }}
                  />
                </View>
              )}
            </>
          );
        }}
        ListEmptyComponent={() => (
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: theme.colors.gray,
              fontFamily: theme.fonts.medium,
            }}
          >
            여행기록을 추가 해주세요!
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
          router.push({
            pathname: "/[tripId]/createTripDetail",
            params: { tripId: tripId as string },
          })
        }
      />
      <Modal
        isOpen={isModalOpen}
        selectedId={selectedTripDetailId}
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
    paddingVertical: 30,
  },
  listContainer: {
    gap: 20,
  },
  adContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default TripDetailScreen;
