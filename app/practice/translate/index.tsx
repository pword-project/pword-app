import React from "react";
import { useFormik } from "formik";
import { useFlashcards } from "@/contexts/FlashcardsContext";
import { Flashcard } from "@/types/Flashcard";
import Screen from "@/components/Screen";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FlashcardPractice = () => {
  const { flashcards } = useFlashcards();

  const formik = useFormik({
    initialValues: flashcards.reduce(
      (acc: { [key: string]: string }, flashcard: Flashcard) => {
        acc[flashcard.id] = "";
        return acc;
      },
      {},
    ),
    onSubmit: (values) => {
      alert("Submitted values: " + JSON.stringify(values));
    },
  });

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container} horizontal>
        {flashcards.map((flashcard: Flashcard) => (
          <ThemedView key={flashcard.id} style={styles.flashcardContainer}>
            <ThemedText style={styles.flashcardText}>
              {flashcard.word}
            </ThemedText>
            <ThemedText style={styles.labelText}>Definition:</ThemedText>
            <TextInput
              style={styles.input}
              id={flashcard.id}
              onChangeText={formik.handleChange(flashcard.id)}
              value={formik.values[flashcard.id]}
            />
            <TouchableOpacity
              style={styles.hintButton}
              onPress={() => alert(flashcard.definition)}
            >
              <Ionicons name="information" size={24} color="black" />
            </TouchableOpacity>
          </ThemedView>
        ))}
      </ScrollView>

      <Pressable onPress={() => formik.handleSubmit()}>
        <ThemedText type="button" style={styles.submitText}>
          Submit
        </ThemedText>
      </Pressable>
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
    marginBottom: 15,
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
    width: 250,
  },
  flashcardText: {
    fontSize: 18,
    marginBottom: 5,
    color: "#333",
  },
  labelText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
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
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
});
