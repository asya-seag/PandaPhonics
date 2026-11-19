import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: "#71320F",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#6B4423",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,
  },

  activeCard: {
    borderColor: "#FF8500",
    borderWidth: 4,
  },

  soundText: {
    color: "#71320F",
    fontFamily: "Lexend_400Regular",
    fontWeight: "700",
    textAlign: "center",
    includeFontPadding: false,
  },
});
