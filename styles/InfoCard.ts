import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const infoCardStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20,
    maxWidth: Dimensions.get("screen")?.width * 0.8,
  },
  title: {
    color: "rgb(21, 23, 24)",
    fontFamily: "Danfo",
    fontSize: 54,
  },
  paragraph: {
    textAlign: "center",
    color: "#333",
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: "rgb(21, 23, 24)",
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    backgroundColor: "rgb(21, 23, 24)",
    fontWeight: "bold",
  },
});

export default infoCardStyles;
