// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons'; // Ensure to import Ionicons

// type RootStackParamList = {
//   Login: undefined;
//   Home: undefined;
//   Register: undefined;  // Add Register screen to the type list
// };

// type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// interface LoginScreenProps {
//   navigation: LoginScreenNavigationProp;
// }

// const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (username === 'user' && password === 'password') {
//       // Simulating a successful login
//       Alert.alert('Login Successful', 'You have logged in successfully!');
//       navigation.navigate('Home');
//     } else {
//       Alert.alert('Login Failed', 'Please check your username or password');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.authContainer}>
//         <Ionicons name="log-in-outline" size={100} color="#007bff" />
//         <Text style={styles.authHeading}>Welcome Back!</Text>
//         <Text style={styles.authSubHeading}>
//           Please login to access the app.
//         </Text>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>

//       <Text style={styles.switchText}>
//         Don’t have an account?  
//          <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>
//            Register
//         </Text>
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   authContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   authHeading: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#333",
//     marginVertical: 10,
//     textAlign: "center",
//   },

//   authSubHeading: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     marginBottom: 10,
//   },

//   switchText: {
//     fontSize: 16,
//     color: '#6c757d',
//     textAlign: 'center',
//     marginTop: 15,
//   },
//   linkText: {
//     fontSize: 16,
//     color: '#007bff',
//     textDecorationLine: 'underline',
//   },
//   input: {
//     height: 45,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingLeft: 10,
//     borderRadius: 15,  // Makes input fields rounded
//     width: '90%',  // Centers the input box and reduces its width
//     alignSelf: 'center',  // Centers the input box horizontally
//   },
//   button: {
//     backgroundColor: '#2196F3',
//     padding: 15,
//     borderRadius: 50,
//     width: '90%',  // Centers the button and reduces its width
//     alignSelf: 'center',  // Centers the button horizontally
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default LoginScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      Alert.alert('Login Successful', 'You have logged in successfully!');
      navigation.navigate('Home');
    } else {
      Alert.alert('Login Failed', 'Please check your username or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <View style={styles.iconBackground}>
          <Ionicons name="log-in-outline" size={60} color="#fff" />
        </View>
        <Text style={styles.authHeading}>Welcome Back!</Text>
        <Text style={styles.authSubHeading}>
          Please login to access the app.
        </Text>
      </View>

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

      <Text style={styles.switchText}>
        Don’t have an account?  
        <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>
          Register
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  authContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  iconBackground: {
    backgroundColor: '#2196F3',
    borderRadius: 50,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
    width: '90%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;