// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

const androidId = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID;

WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
  userInfo?: any;
  authState?: { token: string | null; authenticated: boolean | null };
  signIn?: () => void;
  signOut?: () => void;
};

const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = ({ children }: any) => {
  const config = {
    androidClientId: androidId,
  };
  const [userInfo, setUserInfo] = useState<any>(null);
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>();
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const user = await userInfoResponse.json();
        setUserInfo(user);
        setAuthState({ token: token, authenticated: true });
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;

      const fetchUserInfo = async () => {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const user = await userInfoResponse.json();
        setUserInfo(user);
        token && setAuthState({ token: token, authenticated: true });
        token && (await SecureStore.setItemAsync("authToken", token));
      };

      fetchUserInfo();
    }
  }, [response]);

  const signIn = () => {
    promptAsync();
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("authToken");
    setUserInfo(null);
    setAuthState({ token: null, authenticated: null });
  };
  return (
    <AuthContext.Provider value={{ userInfo, authState, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
