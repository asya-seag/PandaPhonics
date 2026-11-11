import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    width: 180,
    height: 180,
    borderRadius: 30,
    backgroundColor: "#EDD180",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 25,
    paddingBottom: 18,
  },

  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: 100,
    height: 100,
  },

  label: {
    fontSize: 20,
    fontWeight: "600",
  },
});