import Button from "@/components/Button";
import Input from "@/components/Input";
import { theme } from "@/constants/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateTripScreen = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  return (
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

export default CreateTripScreen;
