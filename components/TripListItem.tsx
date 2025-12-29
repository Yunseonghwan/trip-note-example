import { theme } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TripListItemProps {
  title: string;
  startDate: string | Date;
  endDate: string | Date;
  goDetail: () => void;
  handleModal: () => void;
}

const TripListItem = ({
  title,
  startDate,
  endDate,
  goDetail,
  handleModal,
}: TripListItemProps) => {
  return (
    <Pressable style={styles.container} onPress={goDetail}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{`${startDate} ~ ${endDate}`}</Text>
      </View>
      <Pressable onPress={handleModal}>
        <MaterialIcons name="more-vert" size={24} color="black" />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 30,
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContainer: {
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
  },
  date: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
});

export default memo(TripListItem);
