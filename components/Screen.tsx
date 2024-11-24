import React, { PropsWithChildren } from "react";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollViewProps, StyleSheet } from "react-native";
import { ThemedScrollView } from "./ThemedScrollView";

type Props = PropsWithChildren & ScrollViewProps;

const Screen = ({ children, style, ...rest }: Props) => {
  const { top, bottom, left, right } = useSafeAreaInsets();
  const styles = getStyles({ top, bottom, left, right });

  return (
    <ThemedScrollView keyboardShouldPersistTaps='handled' style={[styles.screen, style]} {...rest}>
      {children}
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
  });

export default Screen;
