import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import DerslerimScreen from "./src/screens/DerslerimScreen";
import KonuDetayScreen from "./src/screens/KonuDetayScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Anasayfa",
            headerStyle: {
              backgroundColor: "#007AFF",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Derslerim"
          component={DerslerimScreen}
          options={{
            title: "Derslerim",
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
