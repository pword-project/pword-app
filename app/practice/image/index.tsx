import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFlashcards } from "@/contexts/FlashcardsContext";
import { Flashcard } from "@/types/Flashcard";
import Screen from "@/components/Screen";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { toast } from "@backpackapp-io/react-native-toast";
import CollectionsGrid from "@/components/CollectionsGrid";

const Multichoice = () => {
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
  const [options, setOptions] = useState<Flashcard[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDefinition, setShowDefinition] = useState<boolean>(false);

  const apiUrl = "http://localhost:8001/word/";

  const fetchImage = async (word: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}${word}`);
      setImageUrl(response.data.image);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateOptions = (newFlashcard: Flashcard) => {
    const randomOptions = [newFlashcard];
    while (randomOptions.length < 4) {
      const randomFlashcard =
        flashcards[Math.floor(Math.random() * flashcards.length)];
      if (!randomOptions.includes(randomFlashcard)) {
        randomOptions.push(randomFlashcard);
      }
    }
    if (!randomOptions.includes(newFlashcard)) {
      randomOptions[Math.floor(Math.random() * randomOptions.length)] =
        newFlashcard;
    }
    setOptions(randomOptions.sort(() => Math.random() - 0.5));
  };

  const handleOptionSelect = (selectedFlashcard: Flashcard) => {
    if (currentFlashcard && selectedFlashcard.word === currentFlashcard.word) {
      setFlashcardsPracticed([...flashcardsPracticed, currentFlashcard]);
      if (flashcardsPracticed.length + 1 === flashcards.length) {
        setFlashcardsPracticed([]);
      }
      const newFlashcard =
        flashcards[Math.floor(Math.random() * flashcards.length)];
      setCurrentFlashcard(newFlashcard);
      generateOptions(newFlashcard);
      fetchImage(newFlashcard.word);
      setShowDefinition(false);
    } else {
      if (Platform.OS === "web") {
        toast.error("Incorrect option. Try again!");
      } else {
        alert("Incorrect option. Try again!");
      }
    }
  };

  const handleSkip = () => {
    const newFlashcard =
      flashcards[Math.floor(Math.random() * flashcards.length)];
    setCurrentFlashcard(newFlashcard);
    generateOptions(newFlashcard);
    fetchImage(newFlashcard.word);
    setShowDefinition(false);
  };

  useEffect(() => {
    if (flashcards.length > 0) {
      const newFlashcard =
        flashcards[Math.floor(Math.random() * flashcards.length)];
      setCurrentFlashcard(newFlashcard);
      generateOptions(newFlashcard);
      fetchImage(newFlashcard.word);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen>
      <ThemedText type="title">Multiple choice</ThemedText>
      <ThemedText type="default">
        Choose the correct word for the definition you see below. This exercise
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
        word, but try your best to recall it on your own first.
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

      {flashcards.length >= 4 && (
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
                Guess the word
              </ThemedText>
              {loading ? (
                <ActivityIndicator size="large" color={logoColor} />
              ) : (
                imageUrl && (
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                )
              )}

              <TouchableOpacity
                style={styles.showDefinitionButton}
                onPress={() => setShowDefinition(!showDefinition)}
              >
                <ThemedText type="smallprint" style={styles.showDefinitionText}>
                  {showDefinition ? "Hide Definition" : "Show Definition"}
                </ThemedText>
              </TouchableOpacity>
              {showDefinition && (
                <ThemedText style={styles.flashcardText}>
                  "{currentFlashcard.ai_definition ?? currentFlashcard.example}"
                </ThemedText>
              )}
              <ThemedText style={styles.labelText}>
                Choose the correct word
              </ThemedText>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionButton}
                  onPress={() => handleOptionSelect(option)}
                >
                  <ThemedText style={styles.optionText}>
                    {option.word}
                  </ThemedText>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.hintButton}
                onPress={() => {
                  if (Platform.OS === "web") toast(currentFlashcard.word);
                  else alert(currentFlashcard.word);
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

      {!flashcards.length ||
        (flashcards.length < 4 && (
          <ThemedView style={styles.flashcardContainer}>
            <ThemedText style={styles.flashcardText}>
              Not enough flashcards available
            </ThemedText>
          </ThemedView>
        ))}

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

export default Multichoice;

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
  optionButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    width: "100%",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  hintButton: {
    marginTop: 10,
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
  image: {
    width: 200,
    height: 200,
    marginVertical: 16,
  },
  showDefinitionButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  showDefinitionText: {
    fontSize: 16,
    color: "#666666",
  },
});
