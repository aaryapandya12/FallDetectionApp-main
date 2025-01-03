import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TemperatureScreen: React.FC = () => {
  const navigation = useNavigation();
  const [temperature, setTemperature] = useState(98.6); // Simulated real-time temperature
  const [isMonitoring, setIsMonitoring] = useState(false);
  const animatedValue = new Animated.Value(0);

  // Simulate real-time temperature updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMonitoring) {
      interval = setInterval(() => {
        setTemperature(Math.floor(Math.random() * (100 - 95 + 1) + 95)); // Random temperature between 95-100
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isMonitoring]);

  // Animation for the temperature value
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [temperature]);

  const animatedStyle = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
        }),
      },
    ],
  };

  // Sample temperature data for the graph
  const temperatureData = {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
    datasets: [
      {
        data: [98.6, 98.7, 98.5, 98.8, 99.0, 98.9, 98.7], // Example temperature values
        color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`, // Line color
        strokeWidth: 3, // Line width
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Temperature Monitor</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Real-Time Temperature Display */}
        <View style={styles.realTimeContainer}>
          <Animated.Text style={[styles.temperatureValue, animatedStyle]}>
            {temperature}°F
          </Animated.Text>
          <Text style={styles.temperatureLabel}>Current Body Temperature</Text>
        </View>

        {/* Start/Stop Monitoring Button */}
        <TouchableOpacity
          style={[styles.monitorButton, isMonitoring && styles.stopButton]}
          onPress={() => setIsMonitoring(!isMonitoring)}
        >
          <Text style={styles.monitorButtonText}>
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </Text>
        </TouchableOpacity>

        {/* Temperature Ranges */}
        <View style={styles.card}>
          <Text style={styles.title}>Temperature Ranges</Text>
          <View style={styles.rangesContainer}>
            <View style={[styles.range, { backgroundColor: '#E8F5E9' }]}>
              <Text style={styles.rangeLabel}>Normal</Text>
              <Text style={styles.rangeValue}>97°F - 99°F</Text>
            </View>
            <View style={[styles.range, { backgroundColor: '#FFF3E0' }]}>
              <Text style={styles.rangeLabel}>Fever</Text>
              <Text style={styles.rangeValue}>≥ 100.4°F</Text>
            </View>
            <View style={[styles.range, { backgroundColor: '#FFEBEE' }]}>
              <Text style={styles.rangeLabel}>Hypothermia</Text>
              <Text style={styles.rangeValue}>≤ 95°F</Text>
            </View>
          </View>
        </View>

        {/* Historical Trends */}
        <View style={styles.card}>
          <Text style={styles.title}>Historical Trends</Text>
          <LineChart
            data={temperatureData}
            width={Dimensions.get('window').width - 40} // Chart width
            height={220} // Chart height
            yAxisLabel=""
            yAxisSuffix="°F"
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`, // Line color
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '5', // Dot radius
                strokeWidth: '2',
                stroke: '#4A90E2', // Dot stroke color
              },
            }}
            bezier // Smooth line
            style={styles.chart}
          />
        </View>

        {/* Health Tips */}
        <View style={styles.card}>
          <Text style={styles.title}>Health Tips</Text>
          <Text style={styles.tipText}>
            • A normal body temperature is typically around 98.6°F (37°C).
          </Text>
          <Text style={styles.tipText}>
            • If your temperature is above 100.4°F, you may have a fever. Rest and stay hydrated.
          </Text>
          <Text style={styles.tipText}>
            • If your temperature is below 95°F, seek medical attention as it may indicate hypothermia.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // Light gray background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2C3E50', // Dark gray
  },
  scrollContent: {
    padding: 20,
  },
  realTimeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temperatureValue: {
    fontSize: 64,
    fontWeight: '600',
    color: '#4A90E2', // Blue
  },
  temperatureLabel: {
    fontSize: 16,
    color: '#7F8C8D', // Gray
  },
  monitorButton: {
    backgroundColor: '#4A90E2', // Blue
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  stopButton: {
    backgroundColor: '#E74C3C', // Red
  },
  monitorButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50', // Dark gray
    marginBottom: 16,
  },
  rangesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  range: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  rangeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50', // Dark gray
  },
  rangeValue: {
    fontSize: 14,
    color: '#7F8C8D', // Gray
  },
  tipText: {
    fontSize: 16,
    color: '#7F8C8D', // Gray
    marginBottom: 8,
  },
  chart: {
    borderRadius: 16,
  },
});

export default TemperatureScreen;