import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "./Footer";  // Importing Footer

const NotificationsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Recent Notifications</Text>

      {/* Example notifications */}
      <View style={styles.notificationCard}>
        <Ionicons name="alert-circle" size={30} color="red" />
        <Text style={styles.notificationText}>Fall detected! Immediate attention required.</Text>
      </View>

      <View style={styles.notificationCard}>
        <Ionicons name="alert-circle" size={30} color="orange" />
        <Text style={styles.notificationText}>Heart rate abnormal. Please check the monitor.</Text>
      </View>

      {/* Footer */}
      <Footer activeScreen="MonitoringScreen" navigation={navigator} />{/* Imported Footer component */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
  notificationCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  notificationText: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default NotificationsScreen;


