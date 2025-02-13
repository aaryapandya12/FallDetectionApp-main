// // // import React from "react";
// // // import {
// // //   ScrollView,
// // //   Text,
// // //   View,
// // //   StyleSheet,
// // //   TouchableOpacity,
// // // } from "react-native";
// // // import { Ionicons } from "@expo/vector-icons";
// // // import Footer from "./Footer"; // Importing Footer

// // // const NotificationsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
// // //   return (
// // //     <View style={styles.container}>
// // //       {/* Content */}
// // //       <ScrollView contentContainerStyle={styles.content}>
// // //         <Text style={styles.subtitle}>Recent Notifications</Text>

// // //         {/* Example notifications */}
// // //         <View style={styles.notificationCard}>
// // //           <View style={styles.notificationIcon}>
// // //             <Ionicons name="alert-circle" size={24} color="#ff4444" />
// // //           </View>
// // //           <Text style={styles.notificationText}>
// // //             Fall detected! Immediate attention required.
// // //           </Text>
// // //         </View>

// // //         <View style={styles.notificationCard}>
// // //           <View style={styles.notificationIcon}>
// // //             <Ionicons name="heart-circle" size={24} color="#ffbb33" />
// // //           </View>
// // //           <Text style={styles.notificationText}>
// // //             Heart rate abnormal. Please check the monitor.
// // //           </Text>
// // //         </View>

// // //         <View style={styles.notificationCard}>
// // //           <View style={styles.notificationIcon}>
// // //             <Ionicons name="notifications" size={24} color="#007bff" />
// // //           </View>
// // //           <Text style={styles.notificationText}>
// // //             Medicine reminder: Take your medication at 10:00 AM.
// // //           </Text>
// // //         </View>

// // //         <View style={styles.notificationCard}>
// // //           <View style={styles.notificationIcon}>
// // //             <Ionicons name="location" size={24} color="#00C851" />
// // //           </View>
// // //           <Text style={styles.notificationText}>
// // //             GPS tracking activated. Your location is being monitored.
// // //           </Text>
// // //         </View>
// // //       </ScrollView>

// // //       {/* Footer */}
// // //       <Footer navigation={navigation} activeScreen="NotificationsScreen" />
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#f9f9f9", // Light background color
// // //   },
// // //   header: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     padding: 16,
// // //     backgroundColor: "rgba(255, 255, 255, 0.9)",
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: "#ddd",
// // //   },
// // //   headerTitle: {
// // //     fontSize: 20,
// // //     fontWeight: "bold",
// // //     color: "#333",
// // //   },
// // //   content: {
// // //     flexGrow: 1,
// // //     padding: 16,
// // //   },
// // //   subtitle: {
// // //     fontSize: 18,
// // //     fontWeight: "bold",
// // //     color: "#333",
// // //     marginBottom: 16,
// // //   },
// // //   notificationCard: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     backgroundColor: "#fff",
// // //     padding: 16,
// // //     marginBottom: 12,
// // //     borderRadius: 12,
// // //     shadowColor: "#000",
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 6,
// // //     elevation: 3,
// // //   },
// // //   notificationIcon: {
// // //     marginRight: 16,
// // //   },
// // //   notificationText: {
// // //     fontSize: 16,
// // //     color: "#333",
// // //     flex: 1,
// // //   },
// // // });

// // // export default NotificationsScreen;

// // import React, { useState } from "react";
// // import {
// //   ScrollView,
// //   Text,
// //   View,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Alert,
// // } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import Footer from "./Footer"; // Importing Footer
// // import axios from "axios"; // Import axios for API calls

// // const NotificationsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
// //   const [prediction, setPrediction] = useState<string | null>(null);

// //   // Function to send sensor data to the backend
// //   const checkForFall = async () => {
// //     const newData = [1.2, 0.8, 9.8, 0.5, 0.3, 0.1, 36.5, 80, 120]; // Replace with actual sensor data

