import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, PropsWithChildren } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Toasts } from "@backpackapp-io/react-native-toast";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <GestureHandlerRootView>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="+not-found" />
          </Stack>
          {children}
          <Toasts /> {/* <---- Add Here */}
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </AuthProvider>
    </ThemeProvider>
  );
}
