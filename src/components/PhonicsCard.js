import { View, Text,} from "react-native";
import styles from "./PhonicsCard.styles";

export default function PhonicsCard({
  sound,
  size = 310,
  isActive = false,
}) {
  const isDigraph = sound.length > 1;

  const fontSize = isDigraph
    ? size * 0.43
    : size * 0.56;

  return (
    <View
      accessible={true}
      accessibilityLabel={`Phonics sound ${sound}`}
      style={[
        styles.card,
        {
          width: size,
          height: size,
          borderRadius: size * 0.1,
        },
        isActive && styles.activeCard,
      ]}
    >
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        allowFontScaling={true}
        style={[
          styles.soundText,
          {
            fontSize,
            letterSpacing: isDigraph ? 1 : 0,
          },
        ]}
      >
        {sound}
      </Text>
    </View>
  );
}

