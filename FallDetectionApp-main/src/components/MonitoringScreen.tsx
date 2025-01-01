import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, StyleSheet,Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import Footer from "./Footer";

// Mock data for monitoring charts
const heartRateData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      data: [70, 75, 72, 78, 80],
    },
  ],
};

const bpData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      data: [120, 122, 118, 121, 119],
    },
  ],
};

const temperatureData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      data: [98.1, 98.4, 98.5, 98.7, 98.2],
    },
  ],
};

// Dummy fall detection records (replace this with actual data)
const initialFallRecords = [
  { angle: 45, timestamp: "2024-12-01 14:30", description: "Fall detected while sitting" },
  { angle: 78, timestamp: "2024-12-02 10:00", description: "Fall detected while walking" },
  { angle: 56, timestamp: "2024-12-05 16:45", description: "Fall detected while standing" },
];

const MonitoringScreen: React.FC = () => {
  const [fallRecords, setFallRecords] = useState(initialFallRecords);
  const heartRateStatus = 74; // Example value
  const bpStatus = 120; // Example systolic BP value
  const temperatureStatus = 98.7; // Example temperature value

  // Handle fall detection logic (replace this with actual logic)
  const handleFallDetection = (x: number, y: number, z: number) => {
    const angle = calculateFallAngle(x, y, z); // Calculate fall angle
    const timestamp = new Date().toISOString(); // Get current time

    // Store fall data in the state
    const newFallRecord = { angle, timestamp, description: "Fall detected" };
    setFallRecords((prevRecords) => [newFallRecord, ...prevRecords]);
  };

  // Simulate fall detection once the component mounts or whenever sensor data changes
  useEffect(() => {
    // Dummy fall detection (replace this with actual sensor data)
    const x = 1.0;
    const y = 2.0;
    const z = 0.5;

    handleFallDetection(x, y, z); // Example fall detection logic
  }, []); // This empty dependency array ensures that the fall detection runs only once when the component mounts

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="heart"
          size={100}
          color={heartRateStatus < 60 || heartRateStatus > 100 ? "red" : "#4CAF50"}
        />
        <Text style={styles.title}>Monitoring in Progress...</Text>
      </View>

      <Text style={styles.subtitle}>Real-time Health Data</Text>

      <View style={styles.dataContainer}>
        <View style={styles.dataCard}>
          <Ionicons
            name="heart"
            size={30}
            color={heartRateStatus < 60 || heartRateStatus > 100 ? "red" : "#4CAF50"}
          />
          <Text
            style={[styles.dataText, { color: heartRateStatus < 60 || heartRateStatus > 100 ? "red" : "#4CAF50" }]}
          >
            Heart Rate: {heartRateStatus} bpm
          </Text>
        </View>

        <View style={styles.dataCard}>
          <Ionicons
            name="pulse"
            size={30}
            color={bpStatus > 130 ? "red" : bpStatus < 90 ? "#FFC107" : "#4CAF50"}
          />
          <Text
            style={[styles.dataText, { color: bpStatus > 130 ? "red" : bpStatus < 90 ? "#FFC107" : "#4CAF50" }]}
          >
            Blood Pressure: {bpStatus} mmHg
          </Text>
        </View>

        <View style={styles.dataCard}>
          <Ionicons
            name="thermometer"
            size={30}
            color={temperatureStatus < 97.5 || temperatureStatus > 99.5 ? "red" : "#4CAF50"}
          />
          <Text
            style={[styles.dataText, { color: temperatureStatus < 97.5 || temperatureStatus > 99.5 ? "red" : "#4CAF50" }]}
          >
            Temperature: {temperatureStatus}°F
          </Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Health Trends</Text>

      <LineChart
        data={heartRateData}
        width={Dimensions.get("window").width - 32}
        height={220}
        chartConfig={{
          backgroundColor: "#4CAF50",
          backgroundGradientFrom: "#4CAF50",
          backgroundGradientTo: "#81C784",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />

      <LineChart
        data={bpData}
        width={Dimensions.get("window").width - 32}
        height={220}
        chartConfig={{
          backgroundColor: "#2196F3",
          backgroundGradientFrom: "#2196F3",
          backgroundGradientTo: "#64B5F6",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />

      <LineChart
        data={temperatureData}
        width={Dimensions.get("window").width - 32}
        height={220}
        chartConfig={{
          backgroundColor: "#FF9800",
          backgroundGradientFrom: "#FF9800",
          backgroundGradientTo: "#FFB74D",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />

      <Text style={styles.subtitle}>Fall Detection History</Text>

      {fallRecords.map((record, index) => (
        <View key={index} style={styles.fallRecord}>
          <Ionicons name="warning" size={30} color="#FF5252" />
          <Text style={styles.recordText}>
            Fall detected at angle: {record.angle}° on {record.timestamp}
          </Text>
          <Text style={styles.recordDescription}>{record.description}</Text>
        </View>
      ))}

      {/* <Footer activeScreen="MonitoringScreen" navigation={navigator} /> */}
    </ScrollView>
  );
};

const calculateFallAngle = (x: number, y: number, z: number): number => {
  const angle = Math.atan2(y, Math.sqrt(x * x + z * z)) * (180 / Math.PI);
  return angle;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 16,
  },
  dataContainer: {
    marginBottom: 20,
  },
  dataCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  dataText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
  },
  chart: {
    marginVertical: 16,
    borderRadius: 16,
  },
  fallRecord: {
    backgroundColor: "white",
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
  recordText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 16,
  },
  recordDescription: {
    fontSize: 14,
    color: "#666",
    marginLeft: 16,
  },
});

export default MonitoringScreen;