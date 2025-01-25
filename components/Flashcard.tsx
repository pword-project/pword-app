import React from "react";
import { ThemedView } from "./ThemedView";
import { Flashcard } from "@/types/Flashcard";
import { ThemedText } from "./ThemedText";
import { Pressable, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  flashcard: Flashcard;
  handleDelete: () => void;
  handleEdit: () => void;
};

const FlashCard = ({ flashcard, handleDelete, handleEdit }: Props) => {
  const { word, definition, example } = flashcard;
  const successColor = useThemeColor({}, "success");
  const errorColor = useThemeColor({}, "error");

  return (
    <ThemedView style={styles.card}>
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

      <ThemedView>
        <Pressable
          onPress={() => {
            handleEdit();
          }}
        >
          <ThemedText
            style={{
              color: successColor,
            }}
          >
            Edit
          </ThemedText>
        </Pressable>
        <Pressable
          onPress={() => {
            handleDelete();
          }}
        >
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
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 5.46,
    elevation: 9,
  },
});
