import { Pressable, View, Image, Text,} from "react-native";
import styles from "./RoundedButton.styles";

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

