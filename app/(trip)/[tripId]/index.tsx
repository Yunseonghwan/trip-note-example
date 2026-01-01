import PlusButton from "@/components/PlusButton";
import TripDetailListItem from "@/components/TripDetailListItem";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const TripDetailScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <ScrollView>
        <TripDetailListItem />
      </ScrollView>
      <PlusButton onPress={() => router.push("/[tripId]/createTripDetail")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

export default TripDetailScreen;
