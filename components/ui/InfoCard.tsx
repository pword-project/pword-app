import { Pressable } from "react-native-gesture-handler";
import { useState } from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ViewStyle } from "react-native";
import { TextStyle } from "react-native";
import infoCardStyles from "@/styles/InfoCard";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type CustomStyles = {
  container: ViewStyle;
  title: TextStyle;
  paragraph: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
};

type Props = {
  title: string;
  paragraph: string;
  buttonText: string;
  onPress?: () => void;
  customStyles?: CustomStyles;
  hasAi?: boolean;
};

export default function InfoCard({
  title,
  paragraph,
  buttonText,
  onPress = () => {},
  customStyles,
  hasAi = false,
}: Props) {
  const styles = customStyles ?? infoCardStyles;
  const shownParagraphLength = 150;
  const [showFullParagraph, setShowFullParagraph] = useState(false);

  const toggleParagraph = () => {
    setShowFullParagraph((prevState) => !prevState);
  };

  return (
    <ThemedView style={styles.container}>
      {hasAi && (
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 8,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
            backgroundColor: "transparent",
          }}
        >
          <MaterialCommunityIcons name="robot-angry" size={24} color="#333" />
          <ThemedText
            type="smallprint"
            style={{
              color: "#666666",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Improved with AI
          </ThemedText>
        </ThemedView>
      )}
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText type="default" style={styles.paragraph}>
        {showFullParagraph || paragraph.length <= shownParagraphLength
          ? paragraph
          : `${paragraph.substring(0, shownParagraphLength)}...`}
      </ThemedText>
      {paragraph.length > shownParagraphLength && (
        <Pressable
          onPress={toggleParagraph}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
            backgroundColor: "transparent",
          }}
        >
          <ThemedText
            type="button"
            style={{
              color: "rgb(130, 140, 204)",
              fontSize: 16,
              fontWeight: "bold",
              backgroundColor: "transparent",
            }}
          >
            {showFullParagraph ? "Read Less" : "Read More"}
          </ThemedText>
          <MaterialIcons
            name={showFullParagraph ? "arrow-upward" : "arrow-downward"}
            size={16}
            color="rgb(130, 140, 204)"
          />
        </Pressable>
      )}
      <Pressable onPress={onPress} style={styles.button}>
        <ThemedText type="button" style={styles.buttonText}>
          {buttonText}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}
