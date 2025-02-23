import InfoCard from "@/components/ui/InfoCard";
import infoCardStyles from "@/styles/InfoCard";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { useRef } from "react";
import { ThemedText } from "@/components/ThemedText";

export default function CardsSlider() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <>
      <ThemedText
        type="title"
        style={{
          color: "white",
          textAlign: "left",
        }}
      >
        Explore Features
      </ThemedText>
      <ScrollView
        horizontal={true}
        style={{
          marginBottom: 16,
        }}
        ref={scrollViewRef}
      >
        <InfoCard
          title="Practice"
          paragraph="Practice makes perfect! Click the button below to start your training and improve your skills."
          buttonText="Get started"
          onPress={() => {
            router.push("/practice");
          }}
          customStyles={{
            ...infoCardStyles,
            container: {
              ...infoCardStyles.container,
              maxWidth: Dimensions.get("window").width * 0.8,
            },
          }}
        />

        <InfoCard
          title="AI Chat"
          paragraph="AI-powered chat! Ask questions and receive personalized responses."
          buttonText="Go to chat"
          onPress={() => {
            router.push("/ai");
          }}
          customStyles={{
            ...infoCardStyles,
            container: {
              ...infoCardStyles.container,
              maxWidth: Dimensions.get("window").width * 0.8,
            },
          }}
        />

        <InfoCard
          title="About"
          paragraph="Learn more about our app and its features."
          buttonText="Learn more"
          onPress={() => {
            router.push("/about");
          }}
          customStyles={{
            ...infoCardStyles,
            container: {
              ...infoCardStyles.container,
              maxWidth: Dimensions.get("window").width * 0.8,
            },
          }}
        />
      </ScrollView>
    </>
  );
}
