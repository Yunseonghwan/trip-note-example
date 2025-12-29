import { theme } from "@/constants/theme";
import { memo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputProps extends TextInputProps {
  label: string;
}

const Input = ({ label, placeholder, ...props }: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        textContentType="none"
        spellCheck={false}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    gap: 10,
  },
  inputLabel: {
    fontSize: 18,
    fontFamily: theme.fonts.regular,
  },
  input: {
    height: 52,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});

export default memo(Input);
