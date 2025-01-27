// // // // // AIzaSyC-D4ZIMVxXUrBz78FzaruGPLIeQowtKUk
// // import React, { useEffect, useState } from 'react';
// // import {
// //   StyleSheet,
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   Alert,
// //   Animated,
// //   ScrollView,
// //   Dimensions,
// // } from 'react-native';
// // import MapView, { Marker, Callout } from 'react-native-maps';
// // import * as Location from 'expo-location';
// // import * as Linking from 'expo-linking';
// // import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
// // import { LinearGradient } from 'expo-linear-gradient';

// // const { width, height } = Dimensions.get('window');

// // const EmergencyHospitals = () => {
// //   const [location, setLocation] = useState<Location.LocationObject | null>(null);
// //   const [errorMsg, setErrorMsg] = useState<string | null>(null);
// //   const [hospitals, setHospitals] = useState<any[]>([]);
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [showMap, setShowMap] = useState<boolean>(false);
// //   const [selectedHospital, setSelectedHospital] = useState<any>(null);
// //   const fadeAnim = useState(new Animated.Value(0))[0];

// //   // Fetch user's current location
// //   const fetchLocation = async () => {
// //     setLoading(true);
// //     let { status } = await Location.requestForegroundPermissionsAsync();
// //     if (status !== 'granted') {
// //       setErrorMsg('Permission to access location was denied');
// //       setLoading(false);
// //       return;
// //     }

// //     let location = await Location.getCurrentPositionAsync({});
// //     setLocation(location);
// //     fetchNearbyHospitals(location.coords.latitude, location.coords.longitude).then((data) => {
// //       setHospitals(data);
// //       setLoading(false);
// //       setShowMap(true);
// //       Animated.timing(fadeAnim, {
// //         toValue: 1,
// //         duration: 1000,
// //         // easing: Easing.ease,
// //         useNativeDriver: true,
// //       }).start();
// //     });
// //   };

// //   // Fetch nearby hospitals using Google Places API
// //   const fetchNearbyHospitals = async (latitude: number, longitude: number) => {
// //     const apiKey = 'AIzaSyC-D4ZIMVxXUrBz78FzaruGPLIeQowtKUk'; // Replace with your Google Maps API key
// //     const radius = 5000; // 5km radius
// //     const type = 'hospital';
// //     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

// //     try {
// //       const response = await fetch(url);
// //       const data = await response.json();
// //       return data.results;
// //     } catch (error) {
// //       console.error('Error fetching nearby hospitals:', error);
// //       return [];
// //     }
// //   };

// //   // Handle calling a hospital
// //   const callHospital = (phoneNumber: string) => {
// //     Linking.openURL(`tel:${phoneNumber}`);
// //   };

// //   if (errorMsg) {
// //     Alert.alert('Error', errorMsg);
// //   }

// //   return (
// //     <View style={styles.container}>
// //       {!showMap ? (
// //         <LinearGradient colors={['#FF3B30', '#FF6B6B']} style={styles.emergencyButtonContainer}>
// //           <TouchableOpacity style={styles.emergencyButton} onPress={fetchLocation}>
// //             <MaterialIcons name="local-hospital" size={40} color="#FFF" />
// //             <Text style={styles.emergencyButtonText}>Find Nearby Hospitals</Text>
// //           </TouchableOpacity>
// //           {loading && (
// //             <View style={styles.loadingContainer}>
// //               <ActivityIndicator size="large" color="#FFF" />
// //               <Text style={styles.loadingText}>Locating nearby hospitals...</Text>
// //             </View>
// //           )}
// //         </LinearGradient>
// //       ) : (
// //         <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
// //           {/* Header */}
// //           <View style={styles.header}>
// //             <MaterialIcons name="local-hospital" size={30} color="#FF3B30" />
// //             <Text style={styles.headerText}>Nearby Hospitals</Text>
// //           </View>

// //           {/* Map */}
// //           <MapView
// //             style={styles.map}
// //             initialRegion={{
// //               latitude: location?.coords.latitude || 0,
// //               longitude: location?.coords.longitude || 0,
// //               latitudeDelta: 0.0922,
// //               longitudeDelta: 0.0421,
// //             }}
// //             customMapStyle={mapStyle}
// //           >
// //             {/* User's current location */}
// //             <Marker
// //               coordinate={{
// //                 latitude: location?.coords.latitude || 0,
// //                 longitude: location?.coords.longitude || 0,
// //               }}
// //               title="Your Location"
// //             >
// //               <FontAwesome name="map-marker" size={30} color="#007AFF" />
// //             </Marker>

