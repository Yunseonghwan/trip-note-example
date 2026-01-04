import PlusButton from "@/components/PlusButton";
import TripDetailListItem from "@/components/TripDetailListItem";
import { useGetTripDetails } from "@/hooks/useTripDetail";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";

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
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetTripDetails(tripId as string);

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
    router.push({
      pathname: "/[tripId]/updateTripDetail",
      params: { tripId: tripId as string, tripDetailId },
    });
    handleCloseModal();
  };

  const handleDelete = (tripDetailId: string) => {
    console.log(tripDetailId);
    handleCloseModal();
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <FlatList
        data={combinedTripDetails.data ?? []}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripDetailListItem
            id={item.id}
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
            여행기록을 추가 해주세요!
          </Text>
        )}
        ListFooterComponent={() =>
          isFetchingNextPage ? <ActivityIndicator /> : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      <PlusButton onPress={() => router.push("/[tripId]/createTripDetail")} />
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
});

export default TripDetailScreen;
