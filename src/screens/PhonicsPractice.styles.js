import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5D6",
  },

  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    opacity: 0.035,
  },

  topLeftButtons: {
    position: "absolute",
    top: 25,
    left: 40,
    flexDirection: "row",
    gap: 14,
    zIndex: 10,
  },

  headerButton: {
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
  },

  homeImage: {
    width: 60,
    height: 60,
  },

  settingsImage: {
    width: 60,
    height: 60,
  },


  pandaButtons: {
    position: "absolute",
    top: 20,
    right: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    zIndex: 10,
  },

  pandaButton: {
    width: 78,
    height: 78,
    alignItems: "center",
    justifyContent: "center",
  },

  pandaImage: {
    width: "100%",
    height: "100%",
  },


  practiceArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 110,
  },


  progressText: {
    fontSize: 17,
    color: "#71320F",
    marginBottom: 25,
  },

  cardsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  cardColumn: {
    alignItems: "center",
    gap: 20,
  },

  errorText: {
    fontSize: 22,
    color: "#71320F",
    textAlign: "center",
    marginTop: 100,
  },

  backButton: {
    alignSelf: "center",
    padding: 15,
    marginTop: 20,
    backgroundColor: "#FF8500",
    borderRadius: 15,
  },

  backButtonText: {
    color: "#71320F",
    fontSize: 18,
    fontWeight: "700",
  },
  
});