// //     try {
// //       const response = await axios.post("http://192.168.1.3:8081/predict", {
// //         data: newData,
// //       });

// //       // Set the prediction state based on the response
// //       setPrediction(response.data.prediction === 1 ? "Fall Detected" : "No Fall");

// //       // Show an alert with the prediction result
// //       Alert.alert("Fall Detection", response.data.prediction === 1 ? "Fall Detected! Immediate attention required." : "No Fall Detected.");
// //     } catch (error) {
// //       console.error("Error sending data to backend:", error);
// //       Alert.alert("Error", "Failed to check for fall. Please try again.");
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {/* Content */}
// //       <ScrollView contentContainerStyle={styles.content}>
// //         <Text style={styles.subtitle}>Recent Notifications</Text>

// //         {/* Example notifications */}
// //         <View style={styles.notificationCard}>
// //           <View style={styles.notificationIcon}>
// //             <Ionicons name="alert-circle" size={24} color="#ff4444" />
// //           </View>
// //           <Text style={styles.notificationText}>
// //             Fall detected! Immediate attention required.
// //           </Text>
// //         </View>

// //         <View style={styles.notificationCard}>
// //           <View style={styles.notificationIcon}>
// //             <Ionicons name="heart-circle" size={24} color="#ffbb33" />
// //           </View>
// //           <Text style={styles.notificationText}>
// //             Heart rate abnormal. Please check the monitor.
// //           </Text>
// //         </View>

// //         <View style={styles.notificationCard}>
// //           <View style={styles.notificationIcon}>
// //             <Ionicons name="notifications" size={24} color="#007bff" />
// //           </View>
// //           <Text style={styles.notificationText}>
// //             Medicine reminder: Take your medication at 10:00 AM.
// //           </Text>
// //         </View>

// //         <View style={styles.notificationCard}>
// //           <View style={styles.notificationIcon}>
// //             <Ionicons name="location" size={24} color="#00C851" />
// //           </View>
// //           <Text style={styles.notificationText}>
// //             GPS tracking activated. Your location is being monitored.
// //           </Text>
// //         </View>

// //         {/* Fall Detection Button */}
// //         <TouchableOpacity style={styles.fallDetectionButton} onPress={checkForFall}>
// //           <Text style={styles.fallDetectionButtonText}>Check for Fall</Text>
// //         </TouchableOpacity>

// //         {/* Display Prediction Result */}
// //         {prediction && (
// //           <View style={styles.predictionCard}>
// //             <Text style={styles.predictionText}>{prediction}</Text>
// //           </View>
// //         )}
// //       </ScrollView>

// //       {/* Footer */}
// //       <Footer navigation={navigation} activeScreen="NotificationsScreen" />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#f9f9f9", // Light background color
// //   },
// //   header: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     padding: 16,
// //     backgroundColor: "rgba(255, 255, 255, 0.9)",
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#ddd",
// //   },
// //   headerTitle: {
// //     fontSize: 20,
// //     fontWeight: "bold",
// //     color: "#333",
// //   },
// //   content: {
// //     flexGrow: 1,
// //     padding: 16,
// //   },
// //   subtitle: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     color: "#333",
// //     marginBottom: 16,
// //   },
// //   notificationCard: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "#fff",
// //     padding: 16,
// //     marginBottom: 12,
// //     borderRadius: 12,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 6,
// //     elevation: 3,
// //   },
// //   notificationIcon: {
// //     marginRight: 16,
// //   },
// //   notificationText: {
// //     fontSize: 16,
// //     color: "#333",
// //     flex: 1,
// //   },
// //   fallDetectionButton: {
// //     backgroundColor: "#007bff",
// //     padding: 16,
// //     borderRadius: 12,
// //     alignItems: "center",
// //     marginTop: 20,
// //   },
// //   fallDetectionButtonText: {
// //     fontSize: 16,
// //     color: "#fff",
// //     fontWeight: "bold",
// //   },
// //   predictionCard: {
// //     backgroundColor:"#00C851",
// //     padding: 16,
// //     borderRadius: 12,
// //     marginTop: 20,
// //     alignItems: "center",
// //   },
// //   predictionText: {
// //     fontSize: 16,
// //     color: "#fff",
// //     fontWeight: "bold",
// //   },
// // });

