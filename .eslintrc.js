// https://docs.expo.dev/guides/using-eslint/
// eslint-disable-next-line
module.exports = {
  extends: "expo",
  ignorePatterns: ["/dist/*"],
  rules: {
    "react-native/no-inline-styles": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "no-unused-vars": "error",
    "no-undef": "warn",
    "no-console": "warn",
    "no-debugger": "warn",
  },
};
