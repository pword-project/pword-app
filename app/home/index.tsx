import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { ThemedView } from "@/components/ThemedView";
import withAuth from "@/hocs/withAuth";
import Screen from "@/components/Screen";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Flashcard } from "@/types/Flashcard";
import { useAuth } from "@/contexts/AuthContext";
import {
  deleteFlashcard,
  getFlashcardsByUserId,
} from "@/actions/flashcards/action";
import FlashCard from "@/components/Flashcard";
import { useThemeColor } from "@/hooks/useThemeColor";

function Page() {
  const router = useRouter();
  const successColor = useThemeColor({}, "success");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();

  async function fetchFlashcards() {
    setLoading(true);
    const flashcards = await getFlashcardsByUserId(
      session?.user.id ?? "no-user-id",
    );
    if (flashcards.error) {
      return;
    }

    setFlashcards(flashcards.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchFlashcards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <Screen>
      <ThemedView style={styles.titleContainer}>
        <ThemedView
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText type="title">Flashcards</ThemedText>
          <Pressable
            onPress={() => {
              router.push("/flashcards/new");
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
            }}
          >
            <ThemedText
              type="default"
              style={{
                color: successColor,
              }}
            >
              Add new
            </ThemedText>
            <FontAwesome6 name="add" size={24} color={successColor} />
          </Pressable>
        </ThemedView>

        {!loading && !flashcards.length && (
          <ThemedView>
            <ThemedText>You've no flashcards, add some!</ThemedText>
          </ThemedView>
        )}

        {loading && (
          <ThemedView>
            <ThemedText>Loading...</ThemedText>
          </ThemedView>
        )}

        <ThemedView
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {flashcards.map((flashcard) => {
            // eslint-disable-next-line react/jsx-key
            return (
              <FlashCard
                key={flashcard.id}
                flashcard={flashcard}
                handleDelete={async () => {
                  const response = await deleteFlashcard(flashcard.id);
                  if (response.error) {
                    return;
                  }
                  setFlashcards((prev) =>
                    prev.filter((f) => f.id !== flashcard.id),
                  );
                }}
                handleEdit={() => {
                  router.push(`/flashcards/edit/${flashcard.id}`);
                }}
              />
            );
          })}
        </ThemedView>
      </ThemedView>
    </Screen>
  );
}

export default withAuth(Page);

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 8,
    width: "100%",
    marginTop: 16,
  },
});
