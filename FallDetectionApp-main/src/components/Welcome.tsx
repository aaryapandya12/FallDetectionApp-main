import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#F9F9F9', '#E8E8E8']} // Light gradient background
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Animated Logo */}
      <Animatable.View animation="fadeInDown" duration={1500} style={styles.logoContainer}>
        <Image source={require('../../assets/image1.jpg')} style={styles.logo} />
        <Text style={styles.appName}>ElderCare</Text>
      </Animatable.View>

      {/* Welcome Text */}
      <Animatable.View animation="fadeInUp" duration={1500} style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome to ElderCare</Text>
        <Text style={styles.subText}>
          Your trusted companion for elderly care and health monitoring.
        </Text>
      </Animatable.View>

      {/* Get Started Button */}
      <Animatable.View animation="fadeInUp" duration={1500} style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333', // Dark gray for contrast
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333', // Dark gray for contrast
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#666666', // Medium gray for subtlety
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#FFFFFF', // White button
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, // Subtle shadow
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6C5CE7', // Soft purple for accent
  },
});

export default WelcomeScreen;