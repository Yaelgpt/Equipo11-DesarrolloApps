import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useWeather } from "../context/WeatherContext";
import { getTranslation } from "../translations/translations";

const API_KEY = "9a751bccd7d142ed33d987cee3c9464c";

export default function CurrentWeatherScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const { unit, language, location, city } = useWeather();

  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    fetchWeather();
  }, [location, city, unit, language]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      let url;
      if (location) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=${unit}&lang=${language}`;
      } else if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}&lang=${language}`;
      }

      const response = await axios.get(url);
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setLoading(false);
    }
  };

  const getTempSymbol = () => (unit === "metric" ? "°C" : "°F");

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>{t("loadingWeather")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("currentWeather")}</Text>
      {weather && (
        <>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>
            {Math.round(weather.main.temp)}
            {getTempSymbol()}
          </Text>
          <Text style={styles.description}>
            {weather.weather[0].description}
          </Text>
          <View style={styles.details}>
            <Text style={styles.detail}>
              {t("feelsLike")}: {Math.round(weather.main.feels_like)}
              {getTempSymbol()}
            </Text>
            <Text style={styles.detail}>
              {t("humidity")}: {weather.main.humidity}%
            </Text>
            <Text style={styles.detail}>
              {t("wind")}:{" "}
              {Math.round(weather.wind.speed * (unit === "metric" ? 3.6 : 1))}{" "}
              {unit === "metric" ? "km/h" : "mph"}
            </Text>
            <Text style={styles.detail}>
              {t("pressure")}: {weather.main.pressure} hPa
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A90E2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  city: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  temp: {
    fontSize: 72,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  description: {
    fontSize: 24,
    color: "white",
    textTransform: "capitalize",
    marginBottom: 30,
  },
  details: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    padding: 20,
    width: "100%",
  },
  detail: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    marginTop: 20,
  },
});
