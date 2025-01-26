import React, { PropsWithChildren } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, ScrollViewProps, StyleSheet } from "react-native";
import { ThemedScrollView } from "./ThemedScrollView";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = PropsWithChildren & ScrollViewProps;

const Screen = ({ children, style, ...rest }: Props) => {
  const { top, bottom, left, right } = useSafeAreaInsets();
  const styles = getStyles({ top, bottom, left, right });
  const { logout, session } = useAuth();
  const router = useRouter();
  const errorColor = useThemeColor({}, "error");

  return (
    <ThemedScrollView
      keyboardShouldPersistTaps="handled"
      style={[styles.screen, style]}
      {...rest}
    >
      <ThemedView
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            router.push("/home");
          }}
        >
          <ThemedText type="logo">Pword</ThemedText>
        </Pressable>

        {session && (
          <Pressable
            onPress={async () => {
              await logout();
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
            }}
          >
            <ThemedText
              style={{
                color: errorColor,
              }}
            >
              logout
            </ThemedText>
            <AntDesign name="logout" size={24} color={errorColor} />
          </Pressable>
        )}
      </ThemedView>
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
    },
  });

export default Screen;
