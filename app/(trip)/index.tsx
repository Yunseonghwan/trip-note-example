import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const MyTripList = () => {
  return (
    <SafeAreaView>
      <Link href="/createTrip">여행 생성</Link>
      <Link href="/updateTrip">여행 수정</Link>
    </SafeAreaView>
  );
};
export default MyTripList;
