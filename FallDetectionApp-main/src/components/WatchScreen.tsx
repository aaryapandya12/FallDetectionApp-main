import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; 
import Footer from "./Footer"; 

const WatchScreen: React.FC<{ navigation: any }> = ({ navigation }) => {

  const activityData = {
    steps: 4523,
    distance: 3.2, 
    activeMinutes: 45,
  };

  const sleepData = {
    duration: "7h 30m",
    quality: "Good",
  };

  const weatherData = {
    temperature: 22,
    condition: "Sunny",
  };

  const musicStatus = "Playing: Song Title";

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
        <LinearGradient
          colors={["#2196F3", "#1976D2"]} 
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="watch" size={50} color="#FFF" />
          <Text style={styles.title}>Smartwatch Connected</Text>
          <Text style={styles.subtitle}>Real-time health and activity monitoring</Text>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Activity Tracking</Text>
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <Ionicons name="walk" size={30} color="#4CAF50" />
            <Text style={styles.metricValue}>{activityData.steps}</Text>
            <Text style={styles.metricLabel}>Steps</Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="map" size={30} color="#2196F3" />
            <Text style={styles.metricValue}>{activityData.distance} km</Text>
            <Text style={styles.metricLabel}>Distance</Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="time" size={30} color="#FF9800" />
            <Text style={styles.metricValue}>{activityData.activeMinutes} min</Text>
            <Text style={styles.metricLabel}>Active</Text>
          </View>
        </View>

     
        <Text style={styles.sectionTitle}>Sleep Monitoring</Text>
        <View style={styles.sleepContainer}>
          <View style={styles.sleepCard}>
            <Ionicons name="moon" size={30} color="#673AB7" />
            <Text style={styles.sleepValue}>{sleepData.duration}</Text>
            <Text style={styles.sleepLabel}>Duration</Text>
          </View>

          <View style={styles.sleepCard}>
            <Ionicons name="bed" size={30} color="#673AB7" />
            <Text style={styles.sleepValue}>{sleepData.quality}</Text>
            <Text style={styles.sleepLabel}>Quality</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Weather Updates</Text>
        <View style={styles.weatherContainer}>
          <Ionicons name="sunny" size={50} color="#FFC107" />
          <Text style={styles.weatherText}>
            {weatherData.temperature}°C | {weatherData.condition}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Music Control</Text>
        <View style={styles.musicContainer}>
          <Ionicons name="musical-notes" size={30} color="#E91E63" />
          <Text style={styles.musicText}>{musicStatus}</Text>
          <View style={styles.musicControls}>
            <TouchableOpacity style={styles.musicButton}>
              <Ionicons name="play-back" size={24} color="#E91E63" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.musicButton}>
              <Ionicons name="pause" size={24} color="#E91E63" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.musicButton}>
              <Ionicons name="play-forward" size={24} color="#E91E63" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>


      <Footer navigation={navigation} activeScreen="WatchScreen" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    paddingVertical: 32,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
    marginTop: 8,
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  sleepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  sleepCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sleepValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  sleepLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  weatherContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  weatherText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
  },
  musicContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  musicText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
  },
  musicControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  musicButton: {
    marginHorizontal: 16,
  },
});

export default WatchScreen;