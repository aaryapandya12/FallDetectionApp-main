import React from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "./Footer"; // Importing Footer

const NotificationsScreen: React.FC = () => {
  return (
    <LinearGradient
      colors={["#f0f4ff", "#d6e3ff"]} // Soft gradient background
      style={styles.container}
    >
      

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Recent Notifications</Text>

        {/* Example notifications */}
        <View style={styles.notificationCard}>
          <View style={styles.notificationIcon}>
            <Ionicons name="alert-circle" size={24} color="#ff4444" />
          </View>
          <Text style={styles.notificationText}>
            Fall detected! Immediate attention required.
          </Text>
        </View>

        <View style={styles.notificationCard}>
          <View style={styles.notificationIcon}>
            <Ionicons name="heart-circle" size={24} color="#ffbb33" />
          </View>
          <Text style={styles.notificationText}>
            Heart rate abnormal. Please check the monitor.
          </Text>
        </View>

        <View style={styles.notificationCard}>
          <View style={styles.notificationIcon}>
            <Ionicons name="notifications" size={24} color="#007bff" />
          </View>
          <Text style={styles.notificationText}>
            Medicine reminder: Take your medication at 10:00 AM.
          </Text>
        </View>

        <View style={styles.notificationCard}>
          <View style={styles.notificationIcon}>
            <Ionicons name="location" size={24} color="#00C851" />
          </View>
          <Text style={styles.notificationText}>
            GPS tracking activated. Your location is being monitored.
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      {/* <Footer activeScreen="NotificationsScreen" navigation={navigation} /> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    padding: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  notificationIcon: {
    marginRight: 16,
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
});

export default NotificationsScreen;