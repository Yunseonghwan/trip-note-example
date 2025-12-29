import { theme } from "@/constants/theme";
import { memo } from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface ButtonProps extends PressableProps {
  label: string;
}

const Button = ({ label, onPress, ...props }: ButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress} {...props}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: theme.colors.white,
    fontSize: 20,
    fontFamily: theme.fonts.medium,
  },
});

export default memo(Button);
