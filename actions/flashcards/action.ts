import { supabase } from "@/utils/supabase";
import { PostgrestError } from "@supabase/supabase-js";

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
};

export const getFlashcardsByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("user_id", userId);
  return { data, error };
};

export const getFlashcardsByCollectionId = async (
  collectionId: string,
): Promise<{
  data: Flashcard[] | null;
  error: PostgrestError | null;
}> => {
  const { data, error } = await supabase
    .from("flashcards_collections")
    .select("flashcard_id")
    .eq("collection_id", collectionId);

  if (error) {
    return { data: null, error };
  }

  const flashcardIds = data?.map((item) => item.flashcard_id);

  if (!flashcardIds) {
    return { data: null, error: null };
  }

  const { data: flashcards, error: flashcardsError } = await supabase
    .from("flashcards")
    .select("*")
    .in("id", flashcardIds);

  return { data: flashcards, error: flashcardsError };
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
