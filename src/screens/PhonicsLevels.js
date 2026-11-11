import { View, Image, Pressable, StyleSheet, ScrollView, } from "react-native";
import LongPhonicsLevelButton from "../components/LongPhonicsLevelButton";
import styles from "./PhonicsLevels.styles.js";

export default function PhonicsLevels({ navigation, route }) {
  

  const userId = route.params?.userId;

  const openLevel = (levelId) => {
    navigation.navigate("PhonicsPractice", {
      levelId,
    });
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

      {/* Panda Phonics logo */}
      <Image
        source={require("../../assets/logoName.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Home button */}
      <Pressable
        style={styles.homeButton}
        onPress={() => navigation.navigate("HomeLanding")}
        accessibilityRole="button"
        accessibilityLabel="Home"
      >
        <Image
          source={require("../../assets/Home.png")}
          style={styles.homeImage}
          resizeMode="contain"
        />
      </Pressable>

      {/* Phonics level buttons */}
      <View style={styles.levelsArea}>

        <ScrollView
          contentContainerStyle={styles.levelsContainer}
          showsVerticalScrollIndicator={true}
        >

          <LongPhonicsLevelButton
            label="Level 1: s, a, t, p, i, n"
            onPress={() => openLevel(1)}
          />

          <LongPhonicsLevelButton
            label="Level 2: ck, e, h, r, m, d"
            onPress={() => openLevel(2)}
          />

          <LongPhonicsLevelButton
            label="Level 3: g, o, u, l, f, b"
            onPress={() => openLevel(3)}
          />

          <LongPhonicsLevelButton
            label="Level 4: ai, j, oa, ie, ee/or"
            onPress={() => openLevel(4)}
          />

          <LongPhonicsLevelButton
            label="Level 5: z, w, ng, v, oo"
            onPress={() => openLevel(5)}
          />

          <LongPhonicsLevelButton
            label="Level 6: y, x, ch, sh, th"
            onPress={() => openLevel(6)}
          />

          <LongPhonicsLevelButton
            label="Level 7: qu, ou, oi, ue, er, ar"
            onPress={() => openLevel(7)}
          />

          <LongPhonicsLevelButton
            label="High Frequency Words"
            onPress={() =>
              navigation.navigate("HighFrequency", { userId })
            }
          />

        </ScrollView>

      </View>

    </View>
  );
}

