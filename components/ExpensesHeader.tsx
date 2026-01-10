import { theme } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { memo } from "react";
import { StyleSheet, Text } from "react-native";

interface ExpensesHeaderProps {
  totalAmount: number;
}

const ExpensesHeader = ({ totalAmount }: ExpensesHeaderProps) => {
  return (
    <LinearGradient
      colors={["#3B82F6", "#CBE3FF"]}
      // start, end: 0~1 범위의 좌표값
      // x: 0(왼쪽) ~ 1(오른쪽)
      // y: 0(위) ~ 1(아래)
      // 예시: {x:0, y:0} → {x:1, y:1} = 좌상단 → 우하단 (대각선)
      //       {x:0, y:0} → {x:1, y:0} = 왼쪽 → 오른쪽 (수평)
      //       {x:0, y:0} → {x:0, y:1} = 위 → 아래 (수직)
      start={{ x: 0, y: 0 }} // 그라데이션 시작점 (좌상단)
      end={{ x: 1, y: 1 }} // 그라데이션 끝점 (우하단)
      style={styles.container}
    >
      <Text style={styles.title}>총 지출</Text>
      <Text style={styles.amount}>
        {totalAmount.toLocaleString()}
        <Text style={styles.unit}> 원</Text>
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    height: 100,
    borderRadius: 10,
    gap: 8,
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.white,
  },
  amount: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
  },
  unit: {
    fontSize: 18,
    fontFamily: theme.fonts.medium,
  },
});

export default memo(ExpensesHeader);
