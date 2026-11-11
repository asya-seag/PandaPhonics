import styles from "./LongPhonicsLevelButton.styles";

import { Pressable, Text} from "react-native";

export default function LongPhonicsLevelButton({
  label,
  onPress,
}) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Text style={styles.label}>
        {label || "Phonics Level Placeholder"}
      </Text>
    </Pressable>
  );
}