// //             {/* Nearby hospitals */}
// //             {hospitals.map((hospital, index) => (
// //               <Marker
// //                 key={index}
// //                 coordinate={{
// //                   latitude: hospital.geometry.location.lat,
// //                   longitude: hospital.geometry.location.lng,
// //                 }}
// //                 title={hospital.name}
// //                 description={hospital.vicinity}
// //                 onPress={() => setSelectedHospital(hospital)}
// //               >
// //                 <MaterialIcons name="local-hospital" size={30} color="#FF3B30" />
// //               </Marker>
// //             ))}
// //           </MapView>

// //           {/* Floating Call Button */}
// //           {selectedHospital && (
// //             <TouchableOpacity
// //               style={styles.floatingCallButton}
// //               onPress={() => callHospital(selectedHospital.phone_number || '1234567890')}
// //             >
// //               <MaterialIcons name="call" size={24} color="#FFF" />
// //               <Text style={styles.floatingCallButtonText}>Call {selectedHospital.name}</Text>
// //             </TouchableOpacity>
// //           )}

// //           {/* Hospital List */}
// //           <ScrollView style={styles.hospitalList}>
// //             {hospitals.map((hospital, index) => (
// //               <TouchableOpacity
// //                 key={index}
// //                 style={styles.hospitalCard}
// //                 onPress={() => setSelectedHospital(hospital)}
// //               >
// //                 <MaterialIcons name="local-hospital" size={24} color="#FF3B30" />
// //                 <View style={styles.hospitalInfo}>
// //                   <Text style={styles.hospitalName}>{hospital.name}</Text>
// //                   <Text style={styles.hospitalAddress}>{hospital.vicinity}</Text>
// //                 </View>
// //               </TouchableOpacity>
// //             ))}
// //           </ScrollView>
// //         </Animated.View>
// //       )}
// //     </View>
// //   );
// // };

// // // Custom map styling
// // const mapStyle = [
// //   {
// //     featureType: 'poi',
// //     elementType: 'labels',
// //     stylers: [{ visibility: 'off' }],
// //   },
// //   {
// //     featureType: 'transit',
// //     elementType: 'labels',
// //     stylers: [{ visibility: 'off' }],
// //   },
// // ];

// // // Styles
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F5F5F5',
// //   },
// //   emergencyButtonContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   emergencyButton: {
// //     alignItems: 'center',
// //     paddingVertical: 20,
// //     paddingHorizontal: 40,
// //     borderRadius: 10,
// //   },
// //   emergencyButtonText: {
// //     color: '#FFF',
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginTop: 10,
// //   },
// //   loadingContainer: {
// //     marginTop: 20,
// //     alignItems: 'center',
// //   },
// //   loadingText: {
// //     marginTop: 10,
// //     fontSize: 16,
// //     color: '#FFF',
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     padding: 15,
// //     backgroundColor: '#FFF',
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#EEE',
// //   },
// //   headerText: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginLeft: 10,
// //     color: '#333',
// //   },
// //   map: {
// //     height: height * 0.5, // Map takes 50% of the screen
// //   },
// //   floatingCallButton: {
// //     position: 'absolute',
// //     bottom: height * 0.3,
// //     alignSelf: 'center',
// //     backgroundColor: '#FF3B30',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingVertical: 12,
// //     paddingHorizontal: 20,
// //     borderRadius: 25,
// //     elevation: 5,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 5,
// //   },
// //   floatingCallButtonText: {
// //     color: '#FFF',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     marginLeft: 10,
// //   },
// //   hospitalList: {
// //     flex: 1,
// //     padding: 15,
// //   },
// //   hospitalCard: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#FFF',
// //     padding: 15,
// //     borderRadius: 10,
// //     marginBottom: 10,
// //     elevation: 3,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 5,
// //   },
// //   hospitalInfo: {
// //     marginLeft: 10,
// //   },
// //   hospitalName: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: '#333',
// //   },
// //   hospitalAddress: {
// //     fontSize: 14,
// //     color: '#666',
// //   },
// // });

// // export default EmergencyHospitals;

// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   Animated,
//   ScrollView,
//   Dimensions,
//   Image,
// } from 'react-native';
// import MapView, { Marker, Callout } from 'react-native-maps';
// import * as Location from 'expo-location';
// import * as Linking from 'expo-linking';
// import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// const { width, height } = Dimensions.get('window');

// const EmergencyHospitals = () => {
//   const [location, setLocation] = useState<Location.LocationObject | null>(null);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [hospitals, setHospitals] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showMap, setShowMap] = useState<boolean>(false);
//   const [selectedHospital, setSelectedHospital] = useState<any>(null);
//   const fadeAnim = useState(new Animated.Value(0))[0];

//   // Fetch user's current location
//   const fetchLocation = async () => {
//     setLoading(true);
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       setErrorMsg('Permission to access location was denied');
//       setLoading(false);
//       return;
//     }

