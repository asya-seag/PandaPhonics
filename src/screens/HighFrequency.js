import { useEffect, useRef, useState } from "react";
import { View, Text, Image, Pressable, Alert, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./HighFrequency.styles";
import highFrequencyData from "../data/highFrequencyWords.json";
import useOverlayColour from "../hooks/useOverlayColour";
import * as Speech from "expo-speech";

const USERS_KEY = "@pandaPhonics/users";
const SESSION_SIZE = 20;
const ALL_WORDS = highFrequencyData.words;

function getCoveredIds(user) {
    const savedIds = user.coveredHighFrequencyWordIds ?? [];

    if (!Array.isArray(savedIds)) {
        throw new Error("Invalid saved word progress.");
    }

    const validIds = new Set(ALL_WORDS.map((word) => word.id));

    return [...new Set(savedIds.filter((id) => validIds.has(id)))];
}

// Read and validate saved profiles in one place.
async function loadUsers() {
    const saved = await AsyncStorage.getItem(USERS_KEY);
    const users = saved ? JSON.parse(saved) : [];

    if (!Array.isArray(users)) {
        throw new Error("Unable to read saved users.");
    }

    return users;
}

function findUser(users, userId) {
    const user = users.find((profile) => profile.id === userId);

    if (!user) {
        throw new Error(
            "This profile is no longer available. Please return home."
        );
    }

    return user;
}

async function loadUser(userId) {
    const users = await loadUsers();
    return findUser(users, userId);
}

// Reload profiles before saving so other saved profile fields are preserved.
async function saveCoveredWord(userId, wordId) {
    const users = await loadUsers();
    const user = findUser(users, userId);
    const coveredIds = getCoveredIds(user);
    const alreadyCovered = coveredIds.includes(wordId);
    const updatedIds = alreadyCovered
        ? coveredIds
        : [...coveredIds, wordId];

    const updatedUsers = users.map((profile) =>
        profile.id === userId
            ? { ...profile, coveredHighFrequencyWordIds: updatedIds }
            : profile
    );

    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    return { updatedIds, alreadyCovered };
}

export default function HighFrequency({ navigation, route }) {
    const overlayColour = useOverlayColour();
    const { userId } = route.params;

    const [sessionWords, setSessionWords] = useState([]);
    const [wordIndex, setWordIndex] = useState(0);
    const [coveredCount, setCoveredCount] = useState(0);
    const [sessionCovered, setSessionCovered] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [saving, setSaving] = useState(false);
    const [finished, setFinished] = useState(false);

    const actionInProgress = useRef(false);

    useEffect(() => {
        let active = true;

        async function loadSession() {
            setLoading(true);
            setLoadError("");
            setFinished(false);
            setWordIndex(0);
            setSessionCovered(0);
            setSessionWords([]);
            setCoveredCount(0);

            try {
                const user = await loadUser(userId);
                const coveredIds = getCoveredIds(user);
                const coveredSet = new Set(coveredIds);

                const uncoveredWords = ALL_WORDS.filter(
                    (word) => !coveredSet.has(word.id)
                );

                const selectedWords = uncoveredWords.slice(
                    0,
                    SESSION_SIZE
                );

                if (active) {
                    setCoveredCount(coveredIds.length);
                    setSessionWords(selectedWords);
                }
            } catch (error) {
                if (active) {
                    const message =
                        error.message || "Unable to load this session.";

                    setLoadError(message);
                    Alert.alert("Unable to load words", message, [
                        {
                            text: "Return home",
                            onPress: () => navigation.navigate("HomeLanding"),
                        },
                    ], { cancelable: false });
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadSession();

        return () => {
            active = false;
        };
    }, [userId, navigation]);

    const currentWord = sessionWords[wordIndex];

    const practising =
        !loading &&
        !loadError &&
        sessionWords.length > 0 &&
        !finished;

    const returnToLevels = () => {
        navigation.navigate("PhonicsLevels", { userId });
    };

    const playWordAudio = async () =>  {
        if (!currentWord || !practising) return;

        try {
            await Speech.stop();

            Speech.speak(currentWord.text, {
                language: "en-GB",
                rate: 0.8,
                pitch: 1,
                onError: () => {
                    Alert.alert("Unable to play word", "Please try again.");
                },
            });
        } catch {
            Alert.alert("Unable to play word", "Please try again.");
        }
    };

    const advanceWord = () => {
        if (wordIndex >= sessionWords.length - 1) {
            setFinished(true);
        } else {
            setWordIndex((current) => current + 1);
        }
    };

    const skipWord = () => {
        if (actionInProgress.current || !currentWord || finished) {
            return;
        }

        actionInProgress.current = true;
        advanceWord();
    };

    const markWordCovered = async () => {
        if (actionInProgress.current || !currentWord || finished) {
            return;
        }

        actionInProgress.current = true;
        setSaving(true);

        try {
            const { updatedIds, alreadyCovered } = await saveCoveredWord(
                userId,
                currentWord.id
            );

            setCoveredCount(updatedIds.length);

            if (!alreadyCovered) {
                setSessionCovered((current) => current + 1);
            }

            advanceWord();
        } catch (error) {
            actionInProgress.current = false;

            Alert.alert(
                "Progress not saved",
                error.message || "Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        actionInProgress.current = false;
    }, [wordIndex, finished, userId]);

    let content;

    if (loading) {
        content = (
            <Text style={styles.message}>Loading words…</Text>
        );
    } else if (loadError) {
        content = <Text style={styles.message}>{loadError}</Text>;
    } else if (sessionWords.length === 0) {
        content = (
            <View style={styles.summary}>
                <Text style={styles.summaryTitle}>Well done!</Text>

                <Text style={styles.message}>
                    You have covered all {ALL_WORDS.length} words.
                </Text>

                <Pressable
                    style={styles.returnButton}
                    onPress={returnToLevels}
                >
                    <Text style={styles.returnButtonText}>
                        Back to levels
                    </Text>
                </Pressable>
            </View>
        );
    } else if (finished) {
        content = (
            <View style={styles.summary}>
                <Text style={styles.summaryTitle}>
                    Session complete!
                </Text>

                <Text style={styles.message}>
                    You covered {sessionCovered} new{" "}
                    {sessionCovered === 1 ? "word" : "words"}.
                </Text>

                <Text style={styles.message}>
                    {coveredCount} of {ALL_WORDS.length} words covered.
                </Text>

                <Pressable
                    style={styles.returnButton}
                    onPress={returnToLevels}
                >
                    <Text style={styles.returnButtonText}>
                        Back to levels
                    </Text>
                </Pressable>
            </View>
        );
    } else {
        content = (
            <View style={styles.wordRow}>
                <View style={styles.wordFrame}>
                    <Text
                        style={styles.wordText}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        {currentWord.text}
                    </Text>
                </View>

                <Pressable
                    style={styles.speakerButton}
                    onPress={playWordAudio}
                    accessibilityRole="button"
                    accessibilityLabel={`Hear ${currentWord.text}`}
                >
                    <Text style={styles.speakerIcon}>🔊</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: overlayColour },
            ]}
        >
            <View style={styles.header}>
                {/* Home and Settings */}
                <View style={styles.navigationButtons}>
                    <Pressable
                        style={styles.headerButton}
                        disabled={saving}
                        onPress={() => navigation.navigate("HomeLanding")}
                        accessibilityRole="button"
                        accessibilityLabel="Home"
                    >
                        <Image
                            source={require("../../assets/Home.png")}
                            style={styles.headerImage}
                            resizeMode="contain"
                        />
                    </Pressable>

                    <Pressable
                        style={styles.headerButton}
                        disabled={saving}
                        onPress={() =>
                            navigation.navigate("Settings", { userId })
                        }
                        accessibilityRole="button"
                        accessibilityLabel="Settings"
                    >
                        <Image
                            source={require("../../assets/Settings.png")}
                            style={styles.headerImage}
                            resizeMode="contain"
                        />
                    </Pressable>
                </View>

                {/* Word count and panda actions */}
                {practising && (
                    <View style={styles.pandaButtons}>
                        <Text style={styles.progressText}>
                            {`Word ${wordIndex + 1} of ${sessionWords.length}`}
                            {"\n"}
                            {coveredCount} / {ALL_WORDS.length} covered
                        </Text>

                        <Pressable
                            style={[
                                styles.pandaButton,
                                saving && styles.disabledButton,
                            ]}
                            onPress={skipWord}
                            disabled={saving}
                            accessibilityRole="button"
                            accessibilityLabel="Skip word without marking it covered"
                        >
                            <Image
                                source={require("../../assets/PandaOoops.png")}
                                style={styles.pandaImage}
                                resizeMode="contain"
                            />

                            <Text
                                style={[
                                    styles.actionBadge,
                                    styles.skipBadge,
                                ]}
                            >
                                ✕
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.pandaButton,
                                saving && styles.disabledButton,
                            ]}
                            onPress={markWordCovered}
                            disabled={saving}
                            accessibilityRole="button"
                            accessibilityLabel="Mark word covered and continue"
                        >
                            <Image
                                source={require("../../assets/PandaNext.png")}
                                style={styles.pandaImage}
                                resizeMode="contain"
                            />

                            <Text
                                style={[
                                    styles.actionBadge,
                                    styles.coveredBadge,
                                ]}
                            >
                                ✓
                            </Text>
                        </Pressable>
                    </View>
                )}
            </View>

            {/* Main area — no scrolling */}
            <View style={styles.practiceArea}>
                {content}
            </View>
        </View>
    );
}
