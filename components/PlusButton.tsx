import { theme } from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, StyleSheet } from "react-native";

interface PlusButtonProps {
  onPress: () => void;
}

const PlusButton = ({ onPress }: PlusButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <AntDesign name="plus" size={24} color="#fff" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
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

export default PlusButton;
