import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Screen from "@/components/Screen";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { HelloWave } from "@/components/HelloWave";
import { StyleSheet } from "react-native";
import LoginWithOTP from "./_components/LoginOtpForm";

export default function Page() {
  const { session, loading } = useAuth();
  const router = useRouter();

  async function checkIfUserIsLoggedIn() {
    if (!loading && session) {
      router.replace("/home");
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <Screen
      contentContainerStyle={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Log in with OTP</ThemedText>
        <HelloWave />
      </ThemedView>

      <LoginWithOTP />
    </Screen>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.25)",
    width: "100%",
    padding: 16,
    borderRadius: 16,
  },
  titleContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
});
