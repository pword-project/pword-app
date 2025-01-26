/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#fff";
const tintColorDark = "#fff";

const Shared = {
  primaryLogoBlue: "#b4befe",
};

export const Colors = {
  light: {
    ...Shared,
    text: "#ECEDEE",
    placeholder: "#9BA1A6",
    background: "#151718",
    tint: tintColorDark,
    error: "#e64553",
    success: "#00d3a2",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorLight,
  },
  dark: {
    ...Shared,
    text: "#ECEDEE",
    placeholder: "#9BA1A6",
    background: "#151718",
    tint: tintColorDark,
    error: "#e64553",
    success: "#00d3a2",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
