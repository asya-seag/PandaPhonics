import React from "react";
import { View, Image, Pressable, Text, StyleSheet, ScrollView } from "react-native";

import LongPhonicsLevelButton from "../components/LongPhonicsLevelButton";

export default function PhonicsLevels({ navigation }) {
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

            {/* level buttons */}
            <View style={styles.levelsArea}>
                <ScrollView
                    contentContainerStyle={styles.levelsContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <LongPhonicsLevelButton label="Level 1: s, a, t, p, i, n" />
                    <LongPhonicsLevelButton label="Level 2: ck, e, h, r, m, d" />
                    <LongPhonicsLevelButton label="Level 3: g, o, u, l, f, b" />
                    <LongPhonicsLevelButton label="Level 4: ai, j, oa, ie, ee/or" />
                    <LongPhonicsLevelButton label="Level 5: z, w, ng, v, oo" />
                    <LongPhonicsLevelButton label="Level 6: y, x, ch, sh, th" />
                    <LongPhonicsLevelButton label="Level 7: qu, ou, oi, ue, er, ar" />
                    <LongPhonicsLevelButton label="High Frequency Words" />
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

    levelsArea: {
        flex: 1,
        marginTop: 100,
    },

    levelsContainer: {
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 30,
        gap: 15,
    },
});