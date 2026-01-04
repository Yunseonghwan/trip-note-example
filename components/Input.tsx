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
  height?: number;
}

const Input = ({
  label,
  placeholder,
  editable,
  height = 52,
  ...props
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          editable === false && styles.disabledInput,
          { height },
        ]}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        textContentType="none"
        spellCheck={false}
        editable={editable}
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
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  disabledInput: {
    backgroundColor: theme.colors.gray200,
  },
});

export default memo(Input);
