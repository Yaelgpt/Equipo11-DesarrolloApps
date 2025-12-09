import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CurrentWeatherScreen from "../Screens/CurrentWeatherScreen";
import ForecastScreen from "../Screens/ForecastScreen";
import FavoritesScreen from "../Screens/FavoritesScreen";
import SearchScreen from "../Screens/SearchScreen";
import SettingsWeatherScreen from "../Screens/SettingsWeatherScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { useWeather } from "../context/WeatherContext";
import { getTranslation } from "../translations/translations";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator1() {
  const { language } = useWeather();
  const t = (key) => getTranslation(language, key);

  return (
    <Tab.Navigator
      initialRouteName="Current"
      screenOptions={{
        tabBarActiveTintColor: "#0066cc",
        tabBarInactiveTintColor: "#888888",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
        },
        headerStyle: {
          backgroundColor: "#4A90E2",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Current"
        component={CurrentWeatherScreen}
        options={{
          tabBarLabel: language === "es" ? "Actual" : "Current",
          headerTitle: t("currentWeather"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="wb-sunny" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Forecast"
        component={ForecastScreen}
        options={{
          tabBarLabel: language === "es" ? "Pronóstico" : "Forecast",
          headerTitle: t("forecast5Days"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-today" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: language === "es" ? "Favoritos" : "Favorites",
          headerTitle:
            language === "es" ? "Ciudades Favoritas" : "Favorite Cities",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: language === "es" ? "Buscar" : "Search",
          headerTitle: language === "es" ? "Buscar Clima" : "Search Weather",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsWeatherScreen}
        options={{
          tabBarLabel: language === "es" ? "Ajustes" : "Settings",
          headerTitle: t("settings"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
