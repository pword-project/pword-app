import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Screen from "@/components/Screen";

export default function AboutPage() {
  return (
    <Screen>
      <ThemedView style={styles.container}>
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
          way.
        </ThemedText>
        <ThemedText type="title" style={styles.subtitle}>
          Meet the Creators
        </ThemedText>
        <ScrollView style={styles.creatorsContainer}>
          <View style={styles.creatorCard}>
            <ThemedText style={styles.creatorName}>Carlos Jimenez</ThemedText>
            <ThemedText style={styles.creatorEmail}>
              cajimenezca@unal.edu.co
            </ThemedText>
          </View>
          <View style={styles.creatorCard}>
            <ThemedText style={styles.creatorName}>Brian Chaparro</ThemedText>
            <ThemedText style={styles.creatorEmail}>
              bchaparro@unal.edu.co
            </ThemedText>
          </View>
          <View style={styles.creatorCard}>
            <ThemedText style={styles.creatorName}>Sergio Lopez</ThemedText>
            <ThemedText style={styles.creatorEmail}>
              slopezpa@unal.edu.co
            </ThemedText>
          </View>
          <View style={styles.creatorCard}>
            <ThemedText style={styles.creatorName}>Santiago Gomez</ThemedText>
            <ThemedText style={styles.creatorEmail}>
              sjgomezg@unal.edu.co
            </ThemedText>
          </View>
        </ScrollView>
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
    textAlign: "center",
    color: "#fff", // Light text color for better contrast
  },
  subtitle: {
    marginTop: 32,
    marginBottom: 16,
    textAlign: "center",
    color: "#fff", // Light text color for better contrast
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
});
