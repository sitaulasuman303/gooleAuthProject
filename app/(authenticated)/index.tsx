import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

const HomePage = () => {
  const { authState, signIn, signOut, userInfo } = useAuth();
  console.log(authState);
  console.log(userInfo);
  return (
    <View className=" flex-1 p-4">
      <ExpoStatusBar style="dark" backgroundColor="#FFFFFF" />
      {userInfo && (
        <View className=" flex-1 bg-secondary p-4 rounded-3xl mb-4">
          <View className=" flex-row items-center gap-4">
            <Image
              source={{ uri: userInfo?.picture }}
              className=" h-[80] w-[80] rounded-full object-scale-down"
            />
            <View>
              <Text className=" mb-3 font-bold text-lg">{userInfo.name} </Text>
              <Text>{userInfo.email}</Text>
            </View>
          </View>
          <View className=" flex-1" />
          <TouchableOpacity onPress={signOut}>
            <View className=" bg-primary items-center p-3 rounded-xl">
              <Text>SIGN OUT</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomePage;
