import { theme } from "@/constants/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { memo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./Button";
import Input from "./Input";

interface TripFormProps {
  title: string;
  handleTitleChange: (text: string) => void;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}

const TripForm = ({
  title,
  handleTitleChange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: TripFormProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Input
            label="제목"
            placeholder="여행 이름을 입력하세요"
            value={title}
            onChangeText={handleTitleChange}
          />
          <View style={styles.dateContainer}>
            <Text style={styles.label}>여행 기간</Text>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>시작일</Text>
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(_, date) => date && setStartDate(date)}
                locale="ko-KR"
              />
            </View>

            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>종료일</Text>
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={(_, date) => date && setEndDate(date)}
                minimumDate={startDate}
                locale="ko-KR"
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button label="여행 만들기" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: theme.fonts.regular,
  },
  formContainer: {
    paddingTop: 50,
    gap: 20,
    flexGrow: 1,
  },
  dateContainer: {
    gap: 10,
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
  buttonContainer: {
    marginTop: "auto",
  },
});

export default memo(TripForm);
