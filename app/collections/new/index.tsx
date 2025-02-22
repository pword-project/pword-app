import { Pressable, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFormik } from "formik";
import * as yup from "yup";
import { ThemedTextInput } from "@/components/ThemedInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect } from "react";
import Screen from "@/components/Screen";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@backpackapp-io/react-native-toast";
import { useFlashcards } from "@/contexts/FlashcardsContext";

export default function Page() {
  const errorColor = useThemeColor({}, "error");
  const { session } = useAuth();

  const { collections, createCollection, loading, deleteCollection } =
    useFlashcards();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    initialStatus: {
      error: null,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
    }),
    onSubmit: async (values): Promise<void> => {
      const { error } = await createCollection({
        name: values.name,
        user_id: session?.user.id ?? "no-user-id",
      });

      if (error) {
        return formik.setStatus({
          error: "The collection could not be created. Please try again later.",
        });
      }

      toast.success("Collection created");
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
      <ThemedText type="title">Create Collection</ThemedText>
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
          label="Collection Name"
          placeholder="name"
          id="name"
          value={formik.values.name}
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          error={formik.touched.name ? formik.errors.name : ""}
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
            Create
          </ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView>
        <ThemedView>
          <ThemedText type="subtitle">Delete your collections</ThemedText>
        </ThemedView>

        {loading && <ThemedText>Loading...</ThemedText>}

        {!loading && collections.length === 0 && (
          <ThemedText>No collections found</ThemedText>
        )}

        {!loading && collections.length > 0 && (
          <ThemedView
            style={{
              display: "flex",
              gap: 8,
            }}
          >
            {collections.map((collection) => (
              <Pressable
                key={collection.id}
                onPress={async () => {
                  await deleteCollection(collection);
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <FontAwesome name="close" size={24} color={errorColor} />
                <ThemedText>{collection.name}</ThemedText>
              </Pressable>
            ))}
          </ThemedView>
        )}
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
