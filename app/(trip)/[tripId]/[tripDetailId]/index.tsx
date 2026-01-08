import { theme } from "@/constants/theme";
import { useGetTripDetail } from "@/hooks/useTripDetail";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const TripDetailScreen = () => {
  const { tripDetailId } = useLocalSearchParams<{ tripDetailId: string }>();
  const { data: tripDetail } = useGetTripDetail(tripDetailId as string);

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const convertWeather = (weather: string) => {
    switch (weather) {
      case "Clear":
        return "☀️ 맑음";
      case "Clouds":
        return "🌥️ 흐림";
      case "Rain":
        return "🌧️ 비";
      case "Snow":
        return "❄️ 눈";
      case "Mist":
        return "🌫️ 안개";
      default:
        return weather;
    }
  };

  if (!tripDetail) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: tripDetail.image }}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{tripDetail.title}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.date}>{formatDate(tripDetail.createdAt)}</Text>
          <Text style={styles.weather}>
            {convertWeather(tripDetail.weather)}
          </Text>
        </View>
        <Text style={styles.content}>{tripDetail.content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  image: {
    width: "100%",
    height: 300,
  },
  contentContainer: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.black,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  date: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
  weather: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.gray,
  },
  content: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.black,
    lineHeight: 24,
  },
});

export default TripDetailScreen;
