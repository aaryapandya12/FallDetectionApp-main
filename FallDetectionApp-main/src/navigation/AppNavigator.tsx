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
import LoginScreen from '../components/LoginScreen';
import WatchScreen from '../components/WatchScreen';
import MedicineReminderScreen from '../components/MedicineReminder'; // Import the new screen
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Define the parameter list for the screens
export type RootStackParamList = {
  Register: undefined;
  PersonalDetail: undefined;
  HomeScreen: undefined;
  SettingsScreen: undefined;
  MonitoringScreen: undefined;
  NotificationsScreen: undefined;
  LoginScreen: undefined;
  WatchScreen: undefined;
  MedicineReminder: undefined; // Add MedicineReminder screen
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
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
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WatchScreen"
          component={WatchScreen}
          options={{ title: 'Watch' }}
        />
        <Stack.Screen
          name="MedicineReminder"
          component={MedicineReminderScreen} // Add MedicineReminder screen
          options={{ title: 'Medicine Reminder' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

