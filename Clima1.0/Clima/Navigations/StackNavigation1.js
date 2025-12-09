import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import DetailsScreen from "../Screens/DetailsScreen";
import AnotherScreen from "../Screens/AnotherScreen";
const Stack = createStackNavigator();

export default function StackNavigation1() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{ headerShown: true, headerTitle: "Inicio" }}
      />
      <Stack.Screen
        name="Details Screen"
        component={DetailsScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="Another Screen"
        component={AnotherScreen}
        options={{
          headerStyle: {
            backgroundColor: "purple",
            borderBottomColor: "yellow",
            borderBottomWidth: 5,
          },
          headerTitleStyle: {
            color: "white",
            textAlign: "center",
          },
        }}
      />
    </Stack.Navigator>
  );
}
