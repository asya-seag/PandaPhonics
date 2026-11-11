import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const OVERLAY_KEY = "@pandaPhonics/overlayColour";

export const OVERLAY_COLOURS = [
  { name: "Peach", value: "#FFF5D6" },
  { name: "White", value: "#FFFFFF" },
  { name: "Blue", value: "#96ADFC" },
  { name: "Blue Grey", value: "#DBE1F1" },
  { name: "Green", value: "#A8F29A" },
  { name: "Grey", value: "#D8D3D6" },
  { name: "Orange", value: "#EDDD6D" },
  { name: "Purple", value: "#B987DC" },
  { name: "Red", value: "#E0A6AA" },
  { name: "Turquoise", value: "#A5F7E1" },
  { name: "Yellow", value: "#F8FD89" },
  { name: "Bright Pink", value: "#FFB3D9" },
  
];

export default function useOverlayColour() {
  const [overlayColour, setOverlayColour] = useState(
    OVERLAY_COLOURS[0].value
  );

  useFocusEffect(
    useCallback(() => {
      let active = true;

      async function loadColour() {
        try {
          const saved = await AsyncStorage.getItem(OVERLAY_KEY);

          const selected = OVERLAY_COLOURS.find(
            (colour) => colour.value === saved
          );

          if (active) {
            setOverlayColour(
              selected?.value ?? OVERLAY_COLOURS[0].value
            );
          }
        } catch {
        }
      }

      loadColour();

      return () => {
        active = false;
      };
    }, [])
  );

  return overlayColour;
}