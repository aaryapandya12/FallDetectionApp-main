import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = async () => {
  //   if (!username || !password) {
  //     Alert.alert('Incomplete Fields', 'Please fill in all fields');
  //     return;
  //   }

  //   try {
  //     // Fetch stored user data from AsyncStorage
  //     const storedData = await AsyncStorage.getItem('userData');
  //     if (storedData) {
  //       const userData = JSON.parse(storedData);

  //       // Validate username and password
  //       if (username === userData.username && password === userData.password) {
  //         Alert.alert('Login Successful', 'You have logged in successfully!');
  //         navigation.navigate('HomeScreen');
  //       } else {
  //         Alert.alert('Login Failed', 'Invalid username or password');
  //       }
  //     } else {
  //       Alert.alert('Login Failed', 'No registered user found');
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', 'An error occurred while logging in');
  //   }
  // };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Incomplete Fields', 'Please fill in all fields');
      return;
    }
  
    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const userData = JSON.parse(storedData);
  
        if (username === userData.username && password === userData.password) {
          // Store login state
          await AsyncStorage.setItem('isLoggedIn', 'true');
          Alert.alert('Login Successful', 'You have logged in successfully!');
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Login Failed', 'Invalid username or password');
        }
      } else {
        Alert.alert('Login Failed', 'No registered user found');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while logging in');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Ionicons name="log-in-outline" size={60} color="#fff" />
        </View>
      </View>

      <Text style={styles.authHeading}>Welcome Back!</Text>
      <Text style={styles.authSubHeading}>
        Please login to access the app.
      </Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.subText}>Don’t have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconBackground: {
    backgroundColor: '#2196F3',
    borderRadius: 50,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  authSubHeading: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    marginTop: 20,
    color: '#2196F3',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;