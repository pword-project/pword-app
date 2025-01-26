import { Collection } from "@/types/Collections";
import { FlashcardsCollection } from "@/types/FlashcardsCollections";
import { supabase } from "@/utils/supabase";
import { PostgrestError } from "@supabase/supabase-js";

export async function getCollectionsByUserId(userId: string): Promise<{
  data: Collection[] | null;
  error: PostgrestError | null;
}> {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("user_id", userId);
  return { data, error };
}

export async function getCollectionByFlashcardId(flashcardId: string): Promise<{
  data: FlashcardsCollection[] | null;
  error: PostgrestError | null;
}> {
  const { data, error } = await supabase
    .from("flashcards_collections")
    .select("*")
    .eq("flashcard_id", flashcardId);

  return { data, error };
}

export async function createCollection(
  collection: Omit<Collection, "id" | "created_at">,
): Promise<{ data: Collection[] | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("collections")
    .insert([collection])
    .select("*");
  return { data, error };
}

export async function deleteCollection(collectionId: string) {
  const { error } = await supabase
    .from("collections")
    .delete()
    .eq("id", collectionId);
  return { error };
}

export async function linkFlashcardToCollection(
  flashcardId: string,
  collectionId: string,
) {
  const { error } = await supabase
    .from("flashcards_collections")
    .insert([{ flashcard_id: flashcardId, collection_id: collectionId }]);
  return { error };
}

export async function updateFlashcardCollection(
  flashcardId: string,
  collectionId: string,
) {
  const { error } = await deleteCollectionByFlashcardId(flashcardId);
  if (error) {
    return { error };
  }

  const linkResponse = await linkFlashcardToCollection(
    flashcardId,
    collectionId,
  );
  return { error: linkResponse.error };
}

export async function deleteCollectionByFlashcardId(flashcardId: string) {
  const { error } = await supabase
    .from("flashcards_collections")
    .delete()
    .eq("flashcard_id", flashcardId);
  return { error };
}
