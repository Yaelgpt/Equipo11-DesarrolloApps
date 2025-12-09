import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useWeather } from "../context/WeatherContext";
import { getTranslation } from "../translations/translations";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";

const API_KEY = "9a751bccd7d142ed33d987cee3c9464c";

const SearchScreen = () => {
  const { language, unit } = useWeather();
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const t = (key) => getTranslation(language, key);

  const searchWeather = async () => {
    if (!cityInput.trim()) {
      setError(
        language === "es"
          ? "Por favor ingresa el nombre de una ciudad"
          : "Please enter a city name"
      );
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=${unit}&lang=${language}`
      );

      if (response.data) {
        setWeatherData(response.data);
        setError(null);
      }
    } catch (err) {
      setError(
        language === "es"
          ? "No se pudo encontrar la ciudad. Verifica el nombre e intenta nuevamente."
          : "City not found. Check the name and try again."
      );
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString(language === "es" ? "es-ES" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder={
            language === "es" ? "Buscar ciudad..." : "Search city..."
          }
          value={cityInput}
          onChangeText={setCityInput}
          onSubmitEditing={searchWeather}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchWeather}>
          <MaterialIcons name="search" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>{t("loading")}</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={48} color="#E74C3C" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {weatherData && !loading && (
        <View style={styles.weatherContainer}>
          <View style={styles.cityHeader}>
            <Text style={styles.cityName}>
              {weatherData.name}, {weatherData.sys.country}
            </Text>
            <Text style={styles.weatherDescription}>
              {weatherData.weather[0].description}
            </Text>
          </View>

          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>
              {Math.round(weatherData.main.temp)}°
              {unit === "metric" ? "C" : "F"}
            </Text>
            <Text style={styles.feelsLike}>
              {t("feelsLike")}: {Math.round(weatherData.main.feels_like)}°
              {unit === "metric" ? "C" : "F"}
            </Text>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailCard}>
              <MaterialIcons name="opacity" size={32} color="#4A90E2" />
              <Text style={styles.detailLabel}>{t("humidity")}</Text>
              <Text style={styles.detailValue}>
                {weatherData.main.humidity}%
              </Text>
            </View>

            <View style={styles.detailCard}>
              <MaterialIcons name="air" size={32} color="#4A90E2" />
              <Text style={styles.detailLabel}>{t("wind")}</Text>
              <Text style={styles.detailValue}>
                {weatherData.wind.speed} {unit === "metric" ? "m/s" : "mph"}
              </Text>
            </View>

            <View style={styles.detailCard}>
              <MaterialIcons name="compress" size={32} color="#4A90E2" />
              <Text style={styles.detailLabel}>{t("pressure")}</Text>
              <Text style={styles.detailValue}>
                {weatherData.main.pressure} hPa
              </Text>
            </View>

            <View style={styles.detailCard}>
              <MaterialIcons name="thermostat" size={32} color="#4A90E2" />
              <Text style={styles.detailLabel}>
                {language === "es" ? "Min/Max" : "Min/Max"}
              </Text>
              <Text style={styles.detailValue}>
                {Math.round(weatherData.main.temp_min)}° /{" "}
                {Math.round(weatherData.main.temp_max)}°
              </Text>
            </View>

            <View style={styles.detailCard}>
              <MaterialIcons name="visibility" size={32} color="#4A90E2" />
              <Text style={styles.detailLabel}>
                {language === "es" ? "Visibilidad" : "Visibility"}
              </Text>
              <Text style={styles.detailValue}>
                {(weatherData.visibility / 1000).toFixed(1)} km
              </Text>
            </View>

            <View style={styles.detailCard}>
              <MaterialIcons name="wb-cloudy" size={32} color="#4A90E2" />
              <Text style={styles.detailLabel}>
                {language === "es" ? "Nubes" : "Clouds"}
              </Text>
              <Text style={styles.detailValue}>{weatherData.clouds.all}%</Text>
            </View>
          </View>

          <View style={styles.sunContainer}>
            <View style={styles.sunCard}>
              <MaterialIcons name="wb-sunny" size={40} color="#F39C12" />
              <Text style={styles.sunLabel}>{t("sunrise")}</Text>
              <Text style={styles.sunTime}>
                {formatDate(weatherData.sys.sunrise)}
              </Text>
            </View>

            <View style={styles.sunCard}>
              <MaterialIcons name="nights-stay" size={40} color="#E74C3C" />
              <Text style={styles.sunLabel}>{t("sunset")}</Text>
              <Text style={styles.sunTime}>
                {formatDate(weatherData.sys.sunset)}
              </Text>
            </View>
          </View>

          <View style={styles.coordsContainer}>
            <Text style={styles.coordsText}>
              {language === "es" ? "Coordenadas" : "Coordinates"}:{" "}
              {weatherData.coord.lat.toFixed(4)},{" "}
              {weatherData.coord.lon.toFixed(4)}
            </Text>
          </View>
        </View>
      )}

      {!weatherData && !loading && !error && (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="travel-explore" size={80} color="#BDC3C7" />
          <Text style={styles.emptyText}>
            {language === "es"
              ? "Busca el clima de cualquier ciudad del mundo"
              : "Search weather for any city in the world"}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#F8F9FA",
  },
  searchButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#7F8C8D",
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    margin: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  errorText: {
    marginTop: 15,
    fontSize: 16,
    color: "#E74C3C",
    textAlign: "center",
  },
  weatherContainer: {
    padding: 15,
  },
  cityHeader: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cityName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 5,
  },
  weatherDescription: {
    fontSize: 18,
    color: "#7F8C8D",
    textTransform: "capitalize",
  },
  temperatureContainer: {
    backgroundColor: "#4A90E2",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  temperature: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  feelsLike: {
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: 5,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailCard: {
    backgroundColor: "#FFFFFF",
    width: "48%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailLabel: {
    fontSize: 14,
    color: "#7F8C8D",
    marginTop: 8,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  sunContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  sunCard: {
    backgroundColor: "#FFFFFF",
    width: "48%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sunLabel: {
    fontSize: 14,
    color: "#7F8C8D",
    marginTop: 8,
    marginBottom: 4,
  },
  sunTime: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  coordsContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coordsText: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
    marginTop: 50,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: "#7F8C8D",
    textAlign: "center",
  },
});

export default SearchScreen;
