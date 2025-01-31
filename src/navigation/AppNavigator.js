import DerslerimScreen from "../screens/DerslerimScreen";
import KonuDetayScreen from "../screens/KonuDetayScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
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
  );
};

export default AppNavigator;
