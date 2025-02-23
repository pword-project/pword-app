import Screen from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import InfoCard from "@/components/ui/InfoCard";
import { useFlashcards } from "@/contexts/FlashcardsContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function PracticeScreen() {
  const { setCollection } = useFlashcards();
  const router = useRouter();

  useEffect(() => {
    setCollection(null);
    // eslint-disable-next-line
  }, []);
  return (
    <Screen>
      <ThemedText type="title">Learn by Practice</ThemedText>

      <InfoCard
        title="Translate"
        paragraph="Write down the translation of each word we show in the flashcards. This exercise will help you reinforce your memory and improve your language skills by actively engaging with the content. Take your time to carefully think about each translation and try to recall it from memory before checking the answer. The more you practice, the better you'll get at retaining new vocabulary.nslation of each word we show in the flashcards."
        buttonText="Start"
        onPress={() => {
          router.push("/practice/translate");
        }}
      />
    </Screen>
  );
}
