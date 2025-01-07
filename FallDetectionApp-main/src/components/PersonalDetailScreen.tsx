import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/AppNavigator';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';

type PersonalDetailScreenRouteProp = RouteProp<RootStackParamList, 'PersonalDetail'>;

type PersonalDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PersonalDetail'>;

interface PersonalDetailScreenProps {
  navigation: PersonalDetailScreenNavigationProp;
  route: PersonalDetailScreenRouteProp;
}

const PersonalDetailScreen: React.FC<PersonalDetailScreenProps> = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [emergencyContact1, setEmergencyContact1] = useState('');
  const [emergencyContact2, setEmergencyContact2] = useState('');

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params?.email]);

  const validateAge = (age: string) => {
    const ageNumber = parseInt(age, 10);
    return !isNaN(ageNumber) && ageNumber >= 1 && ageNumber <= 120;
  };

  const validateHeight = (height: string) => {
    const heightNumber = parseInt(height, 10);
    return !isNaN(heightNumber) && heightNumber >= 50 && heightNumber <= 250;
  };

  const validateWeight = (weight: string) => {
    const weightNumber = parseInt(weight, 10);
    return !isNaN(weightNumber) && weightNumber >= 10 && weightNumber <= 300;
  };

  const validateEmergencyContact = (contact: string) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contact);
  };

  const handleSave = async () => {
    if (!email || !name || !age || !height || !weight || !emergencyContact1 || !emergencyContact2) {
      Alert.alert('Error', 'Please fill in all details');
      return;
    }

    if (!validateAge(age)) {
      Alert.alert('Invalid Age', 'Please enter a valid age (1-120)');
      return;
    }

    if (!validateHeight(height)) {
      Alert.alert('Invalid Height', 'Please enter a valid height (50-250 cm)');
      return;
    }

    if (!validateWeight(weight)) {
      Alert.alert('Invalid Weight', 'Please enter a valid weight (10-300 kg)');
      return;
    }

    if (!validateEmergencyContact(emergencyContact1)) {
      Alert.alert('Invalid Emergency Contact 1', 'Please enter a valid 10-digit phone number');
      return;
    }

    if (!validateEmergencyContact(emergencyContact2)) {
      Alert.alert('Invalid Emergency Contact 2', 'Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const userData = {
        email,
        name,
        age,
        height,
        weight,
        emergencyContact1,
        emergencyContact2,
      };

      const response = await axios.post('http://192.168.234.143:5000/api/save-details', userData);

      if (response.status === 200) {
        Alert.alert('Success', 'Details saved successfully');
        navigation.navigate('Welcome');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save details');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="person-circle-outline" size={100} color="#007bff" />
      </View>

      <Text style={styles.header}>Personal Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Emergency Contact 1"
        value={emergencyContact1}
        onChangeText={setEmergencyContact1}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Emergency Contact 2"
        value={emergencyContact2}
        onChangeText={setEmergencyContact2}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007bff',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 50,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PersonalDetailScreen;
