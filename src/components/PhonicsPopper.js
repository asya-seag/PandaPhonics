import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, View,} from "react-native";
import * as Haptics from "expo-haptics";
import styles from "./PhonicsPopper.styles";

export default function PhonicsPopper({
  size = 64,
  resetKey,
  hapticsEnabled = true,
}) {
  const [popped, setPopped] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setPopped(false);
    animation.setValue(0);
  }, [resetKey, animation]);

  function handlePress() {
    const next = !popped;
    setPopped(next);

    Animated.spring(animation, {
      toValue: next ? 1 : 0,
      friction: 7,
      tension: 150,
      useNativeDriver: true,
    }).start();

    if (hapticsEnabled) {
      Haptics.impactAsync(
        next
          ? Haptics.ImpactFeedbackStyle.Heavy
          : Haptics.ImpactFeedbackStyle.Medium
      ).catch(() => {});
    }
  }

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.87],
  });

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel="Pop sound bubble"
      accessibilityState={{ selected: popped }}
      style={[
        styles.touchArea,
        { width: size + 12, height: size + 12 },
      ]}
    >
      <View
        style={[
          styles.outerRing,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.bubble,
            {
              borderRadius: size / 2,
              transform: [{ scale }],
            },
            popped && styles.poppedBubble,
          ]}
        >
          {!popped && <View style={styles.highlight} />}

          {popped && <View style={styles.innerShadow} />}
        </Animated.View>
      </View>
    </Pressable>
  );
}


