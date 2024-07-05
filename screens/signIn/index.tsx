import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const { signIn } = useAuth();
  const { top } = useSafeAreaInsets();

  return (
    <View className=" flex-1">
      <ImageBackground
        className=" flex-1"
        source={require("@/assets/images/bg.png")}
      >
        <View style={{ marginTop: top, flex: 1 }}>
          <View className=" p-4 flex-row justify-end">
            <Ionicons name="alert-circle-outline" size={24} color="#0F98FA" />
          </View>
          <View className=" self-center">
            <Text className=" mt-[40%] text-5xl">
              cl<Text className=" text-primary">ai</Text>rify
            </Text>
          </View>
          <View className=" flex-1" />
          <TouchableOpacity onPress={signIn}>
            <View className=" flex-row m-4 bg-white-color px-9 py-2 rounded-lg items-center">
              <Image
                className=" h-10 w-10"
                source={require("@/assets/images/google-icon.png")}
              />
              <View className=" w-9" />
              <Text className=" font-medium text-base">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
          <Text className=" self-center text-white-color font-medium text-base underline mb-7">
            Terms of use
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page;
