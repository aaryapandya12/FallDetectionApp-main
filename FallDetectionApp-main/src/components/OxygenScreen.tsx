import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OxygenScreen: React.FC = () => {
  const navigation = useNavigation();
  const [bloodOxygen, setBloodOxygen] = useState(97); // Simulated real-time blood oxygen
  const [isMonitoring, setIsMonitoring] = useState(false);
  const animatedValue = new Animated.Value(0);

  // Simulate real-time blood oxygen updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMonitoring) {
      interval = setInterval(() => {
        setBloodOxygen(Math.floor(Math.random() * (100 - 90 + 1) + 90)); // Random blood oxygen between 90-100
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isMonitoring]);

  // Animation for the blood oxygen value
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [bloodOxygen]);

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

  // Sample blood oxygen data for the graph
  const bloodOxygenData = {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
    datasets: [
      {
        data: [97, 96, 98, 97, 99, 98, 97], // Example blood oxygen values
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
        <Text style={styles.headerTitle}>Blood Oxygen Monitor</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Real-Time Blood Oxygen Display */}
        <View style={styles.realTimeContainer}>
          <Animated.Text style={[styles.oxygenValue, animatedStyle]}>
            {bloodOxygen}%
          </Animated.Text>
          <Text style={styles.oxygenLabel}>Current Blood Oxygen Level</Text>
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

        {/* Oxygen Level Ranges */}
        <View style={styles.card}>
          <Text style={styles.title}>Oxygen Level Ranges</Text>
          <View style={styles.rangesContainer}>
            <View style={[styles.range, { backgroundColor: '#E8F5E9' }]}>
              <Text style={styles.rangeLabel}>Normal</Text>
              <Text style={styles.rangeValue}>95% - 100%</Text>
            </View>
            <View style={[styles.range, { backgroundColor: '#FFF3E0' }]}>
              <Text style={styles.rangeLabel}>Low</Text>
              <Text style={styles.rangeValue}>90% - 94%</Text>
            </View>
            <View style={[styles.range, { backgroundColor: '#FFEBEE' }]}>
              <Text style={styles.rangeLabel}>Critical</Text>
              <Text style={styles.rangeValue}>≤ 89%</Text>
            </View>
          </View>
        </View>

        {/* Historical Trends */}
        <View style={styles.card}>
          <Text style={styles.title}>Historical Trends</Text>
          <LineChart
            data={bloodOxygenData}
            width={Dimensions.get('window').width - 40} // Chart width
            height={220} // Chart height
            yAxisLabel=""
            yAxisSuffix="%"
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
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
            • A normal blood oxygen level is typically between 95% and 100%.
          </Text>
          <Text style={styles.tipText}>
            • If your blood oxygen level is below 90%, seek medical attention immediately.
          </Text>
          <Text style={styles.tipText}>
            • Practice deep breathing exercises to improve oxygen levels.
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
  oxygenValue: {
    fontSize: 64,
    fontWeight: '600',
    color: '#4A90E2', // Blue
  },
  oxygenLabel: {
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

export default OxygenScreen;