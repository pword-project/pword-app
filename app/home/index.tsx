import { StyleSheet, Pressable } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/contexts/AuthContext";
import withAuth from "@/hocs/withAuth";
import Screen from "@/components/Screen";

function Page() {
  const { logout, session } = useAuth();

  return (
    <Screen>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Welcome to your homepage {session?.user.email}
        </ThemedText>
      </ThemedView>

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
