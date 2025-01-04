import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  LoginScreen: undefined; // No parameters expected for LoginScreen
  SettingsScreen: undefined; // No parameters expected for SettingsScreen
};

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, "SettingsScreen">;

interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            // Perform logout actions here (e.g., clear user session, tokens, etc.)
            // Then navigate to the LoginScreen
            navigation.navigate("LoginScreen");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="settings" size={100} color="#2196F3" />
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Adjust system preferences here.</Text>
      </View>

      {/* Settings Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.optionCard}>
          <Ionicons name="person" size={24} color="#2196F3" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionCard}>
          <Ionicons name="lock-closed" size={24} color="#2196F3" />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <TouchableOpacity style={styles.optionCard}>
          <Ionicons name="notifications" size={24} color="#2196F3" />
          <Text style={styles.optionText}>Notification Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionCard}>
          <Ionicons name="shield" size={24} color="#2196F3" />
          <Text style={styles.optionText}>Privacy Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity style={styles.optionCard}>
          <Ionicons name="information-circle" size={24} color="#2196F3" />
          <Text style={styles.optionText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionCard}>
          <Ionicons name="help-circle" size={24} color="#2196F3" />
          <Text style={styles.optionText}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    marginVertical: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 16,
  },
  logoutButton: {
    backgroundColor: "#f44336",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SettingsScreen;
