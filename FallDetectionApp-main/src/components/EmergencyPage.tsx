import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const EmergencyContactPage = ({navigation}) => {
  const emergencyContacts = [
    { name: 'Ambulance', phoneNumber: '102', icon: 'local-hospital' },
    { name: 'Family Member', phoneNumber: '+1234567890', icon: 'person' },
  ];

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <LinearGradient colors={['#f7f7f7', '#e6f4f1']} style={styles.container}>
      <Image source={require('../../assets/gps.jpg')} style={styles.headerImage} />
      <Text style={styles.title}>Emergency Contacts</Text>
      <Text style={styles.subtitle}>Tap to call for help</Text>
      {emergencyContacts.map((contact, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handleCall(contact.phoneNumber)}
        >
          <LinearGradient
            colors={['#ff7f50', '#ff4444']}
            style={styles.gradient}
          >
            <View style={styles.buttonContent}>
              <MaterialIcons name={contact.icon} size={30} color="#fff" />
              <Text style={styles.buttonText}>{contact.name}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ))}
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Locations')}
      >
        <LinearGradient
          colors={['#4c669f', '#3b5998']}
          style={styles.gradient}
        >
          <View style={styles.buttonContent}>
            <MaterialIcons name="local-hospital" size={30} color="#fff" />
            <Text style={styles.buttonText}>Find Nearby Hospitals</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    borderRadius: 15,
    marginVertical: 10,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  gradient: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
  },
});

export default EmergencyContactPage;
