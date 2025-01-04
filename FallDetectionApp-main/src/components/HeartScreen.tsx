import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HeartScreen: React.FC = () => {
  const navigation = useNavigation();
  const [heartRate, setHeartRate] = useState(72); // Simulated real-time heart rate
  const [isMonitoring, setIsMonitoring] = useState(false);
  const animatedValue = new Animated.Value(0);

  // Simulate real-time heart rate updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMonitoring) {
      interval = setInterval(() => {
        setHeartRate(Math.floor(Math.random() * (80 - 60 + 1) + 60)); // Random heart rate between 60-80
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isMonitoring]);

  // Animation for the heart rate value
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [heartRate]);

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

  // Sample heart rate data for the graph
  const heartRateData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [72, 75, 74, 78, 80, 77, 76], // Example heart rate values
        color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`, // Line color
        strokeWidth: 3, // Line width
      },
    ],
  };

  return (
    <View style={styles.container}>
    
     

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Real-Time Heart Rate Display */}
        <View style={styles.realTimeContainer}>
          <Animated.Text style={[styles.heartRateValue, animatedStyle]}>
            {heartRate}
          </Animated.Text>
          <Text style={styles.heartRateLabel}>Current Heart Rate (bpm)</Text>
        </View>

        {/* Start/Stop Monitoring Button */}
        <TouchableOpacity
          style={[styles.monitorButton, isMonitoring && styles.stopButton]}
          onPress={() => setIsMonitoring(!isMonitoring)}
        >
          <Icon name={isMonitoring ? 'stop' : 'play-arrow'} size={24} color="#fff" />
          <Text style={styles.monitorButtonText}>
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </Text>
        </TouchableOpacity>

  
        {/* Historical Trends */}
        <View style={styles.card}>
          <Text style={styles.title}>Historical Trends</Text>
          <LineChart
            data={heartRateData}
            width={Dimensions.get('window').width - 60} // Chart width
            height={220} // Chart height
            yAxisLabel=""
            yAxisSuffix=" bpm"
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

         {/* Heart Rate Zones */}
         <View style={styles.card}>
          <Text style={styles.title}>Heart Rate Zones</Text>
          <View style={styles.zonesContainer}>
            <View style={[styles.zone, { backgroundColor: '#E8F5E9' }]}>
              <Icon name="favorite-border" size={24} color="#2C3E50" />
              <Text style={styles.zoneLabel}>Resting</Text>
              <Text style={styles.zoneValue}>60-70 bpm</Text>
            </View>
            <View style={[styles.zone, { backgroundColor: '#FFF3E0' }]}>
              <Icon name="whatshot" size={24} color="#2C3E50" />
              <Text style={styles.zoneLabel}>Fat Burn</Text>
              <Text style={styles.zoneValue}>70-80 bpm</Text>
            </View>
            <View style={[styles.zone, { backgroundColor: '#FFEBEE' }]}>
              <Icon name="directions-run" size={24} color="#2C3E50" />
              <Text style={styles.zoneLabel}>Cardio</Text>
              <Text style={styles.zoneValue}>80-90 bpm</Text>
            </View>
            <View style={[styles.zone, { backgroundColor: '#F3E5F5' }]}>
              <Icon name="trending-up" size={24} color="#2C3E50" />
              <Text style={styles.zoneLabel}>Peak</Text>
              <Text style={styles.zoneValue}>90+ bpm</Text>
            </View>
          </View>
        </View>


        {/* Health Tips */}
        <View style={styles.card}>
          <Text style={styles.title}>Health Tips</Text>
          <View style={styles.tipContainer}>
            <Icon name="favorite" size={20} color="#4A90E2" />
            <Text style={styles.tipText}>Maintain a resting heart rate between 60-100 bpm.</Text>
          </View>
          <View style={styles.tipContainer}>
            <Icon name="directions-run" size={20} color="#4A90E2" />
            <Text style={styles.tipText}>Regular exercise can improve heart health.</Text>
          </View>
          <View style={styles.tipContainer}>
            <Icon name="local-drink" size={20} color="#4A90E2" />
            <Text style={styles.tipText}>Stay hydrated and avoid excessive caffeine.</Text>
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
    backgroundColor: '#F5F7FA',
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
  heartRateValue: {
    fontSize: 64,
    fontWeight: '600',
    color: '#4A90E2', // Blue
    fontFamily: 'Roboto', // Use a modern font
  },
  heartRateLabel: {
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
  zonesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  zone: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  zoneLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50', // Dark gray
    fontFamily: 'Roboto', // Use a modern font
    marginTop: 8,
  },
  zoneValue: {
    fontSize: 14,
    color: '#7F8C8D', // Gray
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

export default HeartScreen;