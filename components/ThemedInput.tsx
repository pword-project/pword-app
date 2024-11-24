import { Pressable, StyleSheet, TextInput, TextInputProps } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useState } from "react";

export type Props = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  secureTextEntry?: boolean | undefined;
  error?: string;
  label: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  error,
  label,
  secureTextEntry,
  ...otherProps
}: Props) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text",
  );

  const [showPassword, setShowPassword] = useState(false);

  const placeholder = useThemeColor({}, "placeholder");

  const errorColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "error",
  );

  return (
    <ThemedView>
      <ThemedText type="default">{label}</ThemedText>

      <ThemedView
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <TextInput
          placeholderTextColor={placeholder}
          style={[
            { backgroundColor },
            { flex: 1 },
            style,
            styles.input,
            {
              borderColor: error ? "red" : "transparent",
              borderWidth: error ? 1 : 0,
            },
          ]}
          secureTextEntry={secureTextEntry && !showPassword}
          {...otherProps}
        />
        {secureTextEntry ? (
          <Pressable
            style={[
              {
                backgroundColor: textColor,
                height: 40,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
              styles.input,
            ]}
          >
            {showPassword ? (
              <EyeSlashIcon
                size={24}
                color={backgroundColor}
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <EyeIcon
                size={24}
                color={backgroundColor}
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
              />
            )}
          </Pressable>
        ) : null}
      </ThemedView>

      {error ? (
        <ThemedText
          type="smallprint"
          style={{
            color: errorColor,
            marginTop: 4,
          }}
        >
          {error}
        </ThemedText>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 8,
    borderRadius: 4,
  },
});
