import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';

const Footsteps: React.FC = () => {
  const navigation = useNavigation();
  const [footsteps, setFootsteps] = useState(0); // Simulated real-time footsteps
  const [isMonitoring, setIsMonitoring] = useState(false);
  const animatedValue = new Animated.Value(0);
  const dailyGoal = 10000; // Daily step goal

  // Simulate real-time footsteps updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMonitoring) {
      interval = setInterval(() => {
        setFootsteps((prev) => prev + Math.floor(Math.random() * 100)); // Random steps increment
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isMonitoring]);

  // Animation for the footsteps value
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [footsteps]);

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

  // Sample footsteps data for the graph
  const footstepsData = {
    // labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [0, 1000, 2500, 4000, 6000, 8000, 10000], // Example footsteps values
        color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`, // Line color
        strokeWidth: 3, // Line width
      },
    ],
  };

  return (
    <View style={styles.container}>
   

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Real-Time Footsteps Display */}
        <View style={styles.realTimeContainer}>
          <Animated.Text style={[styles.footstepsValue, animatedStyle]}>
            {footsteps}
          </Animated.Text>
          <Text style={styles.footstepsLabel}>Current Footsteps</Text>
        </View>

          {/* Historical Trends */}
          <View style={styles.card}>
          <Text style={styles.title}>Historical Trends</Text>
          <LineChart
            data={footstepsData}
            width={Dimensions.get('window').width - 60} // Chart width
            height={220} // Chart height
            yAxisLabel=""
            yAxisSuffix=" steps"
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

        {/* Daily Goal Progress */}
        <View style={styles.card}>
          <Text style={styles.title}>Daily Goal Progress</Text>
          <Progress.Bar
            progress={footsteps / dailyGoal}
            width={Dimensions.get('window').width - 80}
            height={10}
            color="#4A90E2"
            unfilledColor="#E0E0E0"
            borderWidth={0}
            borderRadius={8}
          />
          <Text style={styles.progressText}>
            {footsteps} / {dailyGoal} steps
          </Text>
        </View>

        {/* Start/Stop Monitoring Button */}
        <TouchableOpacity
          style={[styles.monitorButton, isMonitoring && styles.stopButton]}
          onPress={() => setIsMonitoring(!isMonitoring)}
        >
          <Ionicons name={isMonitoring ? 'stop' : 'play'} size={24} color="#fff" />
          <Text style={styles.monitorButtonText}>
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </Text>
        </TouchableOpacity>

      

        {/* Health Tips */}
        <View style={styles.card}>
          <Text style={styles.title}>Health Tips</Text>
          <View style={styles.tipContainer}>
            <Ionicons name="walk" size={20} color="#4A90E2" />
            <Text style={styles.tipText}>Aim for at least 10,000 steps per day to maintain a healthy lifestyle.</Text>
          </View>
          <View style={styles.tipContainer}>
            <Ionicons name="heart" size={20} color="#4A90E2" />
            <Text style={styles.tipText}>Walking regularly can improve cardiovascular health and reduce stress.</Text>
          </View>
          <View style={styles.tipContainer}>
            <Ionicons name="fitness" size={20} color="#4A90E2" />
            <Text style={styles.tipText}>Use a pedometer or fitness tracker to monitor your daily steps.</Text>
          </View>
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
    fontFamily: 'Roboto', // Use a modern font
  },
  scrollContent: {
    padding: 20,
  },
  realTimeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footstepsValue: {
    fontSize: 64,
    fontWeight: '600',
    color: '#4A90E2', // Blue
    fontFamily: 'Roboto', // Use a modern font
  },
  footstepsLabel: {
    fontSize: 16,
    color: '#7F8C8D', // Gray
    fontFamily: 'Roboto', // Use a modern font
  },
  monitorButton: {
    backgroundColor: '#4A90E2', // Blue
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stopButton: {
    backgroundColor: '#E74C3C', // Red
  },
  monitorButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'Roboto', // Use a modern font
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
    fontFamily: 'Roboto', // Use a modern font
  },
  progressText: {
    fontSize: 16,
    color: '#7F8C8D', // Gray
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Roboto', // Use a modern font
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 16,
    color: '#7F8C8D', // Gray
    marginLeft: 10,
    fontFamily: 'Roboto', // Use a modern font
  },
  chart: {
    borderRadius: 16,
  },
});

export default Footsteps;