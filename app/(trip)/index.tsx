import TripListItem from "@/components/TripListItem";
import { theme } from "@/constants/theme";
import { useGetTrips } from "@/hooks/useTrip";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const MyTripList = () => {
  const router = useRouter();
  const { data: trips } = useGetTrips();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>내 여행</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {trips?.meta.totalCount !== 0 ? (
          trips?.data.map((trip) => (
            <TripListItem
              key={trip.id}
              title={trip.title}
              startDate={trip.startDate}
              endDate={trip.endDate}
              goDetail={() =>
                router.push({
                  pathname: "/(trip)/[tripId]",
                  params: { tripId: trip.id },
                })
              }
              handleModal={() => {}}
            />
          ))
        ) : (
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
      </ScrollView>
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
