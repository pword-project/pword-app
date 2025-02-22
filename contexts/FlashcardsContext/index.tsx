import {
  createCollection as createCollectionAction,
  deleteCollection as deleteCollectionAction,
  getCollectionsByUserId,
  linkFlashcardToCollection,
} from "@/actions/collections/action";
import {
  createFlashcard as createFlashcardAction,
  deleteFlashcard as deleteFlashcardAction,
  getFlashcardsByCollectionId,
  getFlashcardsByUserId,
} from "@/actions/flashcards/action";
import { Collection } from "@/types/Collections";
import { Flashcard } from "@/types/Flashcard";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../AuthContext";

type Context = {
  flashcards: Flashcard[];
  createFlashcard: (
    flashcard: Partial<Flashcard>,
    collection: Collection | null,
  ) => Promise<{
    error: boolean;
  }>;
  deleteFlashcard: (flashcard: Flashcard) => Promise<void>;
  collections: Collection[];
  collection: Collection | null;
  setCollection: (collection: Collection | null) => void;
  createCollection: (collection: Partial<Collection>) => Promise<{
    error: boolean;
  }>;
  deleteCollection: (collection: Collection) => Promise<void>;
  loading: boolean;
};

const FlashCardsContext = createContext<Context>({} as Context);

export const FlashCardsProvider = ({ children }: PropsWithChildren) => {
  const { session } = useAuth();

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchFlashcards() {
    setLoading(true);
    const flashcards = await getFlashcardsByUserId(
      session?.user.id ?? "no-user-id",
    );

    if (flashcards.error) {
      return;
    }

    setFlashcards(flashcards.data ?? []);
    setLoading(false);
  }

  async function fetchCollections() {
    setLoading(true);
    const { data, error } = await getCollectionsByUserId(
      session?.user.id ?? "no-user-id",
    );

    if (error) {
      return;
    }

    setCollections(data ?? []);
    setLoading(false);
  }

  async function fetchFlashcardsByCollectionId(collectionId: string) {
    setLoading(true);
    const { data: flashcards, error } =
      await getFlashcardsByCollectionId(collectionId);

    if (error) {
      return;
    }

    setFlashcards(flashcards ?? []);
    setLoading(false);
  }

  async function deleteFlashcard(flashcard: Flashcard) {
    const response = await deleteFlashcardAction(flashcard.id);
    if (response.error) {
      return;
    }
    setFlashcards((prev) => prev.filter((fc) => fc.id !== flashcard.id));
  }

  async function createFlashcard(
    values: Partial<Flashcard>,
    collection: Collection | null,
  ): Promise<{
    error: boolean;
  }> {
    if (!values.word || !values.definition || !values.example)
      return { error: true };

    const response = await createFlashcardAction({
      word: values.word,
      definition: values.definition,
      example: values.example,
      user_id: session?.user.id ?? "no-user-id",
    });

    const flashcard = response.data?.at(0);
    if (collection && flashcard) {
      await linkFlashcardToCollection(flashcard.id, collection.id);
    }

    return {
      error: Boolean(response.error),
    };
  }

  async function createCollection(values: Partial<Collection>): Promise<{
    error: boolean;
  }> {
    if (!values.name) return { error: true };

    const { data, error } = await createCollectionAction({
      name: values.name,
      user_id: session?.user.id ?? "no-user-id",
    });

    if (data && data.length > 0) {
      setCollections((prev) => [...prev, ...data]);
    }

    return {
      error: Boolean(error),
    };
  }

  async function deleteCollection(collection: Collection) {
    await deleteCollectionAction(collection.id);
    setCollections((prev) => prev.filter((c) => c.id !== collection.id));
  }

  useEffect(() => {
    fetchCollections();

    if (selectedCollection) {
      fetchFlashcardsByCollectionId(selectedCollection.id);
    } else {
      fetchFlashcards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, selectedCollection]);

  return (
    <FlashCardsContext.Provider
      value={{
        flashcards,
        createFlashcard,
        deleteFlashcard,
        collections,
        collection: selectedCollection,
        setCollection: setSelectedCollection,
        createCollection,
        deleteCollection,
        loading,
      }}
    >
      {children}
    </FlashCardsContext.Provider>
  );
};

export const useFlashcards = () => {
  const context = useContext(FlashCardsContext);

  if (!context) {
    throw new Error("useFlashcards must be used within a FlashCardsProvider");
  }

  return context;
};
