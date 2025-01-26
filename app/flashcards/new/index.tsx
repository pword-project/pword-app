import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFormik } from "formik";
import * as yup from "yup";
import { ThemedTextInput } from "@/components/ThemedInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useState } from "react";
import Screen from "@/components/Screen";
import { useAuth } from "@/contexts/AuthContext";
import { createFlashcard } from "@/actions/flashcards/action";
import { useRouter } from "expo-router";
import CollectionsGrid from "@/components/CollectionsGrid";
import { Collection } from "@/types/Collections";
import {
  getCollectionsByUserId,
  linkFlashcardToCollection,
} from "@/actions/collections/action";
import { toast } from "@backpackapp-io/react-native-toast";

export default function Page() {
  const errorColor = useThemeColor({}, "error");
  const { session } = useAuth();
  const router = useRouter();

  const [collections, setCollections] = useState<Collection[]>([]);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchCollections() {
    setLoading(true);
    const { data, error } = await getCollectionsByUserId(
      session?.user.id ?? "no-user-id",
    );

    if (error) {
      return;
    }

    setCollections(data ?? []);
    setLoading(false);
  }

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
      const response = await createFlashcard({
        word: values.word,
        definition: values.definition,
        example: values.example,
        user_id: session?.user.id ?? "no-user-id",
      });

      if (response.error) {
        return formik.setStatus({ error: response.error.message });
      }

      if (collection) {
        // eslint-disable-next-line no-console
        await linkFlashcardToCollection(response.data[0].id, collection.id);
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

  useEffect(() => {
    fetchCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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

        <Pressable
          onPress={() => {
            formik.handleSubmit();
          }}
          disabled={loading}
        >
          <ThemedText
            type="subtitle"
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