//     let location = await Location.getCurrentPositionAsync({});
//     setLocation(location);
//     fetchNearbyHospitals(location.coords.latitude, location.coords.longitude).then((data) => {
//       setHospitals(data);
//       setLoading(false);
//       setShowMap(true);
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   // Fetch nearby hospitals using Google Places API
//   const fetchNearbyHospitals = async (latitude: number, longitude: number) => {
//     const apiKey = 'AIzaSyC-D4ZIMVxXUrBz78FzaruGPLIeQowtKUk'; // Replace with your Google Maps API key
//     const radius = 5000; // 5km radius
//     const type = 'hospital';
//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       return data.results;
//     } catch (error) {
//       console.error('Error fetching nearby hospitals:', error);
//       return [];
//     }
//   };

//   // Handle calling a hospital
//   const callHospital = (phoneNumber: string) => {
//     Linking.openURL(`tel:${phoneNumber}`);
//   };

//   if (errorMsg) {
//     Alert.alert('Error', errorMsg);
//   }

//   return (
//     <View style={styles.container}>
//       {!showMap ? (
//         <LinearGradient colors={['#FF3B30', '#FF6B6B']} style={styles.emergencyButtonContainer}>
//           <TouchableOpacity style={styles.emergencyButton} onPress={fetchLocation}>
//             <MaterialIcons name="local-hospital" size={40} color="#FFF" />
//             <Text style={styles.emergencyButtonText}>Find Nearby Hospitals</Text>
//           </TouchableOpacity>
//           {loading && (
//             <View style={styles.loadingContainer}>
//               <ActivityIndicator size="large" color="#FFF" />
//               <Text style={styles.loadingText}>Locating nearby hospitals...</Text>
//             </View>
//           )}
//         </LinearGradient>
//       ) : (
//         <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
//           {/* Header */}
//           <View style={styles.header}>
//             <MaterialIcons name="local-hospital" size={30} color="#FF3B30" />
//             <Text style={styles.headerText}>Nearby Hospitals</Text>
//           </View>

//           {/* Map */}
//           <MapView
//             style={styles.map}
//             initialRegion={{
//               latitude: location?.coords.latitude || 0,
//               longitude: location?.coords.longitude || 0,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421,
//             }}
//             customMapStyle={mapStyle}
//           >
//             {/* User's current location */}
//             <Marker
//               coordinate={{
//                 latitude: location?.coords.latitude || 0,
//                 longitude: location?.coords.longitude || 0,
//               }}
//               title="Your Location"
//             >
//               <View style={styles.userMarker}>
//                 <FontAwesome name="map-marker" size={30} color="#007AFF" />
//               </View>
//             </Marker>

//             {/* Nearby hospitals */}
//             {hospitals.map((hospital, index) => (
//               <Marker
//                 key={index}
//                 coordinate={{
//                   latitude: hospital.geometry.location.lat,
//                   longitude: hospital.geometry.location.lng,
//                 }}
//                 title={hospital.name}
//                 description={hospital.vicinity}
//                 onPress={() => setSelectedHospital(hospital)}
//               >
//                 <View style={styles.hospitalMarker}>
//                   <MaterialIcons name="local-hospital" size={24} color="#FFF" />
//                 </View>
//               </Marker>
//             ))}
//           </MapView>

//           {/* Floating Call Button */}
//           {selectedHospital && (
//             <TouchableOpacity
//               style={styles.floatingCallButton}
//               onPress={() => callHospital(selectedHospital.phone_number || '1234567890')}
//             >
//               <MaterialIcons name="call" size={24} color="#FFF" />
//               <Text style={styles.floatingCallButtonText}>Call {selectedHospital.name}</Text>
//             </TouchableOpacity>
//           )}

//           {/* Hospital List */}
//           <ScrollView style={styles.hospitalList}>
//             {hospitals.map((hospital, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.hospitalCard}
//                 onPress={() => setSelectedHospital(hospital)}
//               >
//                 <View style={styles.hospitalIcon}>
//                   <MaterialIcons name="local-hospital" size={24} color="#FF3B30" />
//                 </View>
//                 <View style={styles.hospitalInfo}>
//                   <Text style={styles.hospitalName}>{hospital.name}</Text>
//                   <Text style={styles.hospitalAddress}>{hospital.vicinity}</Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </Animated.View>
//       )}
//     </View>
//   );
// };

