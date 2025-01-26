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
  getFlashcardsByCollectionId,
  getFlashcardsByUserId,
} from "@/actions/flashcards/action";
import FlashCard from "@/components/Flashcard";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Collection } from "@/types/Collections";
import { getCollectionsByUserId } from "@/actions/collections/action";
import CollectionsGrid from "@/components/CollectionsGrid";

function Page() {
  const router = useRouter();
  const { session } = useAuth();
  const logoColor = useThemeColor({}, "primaryLogoBlue");

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(false);

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

  async function fetchFlashcardsByCollectionId(collectionId: string) {
    setLoading(true);
    const { data: flashcards, error } =
      await getFlashcardsByCollectionId(collectionId);

    if (error) {
      return;
    }

    setFlashcards(flashcards ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchCollections();

    if (collection) {
      fetchFlashcardsByCollectionId(collection.id);
    } else {
      fetchFlashcards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, collection]);

  return (
    <Screen>
      <ThemedView style={styles.titleContainer}>
        <ThemedView
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
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
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <ThemedText
              type="default"
              style={{
                color: logoColor,
              }}
            >
              Add new
            </ThemedText>
            <FontAwesome6 name="add" size={24} color={logoColor} />
          </Pressable>
        </ThemedView>

        <ThemedView
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Pressable
            onPress={() => {
              router.push("/collections/new");
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "auto",
              gap: 8,
            }}
          >
            <ThemedText
              type="smallprint"
              style={{
                color: logoColor,
              }}
            >
              Manage collections
            </ThemedText>
            <FontAwesome6 name="contact-book" size={12} color={logoColor} />
          </Pressable>
        </ThemedView>

        <CollectionsGrid
          collection={collection}
          collections={collections}
          handlePress={(col) => {
            const newCollection = collection?.id === col.id ? null : col;
            setCollection(newCollection);
          }}
        />

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
