import { theme } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const TripDetailListItem = () => {
  return (
    <Pressable>
      <Image contentFit="cover" source={{ uri: "" }} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>제목</Text>
          <Text style={styles.date}>날짜</Text>
        </View>
        <Pressable>
          <MaterialIcons name="more-vert" size={24} color="black" />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 170,
    backgroundColor: theme.colors.gray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    padding: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  leftContainer: {
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
  },
  date: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
});

export default memo(TripDetailListItem);