// // Custom map styling
// const mapStyle = [
//   {
//     featureType: 'poi',
//     elementType: 'labels',
//     stylers: [{ visibility: 'off' }],
//   },
//   {
//     featureType: 'transit',
//     elementType: 'labels',
//     stylers: [{ visibility: 'off' }],
//   },
// ];

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   emergencyButtonContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emergencyButton: {
//     alignItems: 'center',
//     paddingVertical: 20,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//   },
//   emergencyButtonText: {
//     color: '#FFF',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   loadingContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#FFF',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: '#FFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEE',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     color: '#333',
//   },
//   map: {
//     height: height * 0.5, // Map takes 50% of the screen
//   },
//   userMarker: {
//     backgroundColor: '#FFF',
//     padding: 5,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: '#007AFF',
//   },
//   hospitalMarker: {
//     backgroundColor: '#FF3B30',
//     padding: 8,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: '#FFF',
//   },
//   floatingCallButton: {
//     position: 'absolute',
//     bottom: height * 0.3,
//     alignSelf: 'center',
//     backgroundColor: '#FF3B30',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   floatingCallButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   hospitalList: {
//     flex: 1,
//     padding: 15,
//   },
//   hospitalCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   hospitalIcon: {
//     backgroundColor: '#FFEBEE',
//     padding: 10,
//     borderRadius: 10,
//   },
//   hospitalInfo: {
//     marginLeft: 10,
//   },
//   hospitalName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   hospitalAddress: {
//     fontSize: 14,
//     color: '#666',
//   },
// });

// export default EmergencyHospitals;

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const EmergencyHospitals = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Fetch user's current location and nearby hospitals on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const data = await fetchNearbyHospitals(location.coords.latitude, location.coords.longitude);
      setHospitals(data);
      setLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };

    fetchData();
  }, []);

  // Fetch nearby hospitals using Google Places API
  const fetchNearbyHospitals = async (latitude: number, longitude: number) => {
    const apiKey = 'AIzaSyC-D4ZIMVxXUrBz78FzaruGPLIeQowtKUk'; // Replace with your Google Maps API key
    const radius = 5000; // 5km radius
    const type = 'hospital';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching nearby hospitals:', error);
      return [];
    }
  };

  // Handle calling a hospital
  const callHospital = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  if (errorMsg) {
    Alert.alert('Error', errorMsg);
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF3B30" />
          <Text style={styles.loadingText}>Locating nearby hospitals...</Text>
        </View>
      ) : (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          {/* Header */}
          <View style={styles.header}>
            <MaterialIcons name="local-hospital" size={30} color="#FF3B30" />
            <Text style={styles.headerText}>Nearby Hospitals</Text>
          </View>

          {/* Map */}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location?.coords.latitude || 0,
              longitude: location?.coords.longitude || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            customMapStyle={mapStyle}
          >
            {/* User's current location */}
            <Marker
              coordinate={{
                latitude: location?.coords.latitude || 0,
                longitude: location?.coords.longitude || 0,
              }}
              title="Your Location"
            >
              <View style={styles.userMarker}>
                <FontAwesome name="map-marker" size={30} color="#007AFF" />
              </View>
            </Marker>

            {/* Nearby hospitals */}
            {hospitals.map((hospital, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: hospital.geometry.location.lat,
                  longitude: hospital.geometry.location.lng,
                }}
                title={hospital.name}
                description={hospital.vicinity}
                onPress={() => setSelectedHospital(hospital)}
              >
                <View style={styles.hospitalMarker}>
                  <MaterialIcons name="local-hospital" size={24} color="#FFF" />
                </View>
              </Marker>
            ))}
          </MapView>

          {/* Floating Call Button */}
          {selectedHospital && (
            <TouchableOpacity
              style={styles.floatingCallButton}
              onPress={() => callHospital(selectedHospital.phone_number || '1234567890')}
            >
              <MaterialIcons name="call" size={24} color="#FFF" />
              <Text style={styles.floatingCallButtonText}>Call {selectedHospital.name}</Text>
            </TouchableOpacity>
          )}

          {/* Hospital List */}
          <ScrollView style={styles.hospitalList}>
            {hospitals.map((hospital, index) => (
              <TouchableOpacity
                key={index}
                style={styles.hospitalCard}
                onPress={() => setSelectedHospital(hospital)}
              >
                <View style={styles.hospitalIcon}>
                  <MaterialIcons name="local-hospital" size={24} color="#FF3B30" />
                </View>
                <View style={styles.hospitalInfo}>
                  <Text style={styles.hospitalName}>{hospital.name}</Text>
                  <Text style={styles.hospitalAddress}>{hospital.vicinity}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

// Custom map styling
const mapStyle = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FF3B30',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  map: {
    height: height * 0.5, // Map takes 50% of the screen
  },
  userMarker: {
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  hospitalMarker: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  floatingCallButton: {
    position: 'absolute',
    bottom: height * 0.3,
    alignSelf: 'center',
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  floatingCallButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  hospitalList: {
    flex: 1,
    padding: 15,
  },
  hospitalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  hospitalIcon: {
    backgroundColor: '#FFEBEE',
    padding: 10,
    borderRadius: 10,
  },
  hospitalInfo: {
    marginLeft: 10,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  hospitalAddress: {
    fontSize: 14,
    color: '#666',
  },
});

export default EmergencyHospitals;