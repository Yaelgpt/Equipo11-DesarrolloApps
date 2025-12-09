import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { useWeather } from "../context/WeatherContext";
import { getTranslation } from "../translations/translations";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";

const API_KEY = "9a751bccd7d142ed33d987cee3c9464c";

const FavoritesScreen = () => {
  const {
    language,
    favoriteCities,
    addFavoriteCity,
    removeFavoriteCity,
    updateFavoriteCity,
    selectFavoriteCity,
  } = useWeather();

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [cityInput, setCityInput] = useState("");
  const [editingCity, setEditingCity] = useState(null);
  const [editCityInput, setEditCityInput] = useState("");

  const t = (key) => getTranslation(language, key);

  const handleAddCity = async () => {
    if (!cityInput.trim()) {
      Alert.alert(
        t("error"),
        language === "es"
          ? "Por favor ingresa el nombre de una ciudad"
          : "Please enter a city name"
      );
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`
      );

      if (response.data) {
        addFavoriteCity(response.data.name, response.data.sys.country);
        setCityInput("");
        setModalVisible(false);
        Alert.alert(
          t("success"),
          language === "es"
            ? `${response.data.name} agregada a favoritos`
            : `${response.data.name} added to favorites`
        );
      }
    } catch (error) {
      Alert.alert(
        t("error"),
        language === "es" ? "No se pudo encontrar la ciudad" : "City not found"
      );
    }
  };

  const handleEditCity = async () => {
    if (!editCityInput.trim()) {
      Alert.alert(
        t("error"),
        language === "es"
          ? "Por favor ingresa el nombre de una ciudad"
          : "Please enter a city name"
      );
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${editCityInput}&appid=${API_KEY}&units=metric`
      );

      if (response.data && editingCity) {
        updateFavoriteCity(
          editingCity.id,
          response.data.name,
          response.data.sys.country
        );
        setEditCityInput("");
        setEditModalVisible(false);
        setEditingCity(null);
        Alert.alert(
          t("success"),
          language === "es" ? "Ciudad actualizada" : "City updated"
        );
      }
    } catch (error) {
      Alert.alert(
        t("error"),
        language === "es" ? "No se pudo encontrar la ciudad" : "City not found"
      );
    }
  };

  const handleDeleteCity = (cityId, cityName) => {
    Alert.alert(
      language === "es" ? "Confirmar" : "Confirm",
      language === "es"
        ? `¿Eliminar ${cityName} de favoritos?`
        : `Delete ${cityName} from favorites?`,
      [
        { text: language === "es" ? "Cancelar" : "Cancel", style: "cancel" },
        {
          text: language === "es" ? "Eliminar" : "Delete",
          style: "destructive",
          onPress: () => removeFavoriteCity(cityId),
        },
      ]
    );
  };

  const handleSelectCity = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`
      );

      if (response.data) {
        selectFavoriteCity(
          response.data.name,
          response.data.coord.lat,
          response.data.coord.lon
        );
        Alert.alert(
          t("success"),
          language === "es"
            ? `Cambiado a ${response.data.name}`
            : `Changed to ${response.data.name}`
        );
      }
    } catch (error) {
      Alert.alert(
        t("error"),
        language === "es" ? "Error al cargar la ciudad" : "Error loading city"
      );
    }
  };

  const openEditModal = (city) => {
    setEditingCity(city);
    setEditCityInput(city.name);
    setEditModalVisible(true);
  };

  const renderCityItem = ({ item }) => (
    <View style={styles.cityCard}>
      <TouchableOpacity
        style={styles.cityInfo}
        onPress={() => handleSelectCity(item)}
      >
        <Text style={styles.cityName}>{item.name}</Text>
        <Text style={styles.countryName}>{item.country}</Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => openEditModal(item)}
        >
          <MaterialIcons name="edit" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteCity(item.id, item.name)}
        >
          <MaterialIcons name="delete" size={24} color="#E74C3C" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {language === "es" ? "Ciudades Favoritas" : "Favorite Cities"}
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="add-circle" size={36} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={favoriteCities}
        renderItem={renderCityItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {language === "es"
              ? "No tienes ciudades favoritas"
              : "No favorite cities"}
          </Text>
        }
      />

      {/* Add City Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {language === "es" ? "Agregar Ciudad" : "Add City"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={
                language === "es" ? "Nombre de la ciudad" : "City name"
              }
              value={cityInput}
              onChangeText={setCityInput}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setCityInput("");
                }}
              >
                <Text style={styles.buttonText}>
                  {language === "es" ? "Cancelar" : "Cancel"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAddCity}
              >
                <Text style={styles.buttonText}>
                  {language === "es" ? "Agregar" : "Add"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit City Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {language === "es" ? "Editar Ciudad" : "Edit City"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={
                language === "es"
                  ? "Nuevo nombre de la ciudad"
                  : "New city name"
              }
              value={editCityInput}
              onChangeText={setEditCityInput}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setEditModalVisible(false);
                  setEditCityInput("");
                  setEditingCity(null);
                }}
              >
                <Text style={styles.buttonText}>
                  {language === "es" ? "Cancelar" : "Cancel"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleEditCity}
              >
                <Text style={styles.buttonText}>
                  {language === "es" ? "Guardar" : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  addButton: {
    padding: 5,
  },
  list: {
    padding: 15,
  },
  cityCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "space-between",
    alignItems: "center",
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 4,
  },
  countryName: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  actions: {
    flexDirection: "row",
    gap: 15,
  },
  editButton: {
    padding: 5,
  },
  deleteButton: {
    padding: 5,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#7F8C8D",
    marginTop: 50,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#95A5A6",
  },
  confirmButton: {
    backgroundColor: "#4A90E2",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FavoritesScreen;
