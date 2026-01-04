import Button from "@/components/Button";
import Input from "@/components/Input";
import { theme } from "@/constants/theme";
import { useCreateTripDetail, useGetWeather } from "@/hooks/useTripDetail";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const CreateTripDetail = () => {
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const { data: weather } = useGetWeather(
    location?.coords.latitude ?? 0,
    location?.coords.longitude ?? 0
  );

  const { mutateAsync } = useCreateTripDetail();

  const handleCreateTripDetail = async () => {
    await mutateAsync(
      {
        tripId: tripId as string,
        title: title,
        content: content,
        image: image as ImagePicker.ImagePickerAsset,
        weather: weather?.weather[0].main,
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "권한 필요",
        "사진 라이브러리에 접근하려면 권한이 필요합니다. 설정에서 권한을 허용해주세요.",
        [
          { text: "취소", style: "cancel" },
          { text: "설정으로 이동", onPress: () => Linking.openSettings() },
        ]
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  const convertWeather = (weather: string) => {
    switch (weather) {
      case "Clear":
        return "☀️ 맑음";
      case "Clouds":
        return "🌥️ 흐림";
      case "Rain":
        return "🌧️ 비";
      case "Snow":
        return "❄️ 눈";
      case "Mist":
        return "🌫️ 안개";
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          {image ? (
            <Image
              source={{ uri: image.uri }}
              style={styles.image}
              contentFit="cover"
            />
          ) : (
            <Pressable style={styles.imageContainer} onPress={pickImage}>
              <Entypo name="camera" size={24} color={theme.colors.gray} />
              <Text style={styles.imageText}>이미지 추가</Text>
            </Pressable>
          )}

          <Input
            label="제목"
            placeholder="여행 이름을 입력하세요"
            value={title}
            onChangeText={setTitle}
          />
          <Input
            label="날씨"
            editable={false}
            value={convertWeather(weather?.weather[0].main)}
          />
          <Input
            label="설명"
            placeholder="내용을 입력하세요"
            height={100}
            multiline={true}
            value={content}
            onChangeText={setContent}
          />
          <View style={styles.buttonContainer}>
            <Button label="여행 기록 추가" onPress={handleCreateTripDetail} />
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
    paddingVertical: 30,
  },
  formContainer: {
    gap: 20,
    flexGrow: 1,
  },
  imageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: "auto",
  },
});

export default CreateTripDetail;
