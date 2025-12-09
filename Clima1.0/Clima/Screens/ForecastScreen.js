import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useWeather } from "../context/WeatherContext";
import { getTranslation } from "../translations/translations";

const API_KEY = "9a751bccd7d142ed33d987cee3c9464c";

export default function ForecastScreen() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const { unit, language, location, city } = useWeather();

  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    fetchForecast();
  }, [location, city, unit, language]);

  const fetchForecast = async () => {
    try {
      setLoading(true);
      let url;
      if (location) {
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=${unit}&lang=${language}`;
      } else if (city) {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}&lang=${language}`;
      }

      const response = await axios.get(url);
      setForecast(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching forecast:", error);
      setLoading(false);
    }
  };

  const getTempSymbol = () => (unit === "metric" ? "°C" : "°F");

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>{t("loadingForecast")}</Text>
      </View>
    );
  }

  const getDailyForecast = () => {
    if (!forecast) return [];
    const daily = [];
    const dates = {};

    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("es-ES");
      if (!dates[date]) {
        dates[date] = item;
        daily.push(item);
      }
    });

    return daily.slice(0, 5);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t("forecast5Days")}</Text>
      {forecast && (
        <View style={styles.forecastContainer}>
          {getDailyForecast().map((day, index) => (
            <View key={index} style={styles.dayCard}>
              <Text style={styles.date}>
                {new Date(day.dt * 1000).toLocaleDateString(
                  language === "es" ? "es-ES" : "en-US",
                  {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                  }
                )}
              </Text>
              <Text style={styles.temp}>
                {Math.round(day.main.temp)}
                {getTempSymbol()}
              </Text>
              <Text style={styles.description}>
                {day.weather[0].description}
              </Text>
              <Text style={styles.minMax}>
                {t("max")}: {Math.round(day.main.temp_max)}
                {getTempSymbol()} / {t("min")}: {Math.round(day.main.temp_min)}
                {getTempSymbol()}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5BA3E8",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  forecastContainer: {
    marginBottom: 20,
  },
  dayCard: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  date: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  temp: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    color: "white",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  minMax: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#5BA3E8",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    marginTop: 20,
  },
});
