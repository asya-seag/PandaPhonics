import { View, Image, Pressable, ScrollView } from "react-native";
import { Alert, ActionSheetIOS } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Settings.styles"
import { OVERLAY_KEY, OVERLAY_COLOURS, } from "../hooks/useOverlayColour";
import LongPhonicsLevelButton from "../components/LongPhonicsLevelButton";

export default function Settings({ navigation }) {
    const handleOverlayColour = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                title: "Overlay colour",
                message: "Choose the background you find most comfortable.",
                options: [
                    "Cancel",
                    ...OVERLAY_COLOURS.map((colour) => colour.name),
                ],
                cancelButtonIndex: 0,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) return;

                const selected = OVERLAY_COLOURS[buttonIndex - 1];

                async function saveColour() {
                    try {
                        await AsyncStorage.setItem(
                            OVERLAY_KEY,
                            selected.value
                        );

                        Alert.alert(
                            "Overlay colour saved",
                            `${selected.name} will be used on both practice screens.`
                        );
                    } catch {
                        Alert.alert(
                            "Unable to save colour",
                            "Please try again."
                        );
                    }
                }

                saveColour();
            }
        );
    };

    const handleRemoveUser = async () => {
        try {
            const saved = await AsyncStorage.getItem("@pandaPhonics/users");
            const users = saved ? JSON.parse(saved) : [];

            if (!Array.isArray(users)) {
                throw new Error("Invalid saved users.");
            }

            if (users.length === 0) {
                Alert.alert(
                    "No user profiles",
                    "There are no saved users to remove."
                );
                return;
            }

            ActionSheetIOS.showActionSheetWithOptions(
                {
                    title: "Remove user profile",
                    message: "Choose the user you want to remove.",
                    options: ["Cancel", ...users.map((user) => user.name)],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) return;

                    const selectedUser = users[buttonIndex - 1];

                    Alert.alert(
                        "Remove user?",
                        `Remove "${selectedUser.name}"? This cannot be undone.`,
                        [
                            {
                                text: "Cancel",
                                style: "cancel",
                            },
                            {
                                text: "Remove",
                                style: "destructive",
                                onPress: async () => {
                                    try {
                                        // Read again so we update the latest saved list.
                                        const latestSaved =
                                            await AsyncStorage.getItem(
                                                "@pandaPhonics/users"
                                            );

                                        const latestUsers = latestSaved
                                            ? JSON.parse(latestSaved)
                                            : [];

                                        if (!Array.isArray(latestUsers)) {
                                            throw new Error("Invalid saved users.");
                                        }

                                        const remainingUsers = latestUsers.filter(
                                            (user) => user.id !== selectedUser.id
                                        );

                                        await AsyncStorage.setItem(
                                            "@pandaPhonics/users",
                                            JSON.stringify(remainingUsers)
                                        );

                                        Alert.alert(
                                            "User removed",
                                            `"${selectedUser.name}" has been removed.`
                                        );
                                    } catch {
                                        Alert.alert(
                                            "Unable to remove user",
                                            "Please try again."
                                        );
                                    }
                                },
                            },
                        ]
                    );
                }
            );
        } catch {
            Alert.alert(
                "Unable to load users",
                "Please try again."
            );
        }
    };
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
                <Image
                    source={require("../../assets/Home.png")}
                    style={styles.homeImage}
                    resizeMode="contain"
                />
            </Pressable>

            {/* Settings buttons */}
            <View style={styles.settingsArea}>
                <ScrollView
                    contentContainerStyle={styles.settingsContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <LongPhonicsLevelButton
                        label="Overlay colour"
                        onPress={handleOverlayColour}
                    />
                    <LongPhonicsLevelButton label="Card size" />
                    <LongPhonicsLevelButton label="Haptic feedback" />
                    <LongPhonicsLevelButton label="Background texture" />
                    <LongPhonicsLevelButton label="Remove user profile" onPress={handleRemoveUser} />
                </ScrollView>
            </View>

        </View>
    );
}

