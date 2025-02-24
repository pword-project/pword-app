import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Screen from "@/components/Screen";
import { Pressable } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export default function AboutPage() {
  const router = useRouter();
  return (
    <Screen>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.subtitle}>
          Meet the Creators
        </ThemedText>

        <ThemedText type="smallprint" style={styles.smallprint}>
          Press any of the buttons below to contact us!
        </ThemedText>
        <ScrollView horizontal style={styles.creatorsContainer}>
          <Pressable
            onPress={() => {
              router.push("mailto:cajimenezca@unal.edu.co");
            }}
          >
            <View style={styles.creatorCard}>
              <ThemedText style={styles.creatorName}>Carlos Jimenez</ThemedText>
              <ThemedText style={styles.creatorEmail}>
                cajimenezca@unal.edu.co
              </ThemedText>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              router.push("mailto:bchaparro@unal.edu.co");
            }}
          >
            <View style={styles.creatorCard}>
              <ThemedText style={styles.creatorName}>Brian Chaparro</ThemedText>
              <ThemedText style={styles.creatorEmail}>
                bchaparro@unal.edu.co
              </ThemedText>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              router.push("mailto:slopezpa@unal.edu.co");
            }}
          >
            <View style={styles.creatorCard}>
              <ThemedText style={styles.creatorName}>Sergio Lopez</ThemedText>
              <ThemedText style={styles.creatorEmail}>
                slopezpa@unal.edu.co
              </ThemedText>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              router.push("mailto:sjgomezg@unal.edu.co");
            }}
          >
            <View style={styles.creatorCard}>
              <ThemedText style={styles.creatorName}>Santiago Gomez</ThemedText>
              <ThemedText style={styles.creatorEmail}>
                sjgomezg@unal.edu.co
              </ThemedText>
            </View>
          </Pressable>
        </ScrollView>

        <View style={styles.thankYouCard}>
          <ThemedText style={styles.thankYouTitle}>Thank You!</ThemedText>
          <ThemedText style={styles.thankYouMessage}>
            We appreciate your support and hope you enjoy using Pword App. Your
            feedback is valuable to us!
          </ThemedText>
        </View>

        <ThemedText type="title" style={styles.title}>
          About Pword App
        </ThemedText>

        <ThemedText style={styles.paragraph}>
          Pword App is designed to help you learn new languages through engaging
          and interactive practice exercises. Our mission is to make language
          learning fun and accessible for everyone. Whether you're a beginner or
          an advanced learner, Pword App offers a variety of exercises to suit
          your needs and help you achieve your language learning goals.
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          Our app includes features such as flashcards, translation exercises,
          listening and speaking practice, reading comprehension, and more. We
          believe that consistent practice and exposure to the language are key
          to mastering it, and our app is here to support you every step of the
          way. Additionally, we've recently added an AI chat feature that allows
          you to practice conversations with an intelligent virtual assistant,
          providing instant feedback and personalized guidance.
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          One of our latest innovations is the AI-generated flashcard
          descriptions. These descriptions are automatically created to provide
          you with more context and understanding of the vocabulary. We are
          constantly striving to leverage AI to improve our platform, ensuring
          that you have the best tools available for your language learning
          journey.
        </ThemedText>

        <ThemedText type="title" style={styles.title}>
          Legal
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          Pword App is committed to protecting your privacy. We do not use any
          cookies or tracking technologies that collect personal data without
          your consent. Our app is designed to provide a safe and secure
          environment for language learning.
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          By using Pword App, you agree to our terms and conditions. We use AI
          technology to enhance your learning experience, but we do not store or
          share any personal information with third parties. All data processed
          by our AI is anonymized and used solely for the purpose of improving
          the app's functionality and user experience.
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          If you have any questions or concerns about our privacy practices,
          please contact us at privacy@pwordapp.com. Your trust is important to
          us, and we are committed to ensuring that your data is handled with
          the utmost care and respect.
        </ThemedText>
      </ThemedView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    marginBottom: 16,
    color: "#fff", // Light text color for better contrast
  },
  paragraph: {
    marginBottom: 16,
    color: "#fff", // Light text color for better contrast
  },
  subtitle: {
    marginTop: 32,
    color: "#fff", // Light text color for better contrast
    fontWeight: "bold",
  },
  smallprint: {
    marginBottom: 16,
    color: "#d3d3d3", // Light gray text color for better contrast
  },
  creatorsContainer: {
    width: "100%",
  },
  creatorCard: {
    backgroundColor: "#444",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    marginRight: 16,
  },
  creatorName: {
    textAlign: "center",
    color: "#fff", // Light text color for better contrast
    fontSize: 18,
    fontWeight: "bold",
  },
  creatorEmail: {
    textAlign: "center",
    color: "#fff", // Light text color for better contrast
    fontSize: 14,
    marginBottom: 4,
  },
  creatorRole: {
    textAlign: "center",
    color: "#fff", // Light text color for better contrast
    fontSize: 14,
  },
  thankYouCard: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
    backgroundColor: "rgba(85, 85, 85, 0.5)",
    elevation: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },
  thankYouTitle: {
    fontSize: 48,
    textAlign: "center",
    color: "#fff",
    fontFamily: "Danfo",
    marginBottom: 10,
  },
  thankYouMessage: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
