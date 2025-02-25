import Screen from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import InfoCard from "@/components/ui/InfoCard";
import { useFlashcards } from "@/contexts/FlashcardsContext";
import withAuth from "@/hocs/withAuth";
import { useRouter } from "expo-router";
import { useEffect } from "react";

function PracticeScreen() {
  const { setCollection } = useFlashcards();
  const router = useRouter();

  useEffect(() => {
    setCollection(null);
    // eslint-disable-next-line
  }, []);
  return (
    <Screen>
      <ThemedText type="title">Learn through Practice</ThemedText>

      <InfoCard
        title="Image Recognition"
        paragraph="Identify the correct image based on the AI-generated description. This exercise will help you improve your ability to quickly identify the correct translation by analyzing the given description. It encourages critical thinking and reinforces your understanding of the vocabulary.Select the correct translation from a list of options. This method helps you quickly recognize the correct answer and reinforces your ability to distinguish between similar words."
        buttonText="Start"
        hasAi
        onPress={() => {
          router.push("/practice/image");
        }}
      />

      <InfoCard
        title="Translate"
        paragraph="Write down the translation of each word we show in the flashcards. This exercise will help you reinforce your memory and improve your language skills by actively engaging with the content. Take your time to carefully think about each translation and try to recall it from memory before checking the answer. The more you practice, the better you'll get at retaining new vocabulary."
        buttonText="Start"
        onPress={() => {
          router.push("/practice/translate");
        }}
      />

      <InfoCard
        title="Multiple Choice"
        paragraph="Choose the correct option out of four based on the AI-generated description. This exercise will help you improve your ability to quickly identify the correct translation by analyzing the given description. It encourages critical thinking and reinforces your understanding of the vocabulary.Select the correct translation from a list of options. This method helps you quickly recognize the correct answer and reinforces your ability to distinguish between similar words."
        buttonText="Start"
        onPress={() => {
          router.push("/practice/multichoice");
        }}
        hasAi
      />

      <InfoCard
        title="Flashcard Review"
        paragraph="Review the flashcards and try to recall the translation of each word. This method is great for reinforcing your memory through repetition and active recall."
        buttonText="Start"
        onPress={() => {
          router.push("/practice/flashcard-review");
        }}
      />

      <InfoCard
        title="Listening Practice"
        paragraph="Listen to the pronunciation of each word and write down what you hear. This exercise helps improve your listening skills and reinforces your ability to recognize spoken words."
        buttonText="Start"
        onPress={() => {
          router.push("/practice/listening");
        }}
        hasAi
      />
    </Screen>
  );
}

export default withAuth(PracticeScreen);
