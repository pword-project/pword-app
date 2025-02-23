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
    shadowColor: "rgb(180, 190, 254)",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 6,
    marginBottom: 20,
    maxWidth: Dimensions.get("screen")?.width * 0.85,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "rgb(21, 23, 24)",
    fontFamily: "Danfo",
    fontSize: 54,
    textAlign: "center",
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
