import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { PropsWithChildren } from "react";
import { useFonts } from "expo-font";
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_900Black } from "@expo-google-fonts/poppins";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "smallprint";
} & PropsWithChildren;

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  children,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "smallprint" ? styles.smallprint : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  defaultSemiBold: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  link: {
    fontSize: 16,
    color: "#0a7ea4",
    fontFamily: "Poppins_400Regular",
  },
  smallprint: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
});
