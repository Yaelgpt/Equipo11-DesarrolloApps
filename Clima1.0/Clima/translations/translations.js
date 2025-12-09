export const translations = {
  es: {
    // CurrentWeatherScreen
    currentWeather: "Clima Actual",
    loadingWeather: "Cargando clima...",
    feelsLike: "Sensación",
    humidity: "Humedad",
    wind: "Viento",
    pressure: "Presión",

    // ForecastScreen
    forecast5Days: "Pronóstico 5 Días",
    loadingForecast: "Cargando pronóstico...",
    max: "Max",
    min: "Min",

    // MapScreen (SearchScreen)
    searchCity: "Buscar Ciudad",
    searchSubtitle: "Consulta el clima en cualquier parte del mundo",
    searchPlaceholder: "Ej: London, Tokyo, New York...",
    searchButton: "🔍 Buscar",
    searching: "Buscando...",
    cityNotFound: "Ciudad no encontrada. Intenta con otro nombre.",
    enterCityName: "Por favor ingresa el nombre de una ciudad",
    sunrise: "🌅 Amanecer",
    sunset: "🌇 Atardecer",
    emptyStateText:
      "Busca cualquier ciudad del mundo para conocer su clima actual",

    // SettingsScreen
    settings: "Configuración",
    temperatureUnits: "Unidades de Temperatura",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    language: "Idioma",
    spanish: "Español",
    english: "English",
    favoriteCities: "Ciudades Favoritas",
    information: "Información",
    api: "API: OpenWeatherMap",
    version: "Versión: 1.0.0",
    updateTime: "Actualización: Tiempo real",

    // Days of week
    monday: "lunes",
    tuesday: "martes",
    wednesday: "miércoles",
    thursday: "jueves",
    friday: "viernes",
    saturday: "sábado",
    sunday: "domingo",
  },
  en: {
    // CurrentWeatherScreen
    currentWeather: "Current Weather",
    loadingWeather: "Loading weather...",
    feelsLike: "Feels Like",
    humidity: "Humidity",
    wind: "Wind",
    pressure: "Pressure",

    // ForecastScreen
    forecast5Days: "5 Day Forecast",
    loadingForecast: "Loading forecast...",
    max: "Max",
    min: "Min",

    // MapScreen (SearchScreen)
    searchCity: "Search City",
    searchSubtitle: "Check the weather anywhere in the world",
    searchPlaceholder: "E.g.: London, Tokyo, New York...",
    searchButton: "🔍 Search",
    searching: "Searching...",
    cityNotFound: "City not found. Try another name.",
    enterCityName: "Please enter a city name",
    sunrise: "🌅 Sunrise",
    sunset: "🌇 Sunset",
    emptyStateText: "Search any city in the world to check its current weather",

    // SettingsScreen
    settings: "Settings",
    temperatureUnits: "Temperature Units",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    language: "Language",
    spanish: "Español",
    english: "English",
    favoriteCities: "Favorite Cities",
    information: "Information",
    api: "API: OpenWeatherMap",
    version: "Version: 1.0.0",
    updateTime: "Update: Real time",

    // Days of week
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  },
};

export const getTranslation = (language, key) => {
  return translations[language]?.[key] || translations["es"][key];
};
