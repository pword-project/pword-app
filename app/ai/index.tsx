import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Screen from "@/components/Screen";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Pressable } from "react-native-gesture-handler";
import * as Clipboard from "expo-clipboard";
import { toast } from "@backpackapp-io/react-native-toast";

interface Message {
  text: string;
  sender: "user" | "bot";
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI ?? "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const { height } = useWindowDimensions();

  useEffect(() => {
    request("Hi!");

    // eslint-disable-next-line
  }, []);

  const request = async (prompt: string) => {
    setIsLoading(true);
    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, sender: "user" },
        { text: responseText, sender: "bot" },
      ]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error en la solicitud:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, sender: "user" },
        { text: "Error al obtener la respuesta.", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      request(message);
      setMessage("");
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <Screen>
      <ThemedView style={{ ...styles.container, height: height * 0.7 }}>
        <ThemedText style={styles.title}>Ask questions to AI</ThemedText>

        <ThemedView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu mensaje..."
            onChangeText={setMessage}
            value={message}
            multiline
          />
          {isLoading ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <TouchableOpacity onPress={handleSendMessage}>
              <Ionicons name="send" size={24} color="#007AFF" />
            </TouchableOpacity>
          )}
        </ThemedView>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollViewContent}
        >
          {messages.map((msg, index) => (
            <ThemedView
              key={index}
              style={
                msg.sender === "user" ? styles.userMessage : styles.botMessage
              }
            >
              <ThemedText style={styles.messageText}>{msg.text}</ThemedText>
              <Pressable
                onPress={async () => {
                  Clipboard.setStringAsync(msg.text);
                  if (Platform.OS === "web") {
                    alert("Copied to clipboard");
                  } else {
                    toast("Copied to clipboard");
                  }
                }}
              >
                {Platform.OS === "web" ? (
                  <ThemedText type="smallprint" style={styles.copyText}>
                    Copy
                  </ThemedText>
                ) : (
                  <IconSymbol
                    name="clipboard"
                    size={24}
                    color="#fff"
                    style={{ marginTop: 10 }}
                  />
                )}
              </Pressable>
            </ThemedView>
          ))}
        </ScrollView>
        <StatusBar style="auto" />
      </ThemedView>
      <ThemedView>
        <ThemedText style={styles.legalText}>
          Please note that while the AI strives to provide accurate and helpful
          responses, it may not always be correct. The answers generated are
          based on patterns and information available up to its training data,
          and it may not have the most current or comprehensive knowledge.
          Always verify critical information from reliable sources.
        </ThemedText>
      </ThemedView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingVertical: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 12,
    marginVertical: 5,
    maxWidth: "70%",
    alignItems: "flex-end",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#232324",
    borderRadius: 10,
    padding: 12,
    marginVertical: 5,
    maxWidth: "70%",
  },
  messageText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  legalText: {
    color: "#7f7f7f",
    fontSize: 14,
    fontWeight: "light",
    marginBottom: 10,
  },
  copyText: {
    marginTop: 10,
    color: "#ADD8E6",
    fontSize: 14,
    fontWeight: "light",
    marginBottom: 10,
  },
});
