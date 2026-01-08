import Button from "@/components/Button";
import Input from "@/components/Input";
import { theme } from "@/constants/theme";
import { useGetTripDetail, useUpdateTripDetail } from "@/hooks/useTripDetail";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
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

const UpdateTripDetail = () => {
  const { tripDetailId } = useLocalSearchParams<{
    tripDetailId: string;
  }>();

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUri, setImageUri] = useState<string>("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const { mutateAsync } = useUpdateTripDetail();
  const { data: tripDetail } = useGetTripDetail(tripDetailId as string);

  console.log(tripDetail);

  useEffect(() => {
    if (tripDetail) {
      setTitle(tripDetail.title);
      setContent(tripDetail.content);
      setImageUri(tripDetail.image);
    }
  }, [tripDetail]);

  const handleUpdateTripDetail = async () => {
    await mutateAsync(
      {
        tripDetailId: tripDetailId as string,
        title: title,
        content: content,
        weather: tripDetail?.weather,
        image: image ?? undefined,
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Pressable onPress={pickImage}>
            {imageUri || image ? (
              <Image
                source={{ uri: image?.uri || imageUri }}
                style={styles.image}
                contentFit="cover"
              />
            ) : (
              <View style={styles.imageContainer}>
                <Entypo name="camera" size={24} color={theme.colors.gray} />
                <Text style={styles.imageText}>이미지 추가</Text>
              </View>
            )}
          </Pressable>
          <Input
            label="제목"
            placeholder="여행 이름을 입력하세요"
            value={title}
            onChangeText={setTitle}
          />
          <Input
            label="날씨"
            editable={false}
            value={tripDetail?.weather ?? ""}
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
            <Button label="여행 기록 수정" onPress={handleUpdateTripDetail} />
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

export default UpdateTripDetail;
