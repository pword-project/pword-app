import { supabase } from "@/utils/supabase";

type Flashcard = {
  id: string;
  word: string;
  definition: string;
  example: string;
  user_id: string;
};

// CRUD Operations

// Create
export const createFlashcard = async (flashcard: Omit<Flashcard, "id">) => {
  const response = await supabase
    .from("flashcards")
    .insert(flashcard)
    .select("*");
  return response;
};

// Read
export const getFlashcards = async () => {
  const { data, error } = await supabase.from("flashcards").select("*");
  return { data, error };
};

export const getFlashcardById = async (id: string) => {
  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("id", id);
  return { data: data?.[0], error };
}

export const getFlashcardsByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("user_id", userId);
  return { data, error };
};

// Update
export const updateFlashcard = async (
  id: string,
  updates: Partial<Flashcard>,
) => {
  const { data, error } = await supabase
    .from("flashcards")
    .update(updates)
    .eq("id", id)
    .select("*");
  return { data, error };
};

// Delete
export const deleteFlashcard = async (id: string) => {
  const { data, error } = await supabase
    .from("flashcards")
    .delete()
    .eq("id", id)
    .select("*");
  return { data, error };
};