// // export default NotificationsScreen;

// import React, { useState, useEffect } from "react";
// import {
//   ScrollView,
//   Text,
//   View,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import Footer from "./Footer"; // Importing Footer
// import axios from "axios"; // Import axios for API calls

// const NotificationsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const [prediction, setPrediction] = useState<string | null>(null);

//   // Simulate real-time sensor data updates
//   useEffect(() => {
//     const interval = setInterval(() => {
//       checkForFall();
//     }, 20000); // Check for fall every 5 seconds

//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, []);

//   // Function to send sensor data to the backend
//   const checkForFall = async () => {
//     const newData = [
//       Math.random() * 2, // Simulated Acc_X
//       Math.random() * 2, // Simulated Acc_Y
//       Math.random() * 2, // Simulated Acc_Z
//       Math.random() * 2, // Simulated Gyro_X
//       Math.random() * 2, // Simulated Gyro_Y
//       Math.random() * 2, // Simulated Gyro_Z
//       36.5, // Simulated Temperature
//       80, // Simulated Heart Rate
//       120, // Simulated BP
//     ];

//     try {
//       const response = await axios.post("http://192.168.1.3:8081/predict", {
//         data: newData,
//       });

//       // Set the prediction state based on the response
//       const isFallDetected = response.data.prediction === 1;
//       setPrediction(isFallDetected ? "Fall Detected" : "No Fall");

//       // Show an alert if a fall is detected
//       if (isFallDetected) {
//         Alert.alert(
//           "Fall Detected!",
//           "Immediate attention required.",
//           [{ text: "OK", onPress: () => console.log("Alert closed") }]
//         );
//       }
//     } catch (error) {
//       console.error("Error sending data to backend:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Content */}
//       <ScrollView contentContainerStyle={styles.content}>
//         <Text style={styles.subtitle}>Recent Notifications</Text>

//         {/* Example notifications */}
//         <View style={styles.notificationCard}>
//           <View style={styles.notificationIcon}>
//             <Ionicons name="alert-circle" size={24} color="#ff4444" />
//           </View>
//           <Text style={styles.notificationText}>
//             Fall detected! Immediate attention required.
//           </Text>
//         </View>

//         <View style={styles.notificationCard}>
//           <View style={styles.notificationIcon}>
//             <Ionicons name="heart-circle" size={24} color="#ffbb33" />
//           </View>
//           <Text style={styles.notificationText}>
//             Heart rate abnormal. Please check the monitor.
//           </Text>
//         </View>

//         <View style={styles.notificationCard}>
//           <View style={styles.notificationIcon}>
//             <Ionicons name="notifications" size={24} color="#007bff" />
//           </View>
//           <Text style={styles.notificationText}>
//             Medicine reminder: Take your medication at 10:00 AM.
//           </Text>
//         </View>

//         <View style={styles.notificationCard}>
//           <View style={styles.notificationIcon}>
//             <Ionicons name="location" size={24} color="#00C851" />
//           </View>
//           <Text style={styles.notificationText}>
//             GPS tracking activated. Your location is being monitored.
//           </Text>
//         </View>

//         {/* Display Prediction Result */}
//         {prediction && (
//           <View style={[
//             styles.predictionCard,
//             { backgroundColor: prediction === "Fall Detected" ? "#ff4444" : "#00C851" }
//           ]}>
//             <Text style={styles.predictionText}>{prediction}</Text>
//           </View>
//         )}
//       </ScrollView>

