import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import Screens
import RegisterScreen from '../components/RegisterScreen';
import PersonalDetailScreen from '../components/PersonalDetailScreen';
import HomeScreen from '../components/HomeScreen';
import SettingsScreen from '../components/SettingsScreen';
import MonitoringScreen from '../components/MonitoringScreen';
import NotificationsScreen from '../components/NotificationsScreen';
import LoginScreen from '../components/LoginScreen'; // Added LoginScreen
import WatchScreen from '../components/WatchScreen'

// Define the parameter list for the screens
export type RootStackParamList = {
  Register: undefined;
  PersonalDetail: undefined;
  HomeScreen: undefined;
  SettingsScreen: undefined;
  MonitoringScreen: undefined;
  NotificationsScreen: undefined;
  LoginScreen: undefined; // Added LoginScreen
  WatchScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PersonalDetail"
          component={PersonalDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name="MonitoringScreen"
          component={MonitoringScreen}
          options={{ title: 'Monitoring' }}
        />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={{ title: 'Notifications' }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen} // New LoginScreen added
          options={{ headerShown: false }}
        />
        {/* Uncomment and add WatchScreen if you want */}
        <Stack.Screen
          name="WatchScreen"
          component={WatchScreen}
          options={{ title: 'Watch' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;




