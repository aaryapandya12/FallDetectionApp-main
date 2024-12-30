import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the types for the navigation prop and active icon
type FooterProps = {
  navigation: any;
  activeScreen: string; // The active screen will be passed as a prop
};

const Footer: React.FC<FooterProps> = ({ navigation, activeScreen }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.iconContainer, activeScreen === 'HomeScreen' && styles.activeIcon]}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Ionicons name="home" size={30} color={activeScreen === 'HomeScreen' ? 'blue' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconContainer, activeScreen === 'SettingsScreen' && styles.activeIcon]}
        onPress={() => navigation.navigate('SettingsScreen')}
      >
        <Ionicons name="settings" size={30} color={activeScreen === 'SettingsScreen' ? 'blue' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconContainer, activeScreen === 'MonitoringScreen' && styles.activeIcon]}
        onPress={() => navigation.navigate('MonitoringScreen')}
      >
        <Ionicons name="pulse" size={30} color={activeScreen === 'MonitoringScreen' ? 'blue' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconContainer, activeScreen === 'NotificationsScreen' && styles.activeIcon]}
        onPress={() => navigation.navigate('NotificationsScreen')}
      >
        <Ionicons name="notifications" size={30} color={activeScreen === 'NotificationsScreen' ? 'blue' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconContainer, activeScreen === 'WatchScreen' && styles.activeIcon]}
        onPress={() => navigation.navigate('WatchScreen')}
      >
        <Ionicons name="watch" size={30} color={activeScreen === 'WatchScreen' ? 'blue' : 'black'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    // paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconContainer: {
    padding: 10,
  },
  activeIcon: {
    backgroundColor: '#e0e0e0',
    borderRadius: 50,
  },
});

export default Footer;
