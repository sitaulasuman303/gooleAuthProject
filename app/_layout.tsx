import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import * as WebBrowser from "expo-web-browser";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const router = useRouter();
  const { authState } = useAuth();
  const segments = useSegments();
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    // if (!authState?.authenticated) return;
    const inAuthGroup = segments[0] === "(authenticated)";
    if (authState?.authenticated && !inAuthGroup) {
      router.replace("/(authenticated)/");
    } else if (authState?.authenticated === null) {
      router.replace("/");
    }
    console.log(authState?.authenticated);
  }, [authState]);

  if (!loaded) {
    return <Text>Loading</Text>;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(authenticated)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};
export default RootLayoutNav;
