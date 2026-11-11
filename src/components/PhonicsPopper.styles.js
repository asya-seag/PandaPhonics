import { StyleSheet } from "react-native";

export default StyleSheet.create({
  touchArea: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 48,
    minHeight: 48,
  },

  outerRing: {
    backgroundColor: "#D66A13",
    padding: 4,
    elevation: 3,
    shadowColor: "#8B4000",
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },

  bubble: {
    flex: 1,
    backgroundColor: "#FF8900",
    borderWidth: 2,
    borderColor: "#FFB347",
    alignItems: "center",
    justifyContent: "center",
  },

  poppedBubble: {
    backgroundColor: "#B84D0D",
    borderWidth: 5,
    borderColor: "#EAA14C",
  },

  highlight: {
    position: "absolute",
    top: "17%",
    left: "22%",
    width: "40%",
    height: "14%",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 20,
    transform: [{ rotate: "-20deg" }],
  },

  innerShadow: {
    width: "58%",
    height: "58%",
    borderRadius: 100,
    backgroundColor: "rgba(100,35,0,0.15)",
  },
});