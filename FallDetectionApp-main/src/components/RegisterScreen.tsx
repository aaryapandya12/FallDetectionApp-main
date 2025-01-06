// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// type RootStackParamList = {
//   Register: undefined;
//   PersonalDetail: undefined;
//   LoginScreen: undefined;
// };

// type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

// interface RegisterScreenProps {
//   navigation: RegisterScreenNavigationProp;
// }

// const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleRegister = async () => {
//     if (email && username && password && confirmPassword) {
//       if (password !== confirmPassword) {
//         Alert.alert('Password Mismatch', 'Your passwords do not match.');
//         return;
//       }
  
//       try {
//         const userData = { email, username, password };
//         // const response = await axios.post('http://localhost:5000/register', userData);
//         const response = await axios.post('http://192.168.91.143:5000/register', userData);
  
//         if (response.status === 201) {
//           await AsyncStorage.setItem('userData', JSON.stringify(userData));
//           await AsyncStorage.setItem('isLoggedIn', 'true');
//           Alert.alert('Successfully Registered', 'You have been registered successfully!');
//           navigation.navigate('PersonalDetail');
//         }
//       } catch (error) {
//         Alert.alert('Error', 'There was an error saving your data.');
//       }
//     } else {
//       Alert.alert('Incomplete Fields', 'Please fill in all fields');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.iconContainer}>
//         <View style={styles.iconBackground}>
//           <Ionicons name="person-add-outline" size={60} color="#fff" />
//         </View>
//       </View>

//       <Text style={styles.authHeading}>Create Your Account</Text>
//       <Text style={styles.authSubHeading}>
//         Please fill in your details to register.
//       </Text>

//       <View style={styles.formContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           placeholderTextColor="#999"
//           value={username}
//           onChangeText={setUsername}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           placeholderTextColor="#999"
//           value={email}
//           onChangeText={setEmail}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="#999"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Confirm Password"
//           placeholderTextColor="#999"
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           secureTextEntry
//         />

//         <TouchableOpacity style={styles.button} onPress={handleRegister}>
//           <Text style={styles.buttonText}>Register</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
//         <Text style={styles.subText}>Already have an account? Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   iconContainer: {
//     marginBottom: 20,
//   },
//   iconBackground: {
//     backgroundColor: '#2196F3',
//     borderRadius: 50,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   authHeading: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   authSubHeading: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   formContainer: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   input: {
//     width: '90%',
//     height: 50,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     fontSize: 16,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#2196F3',
//     padding: 15,
//     borderRadius: 10,
//     width: '90%',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   subText: {
//     marginTop: 20,
//     color: '#2196F3',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default RegisterScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type RootStackParamList = {
  Register: undefined;
  PersonalDetail: {email:string};
  LoginScreen: undefined;
  HomeScreen:undefined;
  Welcome:undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password (minimum 8 characters, at least one letter and one number)
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Incomplete Fields', 'Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters long and contain at least one letter and one number'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Your passwords do not match.');
      return;
    }

    try {
      const userData = { email, username, password };
      const response = await axios.post('http://192.168.49.143:5000/register', userData);

      if (response.status === 201) {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        await AsyncStorage.setItem('isLoggedIn', 'true');
        Alert.alert('Successfully Registered', 'You have been registered successfully!');
        navigation.navigate('PersonalDetail');
        // navigation.navigate('Welcome');
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error saving your data.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Ionicons name="person-add-outline" size={60} color="#fff" />
        </View>
      </View>

      <Text style={styles.authHeading}>Create Your Account</Text>
      <Text style={styles.authSubHeading}>
        Please fill in your details to register.
      </Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.subText}>Already have an account? Login</Text>
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

export default RegisterScreen;