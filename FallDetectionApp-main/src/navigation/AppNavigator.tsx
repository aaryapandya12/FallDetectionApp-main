import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Import Screens
import RegisterScreen from "../components/RegisterScreen";
import PersonalDetailScreen from "../components/PersonalDetailScreen";
import HomeScreen from "../components/HomeScreen";
import SettingsScreen from "../components/SettingsScreen";
import MonitoringScreen from "../components/MonitoringScreen";
import NotificationsScreen from "../components/NotificationsScreen";
import LoginScreen from "../components/LoginScreen";
import LoadingScreen from "../components/LoadingScreen";
import HeartScreen from "../components/HeartScreen";
import WatchScreen from "../components/WatchScreen";
import MedicineReminderScreen from "../components/MedicineReminder"; // Import the new screen
import * as Notifications from "expo-notifications";
import Pressure from "../components/Pressure";
import TemperatureScreen from "../components/TemperatureScreen";
import OxygenScreen from "../components/OxygenScreen";
import Footsteps from "../components/Footsteps";
import MyProfileScreen from "../components/MyProfileScreen";
import ExerciseScreen from "../components/ExerciseScreen"
import Welcome from "../components/Welcome"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Define the UserData type
export type UserData = {
  name: string;
  age: string;
  height: string;
  weight: string;
  emergencyContact1: string;
  emergencyContact2: string;
};

// Define the parameter list for the screens
export type RootStackParamList = {
  Register: undefined;
  // PersonalDetail: undefined;
  HomeScreen: undefined;
  PersonalDetail: { email: string };
  // HomeScreen: { userData: UserData };
  SettingsScreen: undefined;
  MonitoringScreen: undefined;
  NotificationsScreen: undefined;
  LoginScreen: undefined;
  WatchScreen: undefined;
  LoadingScreen: undefined;
  MedicineReminder: undefined; // Add MedicineReminder screen
  HeartScreen: undefined;
  Pressure: undefined;
  TemperatureScreen: undefined;
  OxygenScreen: undefined;
  Footsteps: undefined;
  MyProfileScreen: { userData: UserData }; // Add userData parameter for MyProfileScreen
  ExerciseScreen:undefined;
  Welcome:undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen">
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
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
          options={{ title: "Settings" }}
        />
        <Stack.Screen
          name="MonitoringScreen"
          component={MonitoringScreen}
          options={{ title: "Monitoring" }}
        />
        <Stack.Screen
          name="MyProfileScreen"
          component={MyProfileScreen}
          options={{ title: "My Profile" }} // Add a title for MyProfileScreen
        />
        <Stack.Screen
          name="HeartScreen"
          component={HeartScreen}
        />

<Stack.Screen
          name="Welcome"
          component={Welcome}
        />

<Stack.Screen
          name="ExerciseScreen"
          component={ExerciseScreen}
        />
        <Stack.Screen
          name="Pressure"
          component={Pressure}
        />
        <Stack.Screen
          name="TemperatureScreen"
          component={TemperatureScreen}
        />
        <Stack.Screen
          name="OxygenScreen"
          component={OxygenScreen}
        />
        <Stack.Screen
          name="Footsteps"
          component={Footsteps}
        />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={{ title: "Notifications" }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WatchScreen"
          component={WatchScreen}
          options={{ title: "Watch" }}
        />
        <Stack.Screen
          name="MedicineReminder"
          component={MedicineReminderScreen} // Add MedicineReminder screen
          options={{ title: "Medicine Reminder" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;