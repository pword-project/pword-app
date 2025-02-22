import InfoCard from "@/components/ui/InfoCard";
import infoCardStyles from "@/styles/InfoCard";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { useEffect, useRef } from "react";

export default function CardsSlider() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPosition = useRef(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (scrollViewRef.current) {
        const screenWidth = Dimensions.get("window").width;
        scrollPosition.current += screenWidth * 0.5;

        if (scrollPosition.current >= screenWidth * 1.5) {
          scrollPosition.current = 0;
        }

        scrollViewRef.current.scrollTo({
          x: scrollPosition.current,
          animated: true,
        });
      }
    }, 12000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
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
        title="About"
        paragraph="Learn more about our app and its features."
        buttonText="Learn more"
        onPress={() => {
          router.push("/about");
        }}
      />
    </ScrollView>
  );
}
