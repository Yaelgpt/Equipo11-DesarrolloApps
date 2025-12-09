import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useWeather } from "../context/WeatherContext";
import { getTranslation } from "../translations/translations";

export default function SettingsWeatherScreen() {
  const { unit, setUnit, language, setLanguage, city } = useWeather();

  const t = (key) => getTranslation(language, key);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t("settings")}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("temperatureUnits")}</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, unit === "metric" && styles.buttonActive]}
            onPress={() => setUnit("metric")}
          >
            <Text
              style={[
                styles.buttonText,
                unit === "metric" && styles.buttonTextActive,
              ]}
            >
              {t("celsius")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, unit === "imperial" && styles.buttonActive]}
            onPress={() => setUnit("imperial")}
          >
            <Text
              style={[
                styles.buttonText,
                unit === "imperial" && styles.buttonTextActive,
              ]}
            >
              {t("fahrenheit")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("language")}</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, language === "es" && styles.buttonActive]}
            onPress={() => setLanguage("es")}
          >
            <Text
              style={[
                styles.buttonText,
                language === "es" && styles.buttonTextActive,
              ]}
            >
              {t("spanish")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, language === "en" && styles.buttonActive]}
            onPress={() => setLanguage("en")}
          >
            <Text
              style={[
                styles.buttonText,
                language === "en" && styles.buttonTextActive,
              ]}
            >
              {t("english")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("information")}</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>{t("api")}</Text>
          <Text style={styles.infoText}>{t("version")}</Text>
          <Text style={styles.infoText}>{t("updateTime")}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7DC5E8",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    marginTop: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextActive: {
    color: "#2b92c5ff",
  },
  infoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    borderRadius: 10,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
  },
});
