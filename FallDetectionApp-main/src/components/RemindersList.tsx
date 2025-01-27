// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions, ScrollView,Alert, Modal } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { MaterialIcons } from '@expo/vector-icons'; // For icons
// import { Reminder } from './types';

// interface Props {
//   reminders: Reminder[];
//   onEdit: (index: number) => void;
//   onDelete: (index: number) => void;
//   onTaken: (index: number) => void;
//   onSkipped: (index: number) => void;
// }

// const RemindersList: React.FC<Props> = ({ reminders, onEdit, onDelete, onTaken, onSkipped }) => {
//   const [localReminders, setLocalReminders] = useState<Reminder[]>([]);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [showHistory, setShowHistory] = useState(false); // State to toggle history modal
//   const [historyReminders, setHistoryReminders] = useState<Reminder[]>([]); // State for history reminders

//   useEffect(() => {
//     const loadReminders = async () => {
//       try {
//         const storedReminders = await AsyncStorage.getItem('reminders');
//         const storedHistory = await AsyncStorage.getItem('historyReminders');

//         if (storedReminders) {
//           setLocalReminders(JSON.parse(storedReminders));
//         }

//         if (storedHistory) {
//           setHistoryReminders(JSON.parse(storedHistory));
//         }
//       } catch (error) {
//         console.error('Error loading reminders from storage:', error);
//       }
//     };

//     loadReminders();
//   }, [reminders]); // Reload reminders when the `reminders` prop changes

//   // Function to check if the reminder time has passed
//   const isReminderTimePassed = (reminderTime: Date) => {
//     const currentTime = new Date();
//     return currentTime >= reminderTime;
//   };

//   // Function to generate the list of dates and days for the calendar
//   const generateCalendarDates = () => {
//     const dates = [];
//     const today = new Date();
//     for (let i = -3; i <= 3; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       dates.push(date);
//     }
//     return dates;
//   };

//   // Function to render the calendar in an oval structure
//   const renderCalendar = () => {
//     const dates = generateCalendarDates();
//     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//     return (
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.calendarContainer}>
//         {dates.map((date, index) => {
//           const dayOfMonth = date.getDate();
//           const dayOfWeek = daysOfWeek[date.getDay()];
//           const isCurrentDay = date.toDateString() === currentDate.toDateString();

//           return (
//             <View key={index} style={[styles.dateContainer, isCurrentDay && styles.activeDateContainer]}>
//               <Text style={[styles.dayText, isCurrentDay && styles.activeDayText]}>{dayOfWeek}</Text>
//               <Text style={[styles.dateText, isCurrentDay && styles.activeDateText]}>{dayOfMonth}</Text>
//             </View>
//           );
//         })}
//       </ScrollView>
//     );
//   };

//   // Function to delete a particular reminder from history
//   const handleDeleteHistory = (index: number) => {
//     Alert.alert(
//       "Delete Reminder",
//       "Are you sure you want to delete this reminder from history?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: () => {
//             const updatedHistory = historyReminders.filter((_, i) => i !== index);
//             setHistoryReminders(updatedHistory);
//             AsyncStorage.setItem('historyReminders', JSON.stringify(updatedHistory));
//           },
//         },
//       ]
//     );
//   };

//   // Function to delete all history reminders
//   const handleDeleteAllHistory = () => {
//     Alert.alert(
//       "Delete All History",
//       "Are you sure you want to delete all history?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: () => {
//             setHistoryReminders([]);
//             AsyncStorage.setItem('historyReminders', JSON.stringify([]));
//           },
//         },
//       ]
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Render the calendar */}
//       <View style={styles.calendarWrapper}>
//         {renderCalendar()}
//       </View>

//       {/* Render the "Upcoming Doses" text and history icon */}
//       <View style={styles.upcomingDosesContainer}>
//         <Text style={styles.upcomingDosesText}>Upcoming Doses</Text>
//         <TouchableOpacity onPress={() => setShowHistory(true)}>
//           <MaterialIcons name="history" size={24} color="#555" />
//         </TouchableOpacity>
//       </View>

