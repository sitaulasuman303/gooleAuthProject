import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Profile",
          headerStyle: { backgroundColor: "#0F98FA" },
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default Layout;
