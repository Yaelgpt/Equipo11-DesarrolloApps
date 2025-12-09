import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { useWeather } from "../context/WeatherContext";
import { getTranslation } from "../translations/translations";

const API_KEY = "9a751bccd7d142ed33d987cee3c9464c";

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { unit, language } = useWeather();

  const t = (key) => getTranslation(language, key);

  const searchCity = async () => {
    if (!searchQuery.trim()) {
      setError(t("enterCityName"));
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${API_KEY}&units=${unit}&lang=${language}`
      );

      setSearchResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error searching city:", error);
      setError(t("cityNotFound"));
      setSearchResults(null);
      setLoading(false);
    }
  };

  const getTempSymbol = () => (unit === "metric" ? "°C" : "°F");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("searchCity")}</Text>
        <Text style={styles.subtitle}>{t("searchSubtitle")}</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t("searchPlaceholder")}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchCity}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchCity}>
          <Text style={styles.searchButtonText}>{t("searchButton")}</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>{t("searching")}</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {searchResults && !loading && (
        <View style={styles.resultsContainer}>
          <View style={styles.cityCard}>
            <View style={styles.cityHeader}>
              <Text style={styles.cityName}>{searchResults.name}</Text>
              <Text style={styles.countryFlag}>
                {searchResults.sys.country}
              </Text>
            </View>

            <View style={styles.weatherMain}>
              <Text style={styles.temperature}>
                {Math.round(searchResults.main.temp)}
                {getTempSymbol()}
              </Text>
              <Text style={styles.weatherDescription}>
                {searchResults.weather[0].description}
              </Text>
            </View>

            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>{t("feelsLike")}</Text>
                <Text style={styles.detailValue}>
                  {Math.round(searchResults.main.feels_like)}
                  {getTempSymbol()}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>{t("humidity")}</Text>
                <Text style={styles.detailValue}>
                  {searchResults.main.humidity}%
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>{t("wind")}</Text>
                <Text style={styles.detailValue}>
                  {Math.round(
                    searchResults.wind.speed * (unit === "metric" ? 3.6 : 1)
                  )}{" "}
                  {unit === "metric" ? "km/h" : "mph"}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>{t("pressure")}</Text>
                <Text style={styles.detailValue}>
                  {searchResults.main.pressure} hPa
                </Text>
              </View>
            </View>

            <View style={styles.coordsContainer}>
              <Text style={styles.coordsText}>
                📍 Lat: {searchResults.coord.lat.toFixed(4)}° | Lon:{" "}
                {searchResults.coord.lon.toFixed(4)}°
              </Text>
            </View>
          </View>

          <View style={styles.sunTimesCard}>
            <View style={styles.sunTimeItem}>
              <Text style={styles.sunTimeLabel}>{t("sunrise")}</Text>
              <Text style={styles.sunTimeValue}>
                {new Date(searchResults.sys.sunrise * 1000).toLocaleTimeString(
                  language === "es" ? "es-ES" : "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </Text>
            </View>
            <View style={styles.sunTimeItem}>
              <Text style={styles.sunTimeLabel}>{t("sunset")}</Text>
              <Text style={styles.sunTimeValue}>
                {new Date(searchResults.sys.sunset * 1000).toLocaleTimeString(
                  language === "es" ? "es-ES" : "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </Text>
            </View>
          </View>
        </View>
      )}

      {!searchResults && !loading && !error && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>🌍</Text>
          <Text style={styles.emptyStateText}>{t("emptyStateText")}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6CB4E8",
    padding: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#6CB4E8",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  loadingText: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
  },
  errorContainer: {
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  },
  errorText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  resultsContainer: {
    marginTop: 10,
  },
  cityCard: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  cityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cityName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  countryFlag: {
    fontSize: 24,
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  weatherMain: {
    alignItems: "center",
    marginBottom: 20,
  },
  temperature: {
    fontSize: 64,
    fontWeight: "bold",
    color: "white",
  },
  weatherDescription: {
    fontSize: 20,
    color: "white",
    textTransform: "capitalize",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailItem: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  coordsContainer: {
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
  },
  coordsText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  sunTimesCard: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  sunTimeItem: {
    alignItems: "center",
  },
  sunTimeLabel: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
  },
  sunTimeValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  emptyState: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    lineHeight: 26,
  },
});
