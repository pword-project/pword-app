import React, { PropsWithChildren } from "react";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollViewProps, StyleSheet } from "react-native";
import { ThemedScrollView } from "./ThemedScrollView";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type Props = PropsWithChildren & ScrollViewProps;

const Screen = ({ children, style, ...rest }: Props) => {
  const { top, bottom, left, right } = useSafeAreaInsets();
  const styles = getStyles({ top, bottom, left, right });

  return (
    <ThemedScrollView
      keyboardShouldPersistTaps="handled"
      style={[styles.screen, style]}
      {...rest}
    >
      <ThemedText type="logo">Pword</ThemedText>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ThemedScrollView>
  );
};

const getStyles = ({ top, right, left, bottom }: EdgeInsets) =>
  StyleSheet.create({
    screen: {
      paddingTop: top + 8,
      paddingRight: right + 8,
      paddingLeft: left + 16,
      paddingBottom: bottom + 16,
      minHeight: "100%",
    },
    content: {
      width: "100%",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default Screen;
