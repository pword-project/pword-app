import React from "react";
import { ThemedText } from "./ThemedText";
import { Pressable } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Collection } from "@/types/Collections";

type Props = {
  collection: Collection;
  selected: boolean;
  handlePress: () => void;
};

const CollectionPill = ({ collection, selected, handlePress }: Props) => {
  const logoColor = useThemeColor({}, "primaryLogoBlue");

  return (
    <Pressable
      onPress={() => handlePress()}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        minWidth: 100,
        borderRadius: 8,
        borderWidth: 2,
        marginRight: 8,
        borderColor: logoColor,
        gap: 8,
        backgroundColor: selected ? logoColor : "transparent",
      }}
    >
      <ThemedText style={{
        fontWeight: "bold",
      }}>{collection.name}</ThemedText>
    </Pressable>
  );
};

export default CollectionPill;
