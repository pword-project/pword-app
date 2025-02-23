import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useFlashcards } from "@/contexts/FlashcardsContext";
import { Flashcard } from "@/types/Flashcard";
import Screen from "@/components/Screen";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { toast } from "@backpackapp-io/react-native-toast";
import CollectionsGrid from "@/components/CollectionsGrid";

const FlashcardPractice = () => {
  const { flashcards, collections, collection, setCollection } =
    useFlashcards();
  const logoColor = useThemeColor({}, "primaryLogoBlue");
  const errorColor = useThemeColor({}, "error");
  const [currentFlashcard, setCurrentFlashcard] = useState<Flashcard | null>(
    null,
  );
  const [flashcardsPracticed, setFlashcardsPracticed] = useState<Flashcard[]>(
    [],
  );

  const formik = useFormik({
    initialValues: { definition: "" },
    onSubmit: (values) => {
      if (
        currentFlashcard &&
        values.definition.toLowerCase() ===
          currentFlashcard.definition.toLowerCase()
      ) {
        setFlashcardsPracticed([...flashcardsPracticed, currentFlashcard]);
        if (flashcardsPracticed.length + 1 === flashcards.length) {
          setFlashcardsPracticed([]);
        }
        setCurrentFlashcard(
          flashcards[Math.floor(Math.random() * flashcards.length)],
        );
      } else {
        if (Platform.OS === "web") {
          toast.error("Incorrect definition. Try again!");
        } else {
          alert("Incorrect definition. Try again!");
        }
      }
      formik.resetForm();
    },
  });

  const handleSkip = () => {
    setCurrentFlashcard(
      flashcards[Math.floor(Math.random() * flashcards.length)],
    );
  };

  useEffect(() => {
    setCurrentFlashcard(
      flashcards[Math.floor(Math.random() * flashcards.length)],
    );
  }, [flashcards]);

  return (
    <Screen>
      <ThemedText type="title">Translate</ThemedText>
      <ThemedText type="default">
        Type the definition of the word you see below. Make sure to be as
        accurate as possible, and remember that spelling counts. This exercise
        will help you reinforce your memory and understanding of the vocabulary.
      </ThemedText>

      <ThemedText
        type="smallprint"
        style={{
          marginTop: 16,
          color: "#666666",
        }}
      >
        If you are unsure, you can always use the hint button to see the correct
        definition, but try your best to recall it on your own first.
      </ThemedText>

      <ThemedText
        type="subtitle"
        style={{
          marginVertical: 16,
        }}
      >
        Filter cards by collection
      </ThemedText>
      <CollectionsGrid
        collection={collection}
        collections={collections}
        handlePress={(col) => {
          const newCollection = collection?.id === col.id ? null : col;
          setCollection(newCollection);
        }}
      />

      {flashcards.length > 0 && (
        <ThemedView style={styles.flashcardContainer}>
          {currentFlashcard && (
            <>
              <ThemedText
                type="subtitle"
                style={{
                  fontWeight: "bold",
                  fontSize: 24,
                  marginBottom: 16,
                  color: "#333",
                }}
              >
                The word is
              </ThemedText>
              <ThemedText style={styles.flashcardText}>
                "{currentFlashcard.word}"
              </ThemedText>
              <ThemedText style={styles.labelText}>
                Write the definition of the word
              </ThemedText>
              <TextInput
                style={styles.input}
                onChangeText={formik.handleChange("definition")}
                value={formik.values.definition}
              />
              <TouchableOpacity
                style={styles.hintButton}
                onPress={() => {
                  if (Platform.OS === "web") alert(currentFlashcard.definition);
                  else toast(currentFlashcard.definition);
                }}
              >
                <Ionicons
                  name="information-circle"
                  size={24}
                  color={logoColor}
                />
              </TouchableOpacity>
            </>
          )}
        </ThemedView>
      )}

      {!flashcards.length && (
        <ThemedView style={styles.flashcardContainer}>
          <ThemedText style={styles.flashcardText}>
            No flashcards available
          </ThemedText>
        </ThemedView>
      )}

      <Pressable onPress={() => formik.handleSubmit()}>
        <ThemedText type="button" style={styles.submitText}>
          Submit
        </ThemedText>
      </Pressable>

      <Pressable onPress={handleSkip}>
        <ThemedText
          type="button"
          style={{ ...styles.skipText, backgroundColor: errorColor }}
        >
          Skip
        </ThemedText>
      </Pressable>

      <ThemedText style={styles.progressText}>
        Words translated: {flashcardsPracticed.length}/{flashcards.length}
      </ThemedText>
    </Screen>
  );
};

export default FlashcardPractice;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  flashcardContainer: {
    marginTop: 16,
    marginBottom: 16,
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  flashcardText: {
    fontSize: 18,
    marginBottom: 5,
    fontStyle: "italic",
    color: "#333",
  },
  labelText: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    color: "#666",
    alignSelf: "flex-start",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 10,
  },
  hintButton: {
    marginTop: 10,
  },
  submitText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  skipText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  progressText: {
    marginTop: 20,
    fontSize: 16,
    color: "#666666",
  },
});
