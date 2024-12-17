import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { ThemedView } from "@/components/ThemedView";

type FlashcardProps = {
  id: string;
  word: string;
  definition: string;
  expanded: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const initialFlashcards = [
  {
    id: '1',
    word: 'React',
    definition: 'A JavaScript library for building user interfaces.',
  },
  {
    id: '2',
    word: 'JavaScript',
    definition: 'A programming language that is commonly used for web development.',
  },
  {
    id: '3',
    word: 'Node.js',
    definition: 'A runtime environment that allows you to run JavaScript on the server side.',
  },
  {
    id: '4',
    word: 'React Native',
    definition: 'A framework for building native apps using React.',
  },
  {
    id: '5',
    word: 'TypeScript',
    definition: 'A strongly typed programming language that builds on JavaScript.',
  },
];

const Flashcard: React.FC<FlashcardProps> = ({ id, word, definition, expanded, onToggle, onDelete }) => {
  const [heightAnim] = useState(new Animated.Value(expanded ? 150 : 60));

  React.useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: expanded ? 150 : 60,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  return (
    <Animated.View style={[styles.card, { height: heightAnim }]}>
      <TouchableOpacity onPress={() => onToggle(id)} style={styles.cardContent}>
        <Text style={styles.word}>{word}</Text>
        {expanded && (
          <>
            <Text style={styles.definition}>{definition}</Text>            
            <View style={{flex:1,flexDirection:'row',alignItems:'flex-end'}}>
                <TouchableOpacity  style={styles.regenButton}>
                    <Text style={styles.deleteButtonText}>Regenerate</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
               
            </View>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const App = () => {
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  const handleDelete = (id: string) => {
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
    if (expandedCard === id) {
      setExpandedCard(null); // Collapse the card if it was expanded
    }
  };

  return (
    <ThemedView style={styles.container}>
      {flashcards.map((flashcard) => (
        <Flashcard
          key={flashcard.id}
          id={flashcard.id}
          word={flashcard.word}
          definition={flashcard.definition}
          expanded={flashcard.id === expandedCard}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    marginVertical: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  definition: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  regenButton:{
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 'auto',

  },
  deleteButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#ff4d4d',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
