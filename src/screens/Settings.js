import React from "react";
import { View, Image, Pressable, Text, StyleSheet, ScrollView } from "react-native";

import LongPhonicsLevelButton from "../components/LongPhonicsLevelButton";

export default function Settings({ navigation }) {
    
    return (
        <View style={styles.container}>

            {/* Leaf background */}
            <View style={styles.backgroundLayer}>
                <Image
                    source={require("../../assets/leafOverlay.jpg")}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />
            </View>

            {/* Panda logo */}
            <Image
                source={require("../../assets/logoName.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Home button */}
            <Pressable
                style={styles.homeButton}
                onPress={() => navigation.navigate("HomeLanding")}
            >
                <Text style={styles.homeIcon}>🏠</Text>
            </Pressable>

            {/* Settings buttons */}
            <View style={styles.settingsArea}>
                <ScrollView
                    contentContainerStyle={styles.settingsContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <LongPhonicsLevelButton label="Overlay colour" />
                    <LongPhonicsLevelButton label="Card size" />
                    <LongPhonicsLevelButton label="Haptic feedback" />
                    <LongPhonicsLevelButton label="Background texture" />
                    <LongPhonicsLevelButton label="Remove user profile" />
                </ScrollView>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
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

    homeButton: {
        position: "absolute",
        top: 25,
        right: 40,
        width: 70,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },

    homeIcon: {
        fontSize: 38,
    },

    settingsArea: {
        flex: 1,
        marginTop: 100,
    },

    settingsContainer: {
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 30,
        gap: 15,
    },
});