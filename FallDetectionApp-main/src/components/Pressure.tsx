import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Pressure: React.FC = () => {
  const navigation = useNavigation();
  const [bloodPressure, setBloodPressure] = useState({ systolic: 120, diastolic: 80 }); // Simulated real-time blood pressure
  const [isMonitoring, setIsMonitoring] = useState(false);
  const animatedValue = new Animated.Value(0);

  // Simulate real-time blood pressure updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMonitoring) {
      interval = setInterval(() => {
        setBloodPressure({
          systolic: Math.floor(Math.random() * (140 - 90 + 1) + 90), // Random systolic between 90-140
          diastolic: Math.floor(Math.random() * (90 - 60 + 1) + 60), // Random diastolic between 60-90
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isMonitoring]);

  // Animation for the blood pressure value
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [bloodPressure]);

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

  // Sample blood pressure data for the graph
  const bloodPressureData = {
    // labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [120, 125, 130, 128, 135, 132, 130], // Example systolic values
        color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`, // Line color
        strokeWidth: 3, // Line width
      },
    ],
  };

  return (
    <View style={styles.container}>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Real-Time Blood Pressure Display */}
        <View style={styles.realTimeContainer}>
          <Animated.Text style={[styles.bloodPressureValue, animatedStyle]}>
            {bloodPressure.systolic}/{bloodPressure.diastolic}
          </Animated.Text>
          <Text style={styles.bloodPressureLabel}>Current Blood Pressure (mmHg)</Text>
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

         {/* Historical Trends */}
         <View style={styles.card}>
          <Text style={styles.title}>Historical Trends</Text>
          <LineChart
            data={bloodPressureData}
            width={Dimensions.get('window').width - 60} // Chart width
            height={230} // Chart height
            yAxisLabel=""
            yAxisSuffix=" mmHg"
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


        {/* Blood Pressure Categories */}
        <View style={styles.card}>
          <Text style={styles.title}>Blood Pressure Categories</Text>
          <View style={styles.categoriesContainer}>
            <View style={[styles.category, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="heart" size={24} color="#2C3E50" />
              <Text style={styles.categoryLabel}>Normal</Text>
              <Text style={styles.categoryValue}>≤ 120/80 mmHg</Text>
            </View>
            <View style={[styles.category, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="alert" size={24} color="#2C3E50" />
              <Text style={styles.categoryLabel}>Elevated</Text>
              <Text style={styles.categoryValue}>120-129/80 mmHg</Text>
            </View>
            <View style={[styles.category, { backgroundColor: '#FFEBEE' }]}>
              <Ionicons name="warning" size={24} color="#2C3E50" />
              <Text style={styles.categoryLabel}>Hypertension</Text>
              <Text style={styles.categoryValue}>≥ 130/80 mmHg</Text>
            </View>
          </View>
        </View>

      
        {/* Health Tips */}
        <View style={styles.card}>
          <Text style={styles.title}>Health Tips</Text>
          <View style={styles.tipContainer}>
            <Ionicons name="nutrition" size={20} color="#4A90E2" />
            <Text style={styles.tipText}>Maintain a healthy diet low in sodium and high in fruits and vegetables.</Text>
          </View>
          <View style={styles.tipContainer}>
            <Ionicons name="walk" size={20} color="#4A90E2" />
            <Text style={styles.tipText}>Regular physical activity can help lower blood pressure.</Text>
          </View>
          <View style={styles.tipContainer}>
            <Ionicons name="medkit" size={20} color="#4A90E2" />
            <Text style={styles.tipText}>Monitor your blood pressure regularly and consult a doctor if it's consistently high.</Text>
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
  bloodPressureValue: {
    fontSize: 64,
    fontWeight: '600',
    color: '#4A90E2', // Blue
    fontFamily: 'Roboto', // Use a modern font
  },
  bloodPressureLabel: {
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
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  category: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50', // Dark gray
    fontFamily: 'Roboto', // Use a modern font
    marginTop: 8,
  },
  categoryValue: {
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

export default Pressure;