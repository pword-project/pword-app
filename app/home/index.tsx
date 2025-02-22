import CollectionsGrid from "@/components/CollectionsGrid";
import FlashCard from "@/components/Flashcard";
import Screen from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import withAuth from "@/hocs/withAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import CardsSlider from "./_components/CardsSlider";
import { useFlashcards } from "@/contexts/FlashcardsContext";

function Page() {
  const router = useRouter();
  const logoColor = useThemeColor({}, "primaryLogoBlue");

  const {
    collection,
    setCollection,
    collections,
    flashcards,
    deleteFlashcard,
    loading,
  } = useFlashcards();

  if (loading)
    return (
      <Screen>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Loading...</ThemedText>
        </ThemedView>
      </Screen>
    );

  return (
    <Screen>
      <ThemedView style={styles.titleContainer}>
        <CardsSlider />

        <ThemedView
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <ThemedText type="title">Your flashcards</ThemedText>
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

        <CollectionsGrid
          collection={collection}
          collections={collections}
          handlePress={(col) => {
            const newCollection = collection?.id === col.id ? null : col;
            setCollection(newCollection);
          }}
        />

        <ThemedView
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginBottom: 16,
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

        {!loading && !flashcards?.length && (
          <ThemedView>
            <ThemedText>You've no flashcards, add some!</ThemedText>
          </ThemedView>
        )}

        {loading && (
          <ThemedView>
            <ThemedText>Loading...</ThemedText>
          </ThemedView>
        )}

        {flashcards?.map((flashcard) => {
          // eslint-disable-next-line react/jsx-key
          return (
            <FlashCard
              key={flashcard.id}
              flashcard={flashcard}
              handleDelete={() => deleteFlashcard(flashcard)}
              handleEdit={() => {
                router.push(`/flashcards/edit/${flashcard.id}`);
              }}
            />
          );
        })}
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
