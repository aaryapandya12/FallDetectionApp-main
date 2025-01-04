// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons';
// import { RootStackParamList, UserData } from '../navigation/AppNavigator'; // Import RootStackParamList and UserData

// // Type for navigation prop
// type PersonalDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PersonalDetail'>;

// interface PersonalDetailScreenProps {
//   navigation: PersonalDetailScreenNavigationProp;
// }

// const PersonalDetailScreen: React.FC<PersonalDetailScreenProps> = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [height, setHeight] = useState('');
//   const [weight, setWeight] = useState('');
//   const [emergencyContact1, setEmergencyContact1] = useState('');
//   const [emergencyContact2, setEmergencyContact2] = useState('');

//   const handleSave = () => {
//     if (name && age && height && weight && emergencyContact1 && emergencyContact2) {
//       // Navigate to MyProfileScreen with user data as params
//       const userData: UserData = {
//         name,
//         age,
//         height,
//         weight,
//         emergencyContact1,
//         emergencyContact2,
//       };
//       // navigation.navigate('MyProfileScreen', { userData });
//       navigation.navigate('HomeScreen', { userData: userData });
//     } else {
//       Alert.alert('Error', 'Please fill in all details');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.iconContainer}>
//         <Ionicons name="person-circle-outline" size={100} color="#007bff" />
//       </View>

//       <Text style={styles.header}>Personal Details</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Age"
//         value={age}
//         onChangeText={setAge}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Height (cm)"
//         value={height}
//         onChangeText={setHeight}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Weight (kg)"
//         value={weight}
//         onChangeText={setWeight}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Emergency Contact 1"
//         value={emergencyContact1}
//         onChangeText={setEmergencyContact1}
//         keyboardType="phone-pad"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Emergency Contact 2"
//         value={emergencyContact2}
//         onChangeText={setEmergencyContact2}
//         keyboardType="phone-pad"
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSave}>
//         <Text style={styles.buttonText}>Save</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#f7f7f7',
//   },
//   iconContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#007bff',
//   },
//   input: {
//     height: 45,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingLeft: 10,
//     borderRadius: 10,
//     width: '90%',
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 50,
//     width: '80%',
//     alignSelf: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default PersonalDetailScreen;


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, UserData } from '../navigation/AppNavigator'; // Import RootStackParamList and UserData

// Type for navigation prop
type PersonalDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PersonalDetail'>;

interface PersonalDetailScreenProps {
  navigation: PersonalDetailScreenNavigationProp;
}

const PersonalDetailScreen: React.FC<PersonalDetailScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [emergencyContact1, setEmergencyContact1] = useState('');
  const [emergencyContact2, setEmergencyContact2] = useState('');

  const handleSave = () => {
    if (name && age && height && weight && emergencyContact1 && emergencyContact2) {
      // Navigate to HomeScreen with user data as params
      const userData: UserData = {
        name,
        age,
        height,
        weight,
        emergencyContact1,
        emergencyContact2,
      };
      navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Error', 'Please fill in all details');
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