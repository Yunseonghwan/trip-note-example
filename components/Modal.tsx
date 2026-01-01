import { theme } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
  return (
    isOpen && (
      <View style={styles.container}>
        <Pressable style={styles.dimArea} onPress={onClose} />
        <View style={styles.content}>
          <Pressable
            style={styles.button}
            onPress={() => onEdit(selectedTripId!)}
          >
            <Text>수정</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => onPressDelete(selectedTripId!)}
          >
            <Text>삭제</Text>
          </Pressable>
        </View>
      </View>
    )
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
    height: 150,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Modal;
