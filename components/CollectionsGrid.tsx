import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import CollectionPill from "./CollectionPill";
import { Collection } from "@/types/Collections";

type Props = {
  collections: Collection[];
  collection: Collection | null;
  handlePress: (col: Collection) => void;
};

const CollectionsGrid = ({ collections, collection, handlePress }: Props) => {
  if (!collections || collections.length === 0) return null;

  return (
    <ScrollView
      horizontal={true}
      style={{
        marginBottom: 16,
      }}
    >
      {[...collections].map((col) => {
        return (
          <CollectionPill
            key={col.id}
            collection={col}
            selected={collection?.id === col.id}
            handlePress={() => handlePress(col)}
          />
        );
      })}
    </ScrollView>
  );
};

export default CollectionsGrid;
