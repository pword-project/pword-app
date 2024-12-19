import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { getFlashcards } from '@/actions/flashcards/action';

type FlashcardProps = {
  id: string;
  word: string;
  definition: string;
  expanded: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

type Card = {
  id: string;
  word: string;
  definition: string;
  example: string;
  user_id: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ id, word, definition, expanded, onToggle, onDelete }) => {
  const [heightAnim] = useState(new Animated.Value(expanded ? 150 : 60));

  useEffect(() => {
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

  const [flashcards, setFlashcards] = useState<Array<Card>>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  const handleDelete = (id: string) => {
    setFlashcards((prev) => prev?.filter((card) => card?.id !== id));
    if (expandedCard === id) {
      setExpandedCard(null); // Collapse the card if it was expanded
    }
  };

  useEffect(()=>{
    getFlashcards().then((response)=>{
      console.log(response)
      setFlashcards(response.data as Array<Card>)
    })
  },[])

  if (!flashcards.length){
    return <View>
      <Text>
        LOADING !!!!!
      </Text>
    </View> 
  }
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
