import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DerslerimScreen from "./src/screens/DerslerimScreen";
import KonuDetayScreen from "./src/screens/KonuDetayScreen";
import AltKonularScreen from "./src/screens/AltKonularScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Derslerim">
        <Stack.Screen
          name="Derslerim"
          component={DerslerimScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AltKonular"
          component={AltKonularScreen}
          options={{
            title: "Alt Konular",
            headerStyle: {
              backgroundColor: "#007AFF",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="KonuDetay"
          component={KonuDetayScreen}
          options={{
            title: "Konu Detayı",
            headerStyle: {
              backgroundColor: "#007AFF",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