//       {/* Render the reminders list */}
//       <FlatList
//         data={localReminders}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item, index }) => (
//           <View style={styles.card}>
//             {item.image ? (
//               <Image source={{ uri: item.image }} style={styles.image} />
//             ) : (
//               <View style={styles.placeholderImage}>
//                 <Text style={styles.imageText}>{item.medicineName[0]}</Text>
//               </View>
//             )}
//             <View style={styles.details}>
//               <Text style={styles.medicineName} numberOfLines={1} ellipsizeMode="tail">
//                 {item.medicineName}
//               </Text>
//               <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
//                 {item.medicineDescription}
//               </Text>
//               <View style={styles.timeContainer}>
//                 <MaterialIcons name="access-time" size={16} color="#555" />
//                 <Text style={styles.time}>{new Date(item.time).toLocaleTimeString()}</Text>
//               </View>
//               <View style={styles.medicationContainer}>
//                 <MaterialIcons name="medication" size={16} color="#555" />
//                 <Text style={styles.medicationText}>{item.numberOfMedications} pills</Text>
//               </View>
//             </View>
//             {/* Show "Taken" or "Skipped" options only if the reminder time has passed */}
//             {isReminderTimePassed(new Date(item.time)) && (
//               <View style={styles.actions}>
//                 <TouchableOpacity
//                   style={[styles.actionButton, styles.takenButton, item.taken && styles.disabledButton]}
//                   onPress={() => onTaken(index)}
//                   disabled={item.taken || item.skipped}
//                 >
//                   <Text style={styles.actionButtonText}>{item.taken ? 'Taken' : 'Mark as Taken'}</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.actionButton, styles.skippedButton, item.skipped && styles.disabledButton]}
//                   onPress={() => onSkipped(index)}
//                   disabled={item.skipped || item.taken}
//                 >
//                   <Text style={styles.actionButtonText}>{item.skipped ? 'Skipped' : 'Mark as Skipped'}</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}
//       />

