import { StyleSheet, Pressable } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/contexts/AuthContext";
import withAuth from "@/hocs/withAuth";
import Screen from "@/components/Screen";
import { useRouter } from "expo-router";

function Page() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <Screen>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to the explore page</ThemedText>
      </ThemedView>

      <Pressable
        onPress={() => {
          router.replace("/home");
        }}
      >
        <ThemedText type="link">Go to Dashboard</ThemedText>
      </Pressable>

      <Pressable
        onPress={async () => {
          await logout();
        }}
      >
        <ThemedText type="link">logout</ThemedText>
      </Pressable>
    </Screen>
  );
}

export default withAuth(Page);

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
