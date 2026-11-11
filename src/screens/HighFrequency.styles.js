import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5D6",
        paddingTop: 25,
        paddingBottom: 20,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        gap: 10,
    },

    navigationButtons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    headerButton: {
        width: 64,
        height: 74,
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
    },

    headerImage: {
        width: 64,
        height: 64,
    },

    pandaButtons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    pandaButton: {
        width: 64,
        height: 74,
        alignItems: "center",
        justifyContent: "center",
    },

    pandaImage: {
        width: 64,
        height: 64,
    },

    progressText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: "center",
        color: "#71320F",
    },

    actionBadge: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        overflow: "hidden",
        textAlign: "center",
        lineHeight: 28,
        fontSize: 21,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    skipBadge: {
        backgroundColor: "#A63C32",
    },

    coveredBadge: {
        backgroundColor: "#35734C",
    },

    disabledButton: {
        opacity: 0.5,
    },

    practiceArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 30,
    },

    wordRow: {
        width: "100%",
        maxWidth: 650,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    wordFrame: {
        flex: 1,
        minHeight: 220,
        borderWidth: 3,
        borderColor: "#71320F",
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },

    wordText: {
        width: "100%",
        fontSize: 110,
        textAlign: "center",
        color: "#71320F",
    },

    speakerButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#EDD180",
        alignItems: "center",
        justifyContent: "center",
    },

    speakerIcon: {
        fontSize: 24,
    },

    summary: {
        width: "100%",
        maxWidth: 500,
        alignItems: "center",
        gap: 16,
    },

    summaryTitle: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        color: "#71320F",
    },

    message: {
        fontSize: 21,
        lineHeight: 30,
        color: "#71320F",
        textAlign: "center",
    },

    summaryNote: {
        fontSize: 17,
        lineHeight: 25,
        color: "#71320F",
        textAlign: "center",
    },

    returnButton: {
        marginTop: 10,
        minHeight: 52,
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 16,
        backgroundColor: "#EDD180",
    },

    returnButtonText: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        color: "#71320F",
    },
});