//       {/* History Modal */}
//       <Modal visible={showHistory} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>History</Text>
//             <FlatList
//               data={historyReminders}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item, index }) => (
//                 <View style={styles.historyCard}>
//                   {item.image ? (
//                     <Image source={{ uri: item.image }} style={styles.historyImage} />
//                   ) : (
//                     <View style={styles.historyPlaceholderImage}>
//                       <Text style={styles.historyImageText}>{item.medicineName[0]}</Text>
//                     </View>
//                   )}
//                   <View style={styles.historyDetails}>
//                     <Text style={styles.historyMedicineName} numberOfLines={1} ellipsizeMode="tail">
//                       {item.medicineName}
//                     </Text>
//                     <Text style={styles.historyDescription} numberOfLines={2} ellipsizeMode="tail">
//                       {item.medicineDescription}
//                     </Text>
//                     <Text style={styles.historyTime}>
//                       {new Date(item.time).toLocaleTimeString()}
//                     </Text>
//                     <Text style={styles.historyStatus}>
//                       {item.taken ? 'Taken' : 'Skipped'}
//                     </Text>
//                   </View>
//                   <TouchableOpacity
//                     style={styles.historyDeleteButton}
//                     onPress={() => handleDeleteHistory(index)}
//                   >
//                     <MaterialIcons name="delete" size={20} color="#ff4444" />
//                   </TouchableOpacity>
//                 </View>
//               )}
//             />
//             <TouchableOpacity
//               style={styles.deleteAllButton}
//               onPress={handleDeleteAllHistory}
//             >
//               <Text style={styles.deleteAllButtonText}>Delete All History</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setShowHistory(false)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f9fc',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   calendarWrapper: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1,
//     backgroundColor: '#f7f9fc',
//     paddingTop: 16,
//   },
//   calendarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
//   dateContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 50,
//     height: 70,
//     borderRadius: 40,
//     backgroundColor: '#f5f5f5',
//     marginHorizontal: 6,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 5,
//   },
//   activeDateContainer: {
//     backgroundColor: '#FF7F7F',
//   },
//   dayText: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   activeDayText: {
//     color: '#fff',
//   },
//   dateText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   activeDateText: {
//     color: '#fff',
//   },
//   upcomingDosesContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 80, // Adjust this value to position the text below the calendar
//     marginBottom: 16,
//   },
//   upcomingDosesText: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#333',
//   },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 26,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 5,
//     width: width - 32,
//   },
//   image: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     marginRight: 16,
//   },
//   placeholderImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   imageText: {
//     fontSize: 24,
//     color: '#666',
//     fontWeight: 'bold',
//   },
//   details: {
//     flex: 1,
//     marginRight: 16,
//   },
//   medicineName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//     maxWidth: width * 0.5,
//   },
//   description: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//     maxWidth: width * 0.5,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   medicationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   time: {
//     fontSize: 14,
//     color: '#555',
//     marginLeft: 4,
//   },
//   medicationText: {
//     fontSize: 14,
//     color: '#555',
//     marginLeft: 4,
//   },
//   actions: {
//     flexDirection: 'column',
//     gap: 8,
//   },
//   actionButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minWidth: 100,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   takenButton: {
//     backgroundColor: '#e8f5e9', // Soft green background
//   },
//   skippedButton: {
//     backgroundColor: '#ffebee', // Soft red background
//   },
//   disabledButton: {
//     backgroundColor: '#f5f5f5', // Neutral gray for disabled state
//   },
//   actionButtonText: {
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   takenButtonText: {
//     color: '#2e7d32', // Dark green text for taken button
//   },
//   skippedButtonText: {
//     color: '#c62828', // Dark red text for skipped button
//   },
//   disabledButtonText: {
//     color: '#9e9e9e', // Gray text for disabled state
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     width: width - 32,
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 16,
//   },
//   historyCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 26,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 5,
//   },
//   historyImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     marginRight: 16,
//   },
//   historyPlaceholderImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   historyImageText: {
//     fontSize: 24,
//     color: '#666',
//     fontWeight: 'bold',
//   },
//   historyDetails: {
//     flex: 1,
//     marginRight: 16,
//   },
//   historyMedicineName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//   },
//   historyDescription: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//   },
//   historyTime: {
//     fontSize: 14,
//     color: '#555',
//   },
//   historyStatus: {
//     fontSize: 14,
//     color: '#555',
//   },
//   historyDeleteButton: {
//     padding: 8,
//   },
//   deleteAllButton: {
//     backgroundColor: '#FF7F7F',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   deleteAllButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   closeButton: {
//     backgroundColor: '#4A90E2',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default RemindersList;

import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions, ScrollView, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; // For icons
import { Reminder } from './types';

interface Props {
  reminders: Reminder[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onTaken: (index: number) => void;
  onSkipped: (index: number) => void;
}

const RemindersList: React.FC<Props> = ({ reminders, onEdit, onDelete, onTaken, onSkipped }) => {
  const [localReminders, setLocalReminders] = useState<Reminder[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showHistory, setShowHistory] = useState(false); // State to toggle history modal
  const [historyReminders, setHistoryReminders] = useState<Reminder[]>([]); // State for history reminders

  const API_URL = "http://192.168.1.4:5000/api";

  // Fetch reminders from the backend
  const fetchReminders = async () => {
    try {
      const response = await fetch(`${API_URL}/reminders`);
      const data = await response.json();
      setLocalReminders(data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  // Fetch history reminders from the backend
  const fetchHistoryReminders = async () => {
    try {
      const response = await fetch(`${API_URL}/history`);
      const data = await response.json();
      setHistoryReminders(data);
    } catch (error) {
      console.error("Error fetching history reminders:", error);
    }
  };

  useEffect(() => {
    fetchReminders();
    fetchHistoryReminders();
  }, [reminders]);

  useEffect(() => {
    const loadReminders = async () => {
      try {
        const storedReminders = await AsyncStorage.getItem('reminders');
        const storedHistory = await AsyncStorage.getItem('historyReminders');

        if (storedReminders) {
          setLocalReminders(JSON.parse(storedReminders));
        }

        if (storedHistory) {
          setHistoryReminders(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error('Error loading reminders from storage:', error);
      }
    };

    loadReminders();
  }, [reminders]); // Reload reminders when the `reminders` prop changes

  // Function to check if the reminder time has passed
  const isReminderTimePassed = (reminderTime: Date) => {
    const currentTime = new Date();
    return currentTime >= reminderTime;
  };

  // Function to generate the list of dates and days for the calendar
  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Function to render the calendar in an oval structure
  const renderCalendar = () => {
    const dates = generateCalendarDates();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.calendarContainer}>
        {dates.map((date, index) => {
          const dayOfMonth = date.getDate();
          const dayOfWeek = daysOfWeek[date.getDay()];
          const isCurrentDay = date.toDateString() === currentDate.toDateString();

          return (
            <View key={index} style={[styles.dateContainer, isCurrentDay && styles.activeDateContainer]}>
              <Text style={[styles.dayText, isCurrentDay && styles.activeDayText]}>{dayOfWeek}</Text>
              <Text style={[styles.dateText, isCurrentDay && styles.activeDateText]}>{dayOfMonth}</Text>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  // Function to delete a particular reminder from history
  const handleDeleteHistory = (index: number) => {
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder from history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedHistory = historyReminders.filter((_, i) => i !== index);
            setHistoryReminders(updatedHistory);
            AsyncStorage.setItem('historyReminders', JSON.stringify(updatedHistory));
          },
        },
      ]
    );
  };

  // Function to delete all history reminders
  const handleDeleteAllHistory = () => {
    Alert.alert(
      "Delete All History",
      "Are you sure you want to delete all history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setHistoryReminders([]);
            AsyncStorage.setItem('historyReminders', JSON.stringify([]));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Render the calendar */}
      <View style={styles.calendarWrapper}>
        {renderCalendar()}
      </View>

      {/* Render the "Upcoming Doses" text and history icon */}
      <View style={styles.upcomingDosesContainer}>
        <Text style={styles.upcomingDosesText}>Upcoming Doses</Text>
        <TouchableOpacity onPress={() => setShowHistory(true)}>
          <MaterialIcons name="history" size={24} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Render the reminders list or "No Upcoming Doses" text */}
      {localReminders.length > 0 ? (
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.card} key={item.id}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.image} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text style={styles.imageText}>{item.medicineName[0]}</Text>
                </View>
              )}
              <View style={styles.details}>
                <Text style={styles.medicineName} numberOfLines={1} ellipsizeMode="tail">
                  {item.medicineName}
                </Text>
                <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
                  {item.medicineDescription}
                </Text>
                <View style={styles.timeContainer}>
                  <MaterialIcons name="access-time" size={16} color="#555" />
                  <Text style={styles.time}>{new Date(item.time).toLocaleTimeString()}</Text>
                </View>
                <View style={styles.medicationContainer}>
                  <MaterialIcons name="medication" size={16} color="#555" />
                  <Text style={styles.medicationText}>{item.numberOfMedications} pills</Text>
                </View>
              </View>
              {/* Show "Taken" or "Skipped" options only if the reminder time has passed */}
              {isReminderTimePassed(new Date(item.time)) && (
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.takenButton, item.taken && styles.disabledButton]}
                    onPress={() => onTaken(index)}
                    disabled={item.taken || item.skipped}
                  >
                    <Text style={styles.actionButtonText}>{item.taken ? 'Taken' : 'Mark as Taken'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.skippedButton, item.skipped && styles.disabledButton]}
                    onPress={() => onSkipped(index)}
                    disabled={item.skipped || item.taken}
                  >
                    <Text style={styles.actionButtonText}>{item.skipped ? 'Skipped' : 'Mark as Skipped'}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      ) : (
        <View style={styles.noRemindersContainer}>
          <Text style={styles.noRemindersText}>No Upcoming Doses</Text>
        </View>
      )}

      {/* History Modal */}
      <Modal visible={showHistory} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>History</Text>
            <FlatList
              data={historyReminders}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View style={styles.historyCard}>
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.historyImage} />
                  ) : (
                    <View style={styles.historyPlaceholderImage}>
                      <Text style={styles.historyImageText}>{item.medicineName[0]}</Text>
                    </View>
                  )}
                  <View style={styles.historyDetails}>
                    <Text style={styles.historyMedicineName} numberOfLines={1} ellipsizeMode="tail">
                      {item.medicineName}
                    </Text>
                    <Text style={styles.historyDescription} numberOfLines={2} ellipsizeMode="tail">
                      {item.medicineDescription}
                    </Text>
                    <Text style={styles.historyTime}>
                      {new Date(item.time).toLocaleTimeString()}
                    </Text>
                    <Text style={styles.historyStatus}>
                      {item.taken ? 'Taken' : 'Skipped'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.historyDeleteButton}
                    onPress={() => handleDeleteHistory(index)}
                  >
                    <MaterialIcons name="delete" size={20} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.deleteAllButton}
              onPress={handleDeleteAllHistory}
            >
              <Text style={styles.deleteAllButtonText}>Delete All History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowHistory(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f9fc',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   calendarWrapper: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1,
//     backgroundColor: '#f7f9fc',
//     paddingTop: 16,
//   },
//   calendarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 6,
//     paddingHorizontal: 8,
//   },
//   dateContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 50,
//     height: 70,
//     borderRadius: 40,
//     backgroundColor: '#f5f5f5',
//     marginHorizontal: 6,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 5,
//   },
//   activeDateContainer: {
//     backgroundColor: '#FF7F7F',
//   },
//   dayText: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   activeDayText: {
//     color: '#fff',
//   },
//   dateText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   activeDateText: {
//     color: '#fff',
//   },
//   upcomingDosesContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 80, // Adjust this value to position the text below the calendar
//     marginBottom: 16,
//   },
//   upcomingDosesText: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#333',
//   },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 40, // Increased borderRadius for oval shape
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 5,
//     width: width - 32,
//   },
//   image: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     marginRight: 16,
//   },
//   placeholderImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   imageText: {
//     fontSize: 24,
//     color: '#666',
//     fontWeight: 'bold',
//   },
//   details: {
//     flex: 1,
//     marginRight: 16,
//   },
//   medicineName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//     maxWidth: width * 0.5,
//   },
//   description: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//     maxWidth: width * 0.5,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   medicationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   time: {
//     fontSize: 14,
//     color: '#555',
//     marginLeft: 4,
//   },
//   medicationText: {
//     fontSize: 14,
//     color: '#555',
//     marginLeft: 4,
//   },
//   actions: {
//     flexDirection: 'column',
//     gap: 8,
//   },
//   actionButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minWidth: 100,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   takenButton: {
//     backgroundColor: '#e8f5e9', // Soft green background
//   },
//   skippedButton: {
//     backgroundColor: '#ffebee', // Soft red background
//   },
//   disabledButton: {
//     backgroundColor: '#f5f5f5', // Neutral gray for disabled state
//   },
//   actionButtonText: {
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   takenButtonText: {
//     color: '#2e7d32', // Dark green text for taken button
//   },
//   skippedButtonText: {
//     color: '#c62828', // Dark red text for skipped button
//   },
//   disabledButtonText: {
//     color: '#9e9e9e', // Gray text for disabled state
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     width: width - 32,
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 16,
//   },
//   historyCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 26,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 5,
//   },
//   historyImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     marginRight: 16,
//   },
//   historyPlaceholderImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   historyImageText: {
//     fontSize: 24,
//     color: '#666',
//     fontWeight: 'bold',
//   },
//   historyDetails: {
//     flex: 1,
//     marginRight: 16,
//   },
//   historyMedicineName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//   },
//   historyDescription: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//   },
//   historyTime: {
//     fontSize: 14,
//     color: '#555',
//   },
//   historyStatus: {
//     fontSize: 14,
//     color: '#555',
//   },
//   historyDeleteButton: {
//     padding: 8,
//   },
//   deleteAllButton: {
//     backgroundColor: '#FF7F7F',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   deleteAllButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   closeButton: {
//     backgroundColor: '#4A90E2',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   noRemindersContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noRemindersText: {
//     fontSize: 18,
//     color: '#666',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  calendarWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#f7f9fc',
    paddingTop: 16,
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginTop:1,
  },
  activeDateContainer: {
    backgroundColor: '#FF7F7F',
  },
  dayText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  activeDayText: {
    color: '#fff',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  activeDateText: {
    color: '#fff',
  },
  upcomingDosesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 100, // Adjust this value to position the text below the calendar
    marginBottom: 26,
  },
  upcomingDosesText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30, // Adjusted borderRadius for a smaller oval
    padding: 12, // Reduced padding to make the card smaller
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    width: width - 48, // Reduced width to fit the screen better
    marginRight: 25, // Adjusted margin to center the card
    marginLeft:0,
  },
  image: {
    width: 70, // Reduced image size
    height: 70, // Reduced image size
    borderRadius: 12,
    marginRight: 12, // Adjusted margin
  },
  placeholderImage: {
    width: 50, // Reduced placeholder size
    height: 50, // Reduced placeholder size
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12, // Adjusted margin
  },
  imageText: {
    fontSize: 20, // Reduced font size
    color: '#666',
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
    marginRight: 12, // Adjusted margin
  },
  medicineName: {
    fontSize: 16, // Reduced font size
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    maxWidth: width * 0.5,
  },
  description: {
    fontSize: 12, // Reduced font size
    color: '#666',
    marginBottom: 8,
    maxWidth: width * 0.5,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  medicationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 12, // Reduced font size
    color: '#555',
    marginLeft: 4,
  },
  medicationText: {
    fontSize: 12, // Reduced font size
    color: '#555',
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'column',
    gap: 8,
  },
  actionButton: {
    paddingVertical: 6, // Reduced padding
    paddingHorizontal: 10, // Reduced padding
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80, // Reduced minWidth
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  takenButton: {
    backgroundColor: '#e8f5e9', // Soft green background
  },
  skippedButton: {
    backgroundColor: '#ffebee', // Soft red background
  },
  disabledButton: {
    backgroundColor: '#f5f5f5', // Neutral gray for disabled state
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  takenButtonText: {
    color: '#2e7d32', // Dark green text for taken button
  },
  skippedButtonText: {
    color: '#c62828', // Dark red text for skipped button
  },
  disabledButtonText: {
    color: '#9e9e9e', // Gray text for disabled state
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: width - 32,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 26,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  historyImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  historyPlaceholderImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  historyImageText: {
    fontSize: 24,
    color: '#666',
    fontWeight: 'bold',
  },
  historyDetails: {
    flex: 1,
    marginRight: 16,
  },
  historyMedicineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  historyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  historyTime: {
    fontSize: 14,
    color: '#555',
  },
  historyStatus: {
    fontSize: 14,
    color: '#555',
  },
  historyDeleteButton: {
    padding: 8,
  },
  deleteAllButton: {
    backgroundColor: '#FF7F7F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteAllButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noRemindersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRemindersText: {
    fontSize: 18,
    color: '#666',
  },
});

export default RemindersList;