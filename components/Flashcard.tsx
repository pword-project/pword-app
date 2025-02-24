import React, { useState } from "react";
import { ThemedView } from "./ThemedView";
import { Flashcard } from "@/types/Flashcard";
import { ThemedText } from "./ThemedText";
import { Pressable, ScrollView, StyleSheet } from "react-native";
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

  const [aiDefinitionShown, setAiDefinitionShown] = useState(false);

  return (
    <ThemedView
      style={{
        ...styles.card,
        borderWidth: 2,
        borderColor: logoColor,
        borderRadius: 16,
      }}
    >
      <ScrollView
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

        {flashcard.ai_definition && (
          <Pressable
            onPress={() => setAiDefinitionShown(!aiDefinitionShown)}
            style={{
              marginTop: 8,
            }}
          >
            <ThemedText
              style={{
                color: logoColor,
                textDecorationLine: "underline",
              }}
            >
              {aiDefinitionShown ? "Hide AI Definition" : "Show AI Definition"}
            </ThemedText>
          </Pressable>
        )}

        {aiDefinitionShown && flashcard.ai_definition && (
          <ThemedText
            style={{
              marginTop: 8,
              color: "#b4befe",
            }}
          >
            {flashcard.ai_definition}
          </ThemedText>
        )}
      </ScrollView>

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
    maxHeight: 200,
  },
});
