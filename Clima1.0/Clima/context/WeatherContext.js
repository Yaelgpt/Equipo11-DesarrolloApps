import React, { createContext, useState, useContext, useEffect } from "react";
import * as Location from "expo-location";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [unit, setUnit] = useState("metric");
  const [language, setLanguage] = useState("es");
  const [location, setLocation] = useState({
    latitude: 32.5149,
    longitude: -117.0382,
  }); // Tijuana
  const [city, setCity] = useState("Tijuana");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([
    { id: 1, name: "Tijuana", country: "México" },
    { id: 2, name: "Madrid", country: "España" },
    { id: 3, name: "New York", country: "USA" },
  ]);

  useEffect(() => {
    // No hacer nada al inicio, Tijuana es por defecto
  }, []);

  const getLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Se requiere permiso de ubicación para usar esta aplicación");
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 15000,
      });

      if (currentLocation && currentLocation.coords) {
        setLocation(currentLocation.coords);

        // Obtener el nombre de la ciudad usando geocoding inverso
        try {
          const address = await Location.reverseGeocodeAsync({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          });

          if (address && address[0]) {
            const cityName =
              address[0].city ||
              address[0].region ||
              address[0].subregion ||
              address[0].district;
            if (cityName) {
              setCity(cityName);
            }
          }
        } catch (geocodeError) {
          console.log("No se pudo obtener el nombre de la ciudad");
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("Error obteniendo ubicación:", error.message);
      setError(
        "No se pudo obtener tu ubicación. Verifica que el GPS esté activado."
      );
      setLoading(false);
    }
  };

  const addFavoriteCity = (cityName, countryName) => {
    const newCity = {
      id: Date.now(),
      name: cityName,
      country: countryName,
    };
    setFavoriteCities([...favoriteCities, newCity]);
  };

  const removeFavoriteCity = (cityId) => {
    setFavoriteCities(favoriteCities.filter((city) => city.id !== cityId));
  };

  const updateFavoriteCity = (cityId, newName, newCountry) => {
    setFavoriteCities(
      favoriteCities.map((city) =>
        city.id === cityId
          ? { ...city, name: newName, country: newCountry }
          : city
      )
    );
  };

  const selectFavoriteCity = (cityName, lat, lon) => {
    setCity(cityName);
    setLocation({ latitude: lat, longitude: lon });
  };

  const value = {
    unit,
    setUnit,
    language,
    setLanguage,
    location,
    city,
    loading,
    error,
    getLocation,
    favoriteCities,
    addFavoriteCity,
    removeFavoriteCity,
    updateFavoriteCity,
    selectFavoriteCity,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
