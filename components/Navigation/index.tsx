import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { ThemedText } from "../ThemedText";

export default function NavigationLayout() {
  return (
    <ThemedView>
      <Link href="/">
        <ThemedText type="link">Go to Home</ThemedText>
      </Link>
      <Link href="/">
        <ThemedText type="link">Go to Login</ThemedText>
      </Link>
      <Link href="/signup">
        <ThemedText type="link">Go to Signup</ThemedText>
      </Link>
      <Link href="/explore">
        <ThemedText type="link">Go to Explore (protected)</ThemedText>
      </Link>
    </ThemedView>
  );
}
