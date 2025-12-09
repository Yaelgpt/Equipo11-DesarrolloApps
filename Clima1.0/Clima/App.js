import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator1 from "./Navigations/BottomTabNavigator1";
import { WeatherProvider } from "./context/WeatherContext";

export default function App() {
  return (
    <WeatherProvider>
      <NavigationContainer>
        <BottomTabNavigator1 />
        <StatusBar style="light" />
      </NavigationContainer>
    </WeatherProvider>
  );
}
