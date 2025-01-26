import React from "react";
import { ThemedView } from "./ThemedView";
import { Flashcard } from "@/types/Flashcard";
import { ThemedText } from "./ThemedText";
import { Pressable, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = {
  flashcard: Flashcard;
  handleDelete: () => void;
  handleEdit: () => void;
};

const FlashCard = ({ flashcard, handleDelete, handleEdit }: Props) => {
  const { word, definition, example } = flashcard;
  const successColor = useThemeColor({}, "success");
  const errorColor = useThemeColor({}, "error");
  const logoColor = useThemeColor({}, "primaryLogoBlue");

  return (
    <ThemedView
      style={{
        ...styles.card,
        borderWidth: 2,
        borderColor: logoColor,
        borderRadius: 16,
      }}
    >
      <ThemedView
        style={{
          width: "70%",
        }}
      >
        <ThemedText
          style={{
            color: "#b4befe",
          }}
          type="title"
        >
          {word}
        </ThemedText>
        <ThemedText>{definition}</ThemedText>
        <ThemedText
          style={{
            fontStyle: "italic",
            color: "gray",
          }}
        >
          {example}
        </ThemedText>
      </ThemedView>

      <ThemedView
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100%",
          gap: 4,
        }}
      >
        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
          onPress={() => {
            handleEdit();
          }}
        >
          <FontAwesome6 name="edit" size={16} color={successColor} />
          <ThemedText
            style={{
              color: successColor,
            }}
          >
            Edit
          </ThemedText>
        </Pressable>

        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
          onPress={() => {
            handleDelete();
          }}
        >
          <FontAwesome6 name="trash-can" size={16} color={errorColor} />
          <ThemedText
            style={{
              color: errorColor,
            }}
          >
            Delete
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
};

export default FlashCard;

const styles = StyleSheet.create({
  card: {
    display: "flex",
    overflow: "hidden",
    width: "100%",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
    elevation: 9,
    height: 120,
  },
});