//       {/* Footer */}
//       <Footer navigation={navigation} activeScreen="NotificationsScreen" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9f9f9", // Light background color
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   content: {
//     flexGrow: 1,
//     padding: 16,
//   },
//   subtitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 16,
//   },
//   notificationCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     marginBottom: 12,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   notificationIcon: {
//     marginRight: 16,
//   },
//   notificationText: {
//     fontSize: 16,
//     color: "#333",
//     flex: 1,
//   },
//   predictionCard: {
//     padding: 16,
//     borderRadius: 12,
//     marginTop: 20,
//     alignItems: "center",
//   },
//   predictionText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default NotificationsScreen;

import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "./Footer"; // Importing Footer
import axios from "axios"; // Import axios for API calls

const NotificationsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<
    Array<{ id: number; message: string; type: string }>
  >([]);
  const [fallDetected, setFallDetected] = useState<boolean>(false); // Track fall detection

  // Simulate real-time sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      checkForFall();
    }, 10000); // Check for fall every 20 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Function to send sensor data to the backend
  const checkForFall = async () => {
    const newData = [
      Math.random() * 2, // Simulated Acc_X
      Math.random() * 2, // Simulated Acc_Y
      Math.random() * 2, // Simulated Acc_Z
      Math.random() * 2, // Simulated Gyro_X
      Math.random() * 2, // Simulated Gyro_Y
      Math.random() * 2, // Simulated Gyro_Z
      36.5, // Simulated Temperature
      80, // Simulated Heart Rate
      120, // Simulated BP
    ];

    try {
      const response = await axios.post("http://192.168.43.207:8081/predict", {
        data: newData,
      });

      // Set the prediction state based on the response
      const isFallDetected = response.data.prediction === 1;
      const predictionMessage = isFallDetected ? "Fall Detected" : "No Fall";
      setPrediction(predictionMessage);

      // Add a new notification based on the prediction
      const newNotification = {
        id: Date.now(),
        message: isFallDetected
          ? "Fall detected! Immediate attention required."
          : "No fall detected. Everything is normal.",
        type: isFallDetected ? "fall" : "no-fall",
      };
      setNotifications((prev) => [newNotification, ...prev]);

      // Show an alert if a fall is detected (only once)
      if (isFallDetected && !fallDetected) {
        Alert.alert(
          "Fall Detected!",
          "Immediate attention required.",
          [{ text: "OK", onPress: () => console.log("Alert closed") }]
        );
        setFallDetected(true); // Mark fall as detected
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  // Function to delete a single notification
  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  // Function to clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <View style={styles.container}>
      {/* Header with Delete Icon */}
      <View style={styles.header}>
        <Text style={styles.subtitle}>Recent Notifications</Text>
        <TouchableOpacity onPress={clearAllNotifications}>
          <Ionicons name="trash-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Display Notifications */}
        {notifications.map((notification) => (
          <View
            key={notification.id}
            style={[
              styles.notificationCard,
              {
                borderLeftWidth: 6,
                borderLeftColor:
                  notification.type === "fall" ? "#FF3B30" : "#34C759",
              },
            ]}
          >
            <View style={styles.notificationIcon}>
              <Ionicons
                name={
                  notification.type === "fall" ? "alert-circle" : "checkmark-circle"
                }
                size={24}
                color={notification.type === "fall" ? "#FF3B30" : "#34C759"}
              />
            </View>
            <Text style={styles.notificationText}>{notification.message}</Text>
            <TouchableOpacity onPress={() => deleteNotification(notification.id)}>
              {/* <Ionicons name="close-circle" size={24} color="#888" /> */}
            </TouchableOpacity>
          </View>
        ))}

        {/* Display Prediction Result */}
        {prediction && (
          <View
            style={[
              styles.predictionCard,
              {
                backgroundColor:
                  prediction === "Fall Detected" ? "#FF3B30" : "#34C759",
              },
            ]}
          >
            <Text style={styles.predictionText}>{prediction}</Text>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <Footer navigation={navigation} activeScreen="NotificationsScreen" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Light gray background
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationIcon: {
    marginRight: 16,
  },
  notificationText: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
  },
  predictionCard: {
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  predictionText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default NotificationsScreen;