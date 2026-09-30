import React from "react";
import { Pressable, View, Image, Text, StyleSheet } from "react-native";

export default function RoundedButton({
  icon,
  label,
  onPress,
}) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image
          source={icon || require("../../assets/logo.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.label}>
        {label || "Add User"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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