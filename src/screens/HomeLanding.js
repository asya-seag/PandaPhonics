import { useEffect, useRef, useState } from "react";
import { View, Image, Pressable, Alert, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./HomeLanding.styles";
import RoundedButton from "../components/RoundedButton";

const USERS_KEY = "@pandaPhonics/users";

export default function HomeLanding({ navigation }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadFailed, setLoadFailed] = useState(false);

    const addingUser = useRef(false);
    const userCount = users.length;

    useEffect(() => {
        let active = true;

        async function loadUsers() {
            try {
                const saved = await AsyncStorage.getItem(USERS_KEY);
                const savedUsers = saved ? JSON.parse(saved) : [];

                if (
                    !Array.isArray(savedUsers) ||
                    savedUsers.length > 3 ||
                    !savedUsers.every(
                        (user) =>
                            user &&
                            typeof user.id === "string" &&
                            typeof user.name === "string"
                    )
                ) {
                    throw new Error("Invalid saved users.");
                }

                if (active) {
                    setUsers(savedUsers);
                }
            } catch {
                if (active) {
                    setLoadFailed(true);

                    Alert.alert(
                        "Unable to load users",
                        "Please restart the app to try again."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadUsers();

        return () => {
            active = false;
        };
    }, []);

    const handleAddUser = () => {
        if (loading) {
            Alert.alert(
                "Loading users",
                "Please wait a moment and try again."
            );
            return;
        }

        if (loadFailed) {
            Alert.alert(
                "Unable to load users",
                "Please restart the app before adding a user."
            );
            return;
        }

        if (addingUser.current || userCount >= 3) {
            return;
        }

        addingUser.current = true;

        Alert.prompt(
            "Add User",
            "Enter a username, up to 20 characters.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => {
                        addingUser.current = false;
                    },
                },
                {
                    text: "Add",
                    onPress: async (value) => {
                        try {
                            const name = (value ?? "").trim();

                            if (!name) {
                                Alert.alert(
                                    "Username required",
                                    "Please enter a username."
                                );
                                return;
                            }

                            if (name.length > 20) {
                                Alert.alert(
                                    "Username too long",
                                    "Please use 20 characters or fewer."
                                );
                                return;
                            }

                            const alreadyExists = users.some(
                                (user) =>
                                    user.name.toLowerCase() ===
                                    name.toLowerCase()
                            );

                            if (alreadyExists) {
                                Alert.alert(
                                    "Username already exists",
                                    "Please choose a different username."
                                );
                                return;
                            }

                            const newUser = {
                                id: `${Date.now()}-${Math.random()
                                    .toString(36)
                                    .slice(2)}`,
                                name,
                            };

                            const updatedUsers = [...users, newUser];

                            await AsyncStorage.setItem(
                                USERS_KEY,
                                JSON.stringify(updatedUsers)
                            );

                            setUsers(updatedUsers);
                        } catch {
                            Alert.alert(
                                "Unable to save user",
                                "Please try again."
                            );
                        } finally {
                            addingUser.current = false;
                        }
                    },
                },
            ],
            "plain-text"
        );
    };

    const selectUser = (user) => {
        navigation.navigate("PhonicsLevels", {
            userId: user.id,
        });
    };

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
                <Image
                    source={require("../../assets/Settings.png")}
                    style={styles.settingsImage}
                    resizeMode="contain"
                />
            </Pressable>

            {/* User buttons */}
            <View style={styles.usersContainer}>

                {userCount >= 1 && (
                    <RoundedButton
                        label={users[0].name}
                        icon={require("../../assets/Trumpet.png")}
                        onPress={() => selectUser(users[0])}
                    />
                )}

                {userCount >= 2 && (
                    <RoundedButton
                        label={users[1].name}
                        icon={require("../../assets/Explorer.png")}
                        onPress={() => selectUser(users[1])}
                    />
                )}

                {userCount >= 3 && (
                    <RoundedButton
                        label={users[2].name}
                        icon={require("../../assets/PartyHat.png")}
                        onPress={() => selectUser(users[2])}
                    />
                )}

                {userCount < 3 && (
                    <RoundedButton
                        label="Add User"
                        isAddButton={true}
                        icon={require("../../assets/Sunglasses.png")}
                        onPress={handleAddUser}
                    />
                )}

            </View>

        </View>
    );
}

