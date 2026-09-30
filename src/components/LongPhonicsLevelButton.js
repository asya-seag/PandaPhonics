import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

export default function LongPhonicsLevelButton({
  label,
  onPress,
}) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.label}>
        {label || "Phonics Level Placeholder"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 460,
    height: 80,
    borderRadius: 15,
    backgroundColor: "#EDD180",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 25,
    paddingBottom: 18,
  },


  label: {
    fontSize: 25,
    fontWeight: "600",
  },
});