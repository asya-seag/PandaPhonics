import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#A5F7F1",
    },

    backgroundLayer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    backgroundImage: {
        width: "100%",
        height: "100%",
        opacity: 0.12,
    },

    logo: {
        position: "absolute",
        top: 25,
        left: 40,
        width: 190,
        height: 70,
    },

    settingsButton: {
        position: "absolute",
        top: 25,
        right: 40,
        width: 70,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },

    settingsImage: {
        width: 60,
        height: 60,
    },

    usersContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
    },
});