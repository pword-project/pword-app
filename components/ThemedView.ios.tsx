import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );
  const { bottom, top, left, right } = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          backgroundColor,
          paddingBottom: bottom,
          paddingTop: top,
          paddingRight: right,
          paddingLeft: left,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
