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
import {
  getFlashcardById,
  updateFlashcard,
} from "@/actions/flashcards/action";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Flashcard } from "@/types/Flashcard";

export default function Page() {
  const errorColor = useThemeColor({}, "error");
  const { session } = useAuth();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [flashcard, setFlashcard] = useState<Flashcard>();
  const [loading, setLoading] = useState(false);

  const fetchFlashcard = async () => {
    let cardId = typeof id === "string" ? id : id[0];

    setLoading(true);
    const response = await getFlashcardById(cardId);
    if (response.error) {
      return router.push("/home");
    }

    setFlashcard(response.data);
    formik.setValues({
      word: response.data.word,
      definition: response.data.definition,
      example: response.data.example,
    });
    setLoading(false);
  };

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
      example: yup.string().required("Example is required"),
    }),
    onSubmit: async (values): Promise<void> => {
      // eslint-disable-next-line no-console
      console.log(values);

      const payload = {
        word: values.word,
        definition: values.definition,
        example: values.example,
        user_id: session?.user.id ?? "no-user-id",
      };

      const response =
        flashcard && (await updateFlashcard(flashcard.id, payload));

      if (response?.error) {
        return formik.setStatus({ error: response.error.message });
      }

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
    if (id) {
      fetchFlashcard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <Screen>
        <ThemedView>
          <ThemedText>Loading...</ThemedText>
        </ThemedView>
      </Screen>
    );
  }

  if (!flashcard) {
    return (
      <Screen>
        <ThemedView>
          <ThemedText>Flashcard not found!</ThemedText>
        </ThemedView>
      </Screen>
    );
  }

  return (
    <Screen>
      <ThemedText type="title">
        {!flashcard ? "Create" : "Edit"} flashcard
      </ThemedText>
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
          label="Example"
          placeholder="example"
          id="example"
          value={formik.values.example}
          onChangeText={formik.handleChange("example")}
          onBlur={formik.handleBlur("example")}
          error={formik.touched.example ? formik.errors.example : ""}
          multiline
          numberOfLines={4}
        />

        <Pressable
          onPress={() => {
            formik.handleSubmit();
          }}
        >
          <ThemedText
            type="subtitle"
            style={{
              textAlign: "center",
            }}
          >
            {!flashcard ? "Create" : "Edit"} flashcard
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
