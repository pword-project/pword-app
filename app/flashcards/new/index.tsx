import { Platform, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFormik } from "formik";
import * as yup from "yup";
import { ThemedTextInput } from "@/components/ThemedInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useState } from "react";
import Screen from "@/components/Screen";
import { useRouter } from "expo-router";
import CollectionsGrid from "@/components/CollectionsGrid";
import { toast } from "@backpackapp-io/react-native-toast";
import { useFlashcards } from "@/contexts/FlashcardsContext";
import { Collection } from "@/types/Collections";

export default function Page() {
  const errorColor = useThemeColor({}, "error");
  const router = useRouter();

  const { collections, loading, createFlashcard } = useFlashcards();

  const [collection, setCollection] = useState<Collection | null>(null);

  const formik = useFormik({
    initialValues: {
      word: "",
      definition: "",
      example: "",
    },
    initialStatus: {
      error: null,
    },
    validationSchema: yup.object().shape({
      word: yup.string().required("Word is required"),
      definition: yup.string().required("Definition is required"),
      example: yup.string().optional(),
    }),
    onSubmit: async (values): Promise<void> => {
      const { error } = await createFlashcard(values, collection);

      if (error) {
        return formik.setStatus({
          error: "The flashcard could not be created.",
        });
      }

      toast.success("Flashcard created and linked to collection");
      router.push("/home");
    },
  });

  useEffect(() => {
    return () => {
      formik.resetForm();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen>
      <ThemedText type="title">Create flashcard</ThemedText>
      {formik.status?.error ? (
        <ThemedView style={styles.titleContainer}>
          <ThemedText
            type="smallprint"
            style={{
              color: errorColor,
            }}
          >
            {formik.status?.error}
          </ThemedText>
        </ThemedView>
      ) : null}

      <ThemedView style={styles.formContainer}>
        <ThemedTextInput
          style={styles.input}
          label="Word"
          placeholder="word"
          id="word"
          value={formik.values.word}
          onChangeText={formik.handleChange("word")}
          onBlur={formik.handleBlur("word")}
          error={formik.touched.word ? formik.errors.word : ""}
        />

        <ThemedTextInput
          style={styles.input}
          label="Definition"
          placeholder="definition"
          id="definition"
          value={formik.values.definition}
          onChangeText={formik.handleChange("definition")}
          onBlur={formik.handleBlur("definition")}
          error={formik.touched.definition ? formik.errors.definition : ""}
        />

        <ThemedTextInput
          style={styles.input}
          label="Example (optional)"
          placeholder="example"
          id="example"
          value={formik.values.example}
          onChangeText={formik.handleChange("example")}
          onBlur={formik.handleBlur("example")}
          error={formik.touched.example ? formik.errors.example : ""}
          multiline
          numberOfLines={4}
        />

        <ThemedText>Collection (Optional)</ThemedText>

        <CollectionsGrid
          collection={collection}
          collections={collections}
          handlePress={(col) => {
            const newCollection = collection?.id === col.id ? null : col;
            setCollection(newCollection);
          }}
        />

        <ThemedView>
          <ThemedText
            type="smallprint"
            style={{
              color: "#666666",
              fontSize: 12,
              lineHeight: 18,
              marginBottom: 16,
            }}
          >
            Note: We use advanced artificial intelligence algorithms to generate
            a detailed and accurate description for your flashcard. This helps
            ensure that the information is both comprehensive and easy to
            understand, enhancing your learning experience. Our AI continuously
            improves to provide you with the best possible content.
          </ThemedText>
        </ThemedView>

        <Pressable
          onPress={() => {
            if (Platform.OS === "web") {
              alert("Creating flashcard...");
            } else {
              toast("Creating flashcard...");
            }
            formik.handleSubmit();
          }}
          disabled={loading}
        >
          <ThemedText
            type="button"
            style={{
              textAlign: "center",
            }}
          >
            Create
          </ThemedText>
        </Pressable>
      </ThemedView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  formContainer: {
    display: "flex",
    padding: 16,
    borderRadius: 16,
    flexDirection: "column",
    width: "100%",
    maxWidth: 500,
    gap: 8,
  },
  input: {
    minHeight: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
  },
});
