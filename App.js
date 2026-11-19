import AppNavigator from "./src/navigation/AppNavigator";
import { useFonts } from "expo-font";
import { Lexend_400Regular } from "@expo-google-fonts/lexend/400Regular";

export default function App() {

   const [fontsLoaded, fontError] = useFonts({
    Lexend_400Regular,
  });
  
  return <AppNavigator />;
}
