import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PhonicsPractice() {
  return (
    <View style={styles.container}>
      <Text>Phonics Practice</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});