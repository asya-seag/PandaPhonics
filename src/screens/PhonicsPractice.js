import { useEffect, useState } from "react";
import { View, Text, Image, Pressable, useWindowDimensions, } from "react-native";
import styles from "./PhonicsPractice.styles";
import PhonicsCard from "../components/PhonicsCard";
import PhonicsPopper from "../components/PhonicsPopper";
import useOverlayColour from "../hooks/useOverlayColour";


import { getPhonicsLevel } from "../data/phonicsData";

export default function PhonicsPractice({ navigation, route, }) {
  const overlayColour = useOverlayColour();
  const { width, height } = useWindowDimensions();

  // Level selected on the PhonicsLevels screen
  const levelId = Number(route.params?.levelId ?? 1);
  const level = getPhonicsLevel(levelId);

  const [wordIndex, setWordIndex] = useState(0);
  const [resetCount, setResetCount] = useState(0);

  useEffect(() => {
    setWordIndex(0);
    setResetCount(0);
  }, [levelId]);

  if (!level || !level.words?.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          This phonics level is unavailable.
        </Text>

        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>
            Go back
          </Text>
        </Pressable>
      </View>
    );
  }

  const word = level.words[wordIndex];
  const segments = word.segments;
  const count = segments.length;


  const horizontalPadding = 40;
  const cardGap = Math.min(22, width * 0.025);

  const availableWidth =
    width - horizontalPadding * 2;

  const calculatedSize =
    (availableWidth - cardGap * (count - 1)) /
    count;

  const cardSize = Math.max(
    38,
    Math.min(250, calculatedSize, height * 0.40)
  );

  const popperSize = Math.min(
    68,
    cardSize * 0.8
  );

  function nextWord() {
    if (wordIndex >= level.words.length - 1) {
      navigation.navigate("PhonicsLevels");
      return;
    }
    setWordIndex((current) => current + 1);
    setResetCount((current) => current + 1);
  }


  function tryAgain() {
    setResetCount((current) => current + 1);
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: overlayColour },
      ]}
    >

      
      <View style={styles.topLeftButtons}>

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

      </View>


      <View style={styles.pandaButtons}>

        <Text style={styles.progressText}>
          Word {wordIndex + 1} of {level.words.length}
        </Text>

        <Pressable
          style={styles.pandaButton}
          accessibilityRole="button"
          accessibilityLabel="Try again"
          onPress={tryAgain}
        >
          <Image
            source={require("../../assets/PandaOoops.png")}
            style={styles.pandaImage}
            resizeMode="contain"
          />
        </Pressable>

        <Pressable
          style={styles.pandaButton}
          accessibilityRole="button"
          accessibilityLabel="Next word"
          onPress={nextWord}
        >
          <Image
            source={require("../../assets/PandaNext.png")}
            style={styles.pandaImage}
            resizeMode="contain"
          />
        </Pressable>

      </View>

    
      <View style={styles.practiceArea}>

      
        <View
          style={[
            styles.cardsRow,
            { gap: cardGap },
          ]}
        >
          {segments.map((segment, index) => (
            <View
              key={`${wordIndex}-${index}`}
              style={[
                styles.cardColumn,
                { width: cardSize },
              ]}
            >

              <PhonicsCard
                sound={segment}
                size={cardSize}
              />

              <PhonicsPopper
                size={popperSize}
                resetKey={`${levelId}-${wordIndex}-${resetCount}`}
              />

            </View>
          ))}
        </View>

      </View>

    </View>
  );
}

