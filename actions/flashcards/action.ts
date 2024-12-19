import { supabase } from "@/utils/supabase";


type Flashcard = {
    id: string;
    word: string;
    definition: string;
    example: string;
    user_id: string;
  }

// CRUD Operations

// Create
export const createFlashcard = async (flashcard: Omit<Flashcard, 'id'>): Promise<Flashcard[]> => {
  const { data, error } = await supabase.from('flashcards').insert(flashcard).select('*');
  if (error) throw new Error(error.message);
  return data;
};

// Read
export const getFlashcards = async () => {
  const { data, error } = await supabase.from('flashcards').select('*');
  return {data, error};
};

// Update
export const updateFlashcard = async (id: string, updates: Partial<Flashcard>): Promise<Flashcard[]> => {
  const { data, error } = await supabase.from('flashcards').update(updates).eq('id', id).select('*');
  if (error) throw new Error(error.message);
  return data;
};

// Delete
export const deleteFlashcard = async (id: string): Promise<Flashcard[]> => {
  const { data, error } = await supabase.from('flashcards').delete().eq('id', id).select('*');
  if (error) throw new Error(error.message);
  return data;
};
