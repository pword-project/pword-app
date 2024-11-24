import { StyleSheet } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Screen from "@/components/Screen";
import SignupForm from "./_components/SignupForm";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Page() {
  const router = useRouter();
  const { session, loading } = useAuth();

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
        <ThemedText type="title">Create an account!</ThemedText>
        <HelloWave />
      </ThemedView>

      <SignupForm />
    </Screen>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.25)",
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
