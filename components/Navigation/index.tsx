import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { ThemedText } from "../ThemedText";

export default function NavigationLayout() {
  return (
    <ThemedView>
      <Link href="/">
        <ThemedText type="link">Go to Home</ThemedText>
      </Link>
      <Link href="/about">
        <ThemedText type="link">Go to About</ThemedText>
      </Link>
      <Link href="/explore">
        <ThemedText type="link">Go to Explore</ThemedText>
      </Link>
    </ThemedView>
  );
}
