import { theme } from "@/constants/theme";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ModalProps {
  isOpen: boolean;
  selectedTripId: string | null;
  onEdit: (tripId: string) => void;
  onPressDelete: (tripId: string) => void;
  onClose: () => void;
}

const Modal = ({
  isOpen,
  selectedTripId,
  onEdit,
  onPressDelete,
  onClose,
}: ModalProps) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    if (isOpen) {
      opacity.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.linear),
      });
      scale.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.linear),
      });
    } else {
      opacity.value = withTiming(0, { duration: 150 });
      scale.value = withTiming(0.8, { duration: 150 });
    }
  }, [isOpen, opacity, scale]);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  if (!isOpen) return null;

  return (
    <Animated.View style={styles.container}>
      <Pressable style={styles.dimArea} onPress={onClose} />
      <Animated.View style={[styles.content, contentStyle]}>
        <Pressable
          style={styles.button}
          onPress={() => onEdit(selectedTripId!)}
        >
          <Text style={styles.buttonText}>수정</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={() => onPressDelete(selectedTripId!)}
        >
          <Text style={styles.deleteButtonText}>삭제</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dimArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: 200,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  button: {
    width: "100%",
    height: 44,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 15,
    fontFamily: theme.fonts.semiBold,
  },
  deleteButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FF4444",
  },
  deleteButtonText: {
    color: "#FF4444",
    fontSize: 15,
    fontFamily: theme.fonts.semiBold,
  },
});

export default Modal;
