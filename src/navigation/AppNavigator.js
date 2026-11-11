import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeLanding from "../screens/HomeLanding";
import PhonicsLevels from "../screens/PhonicsLevels";
import PhonicsPractice from "../screens/PhonicsPractice";
import Settings from "../screens/Settings";
import HighFrequency from "../screens/HighFrequency";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeLanding"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="HomeLanding"
          component={HomeLanding}
        />

        <Stack.Screen
          name="PhonicsLevels"
          component={PhonicsLevels}
        />

        <Stack.Screen
          name="PhonicsPractice"
          component={PhonicsPractice}
        />

        <Stack.Screen
          name="Settings"
          component={Settings}
        />
        <Stack.Screen
          name="HighFrequency"
          component={HighFrequency}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}