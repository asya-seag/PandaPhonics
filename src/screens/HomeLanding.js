import React from "react";
import { View, Image, Pressable, Text, StyleSheet } from "react-native";

import RoundedButton from "../components/RoundedButton";

export default function HomeLanding({ navigation }) {
    const userCount = 3;

    return (
        <View style={styles.container}>

            <View style={styles.backgroundLayer}>
                <Image
                    source={require("../../assets/leafOverlay.jpg")}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />
            </View>

            {/* Panda Phonics logo */}
            <Image
                source={require("../../assets/logoName.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Settings button */}
            <Pressable
                style={styles.settingsButton}
                onPress={() => navigation.navigate("Settings")}
            >
                <Text style={styles.settingsIcon}>⚙</Text>
            </Pressable>

            {/* Add User button */}
            <View style={styles.usersContainer}>

                {userCount >= 1 && (
                    <RoundedButton label="User 1" icon={require("../../assets/Trumpet.png")}/>
                )}

                {userCount >= 2 && (
                    <RoundedButton label="User 2" icon={require("../../assets/Explorer.png")}/>
                )}

                {userCount >= 3 && (
                    <RoundedButton label="User 3" icon={require("../../assets/PartyHat.png")}/>
                )}

                {userCount < 3 && (
                    <RoundedButton
                        label="Add User"
                        isAddButton={true}
                        icon={require("../../assets/Sunglasses.png")}
                    />
                )}

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

    settingsIcon: {
        fontSize: 35,
    },

    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
