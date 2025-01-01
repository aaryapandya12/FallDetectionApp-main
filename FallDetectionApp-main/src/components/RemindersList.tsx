// // import React, { useEffect, useState } from 'react';
// // import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // interface Reminder {
// //   id: string;
// //   medicineName: string;
// //   medicineDescription: string;
// //   image: string | null;
// //   time: Date;
// //   startDate: string;
// //   endDate: string;
// //   taken: boolean;
// //   skipped: boolean;
// // }

// // interface Props {
// //   reminders: Reminder[];
// //   onEdit: (index: number) => void;
// //   onDelete: (index: number) => void;
// //   onTaken: (index: number) => void;
// //   onSkipped: (index: number) => void;
// // }

// // const RemindersList: React.FC<Props> = ({ reminders, onEdit, onDelete, onTaken, onSkipped }) => {
// //   const [localReminders, setLocalReminders] = useState<Reminder[]>([]);

// //   useEffect(() => {
// //     const loadReminders = async () => {
// //       try {
// //         const storedReminders = await AsyncStorage.getItem('reminders');
// //         if (storedReminders) {
// //           setLocalReminders(JSON.parse(storedReminders));
// //         }
// //       } catch (error) {
// //         console.error('Error loading reminders from storage:', error);
// //       }
// //     };

// //     loadReminders();
// //   }, [reminders]); // Reload reminders when the `reminders` prop changes

// //   return (
// //     <View style={styles.container}>
// //       <FlatList
// //         data={localReminders}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item, index }) => (
// //           <View style={styles.card}>
// //             {item.image ? (
// //               <Image source={{ uri: item.image }} style={styles.image} />
// //             ) : (
// //               <View style={styles.placeholderImage}>
// //                 <Text style={styles.imageText}>{item.medicineName[0]}</Text>
// //               </View>
// //             )}
// //             <View style={styles.details}>
// //               <Text style={styles.medicineName}>{item.medicineName}</Text>
// //               <Text style={styles.description}>{item.medicineDescription}</Text>
// //               <Text style={styles.time}>⏰ {new Date(item.time).toLocaleTimeString()}</Text>
// //               <Text style={styles.duration}>📅 {item.startDate} to {item.endDate}</Text>
// //             </View>
// //             <View style={styles.actions}>
// //               <TouchableOpacity
// //                 style={[styles.actionButton, styles.takenButton, item.taken && styles.disabledButton]}
// //                 onPress={() => onTaken(index)}
// //                 disabled={item.taken || item.skipped}
// //               >
// //                 <Text style={styles.actionButtonText}>{item.taken ? 'Taken ✅' : 'Mark as Taken'}</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity
// //                 style={[styles.actionButton, styles.skippedButton, item.skipped && styles.disabledButton]}
// //                 onPress={() => onSkipped(index)}
// //                 disabled={item.skipped || item.taken}
// //               >
// //                 <Text style={styles.actionButtonText}>{item.skipped ? 'Skipped ❌' : 'Mark as Skipped'}</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         )}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f7f9fc',
// //     paddingHorizontal: 16,
// //     paddingTop: 16,
// //   },
// //   card: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     padding: 16,
// //     marginBottom: 12,
// //     shadowColor: '#000',
// //     shadowOpacity: 0.1,
// //     shadowRadius: 6,
// //     shadowOffset: { width: 0, height: 2 },
// //     elevation: 3,
// //   },
// //   image: {
// //     width: 60,
// //     height: 60,
// //     borderRadius: 30,
// //     marginRight: 16,
// //   },
// //   placeholderImage: {
// //     width: 60,
// //     height: 60,
// //     borderRadius: 30,
// //     backgroundColor: '#e0e0e0',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginRight: 16,
// //   },
// //   imageText: {
// //     fontSize: 24,
// //     color: '#666',
// //     fontWeight: 'bold',
// //   },
// //   details: {
// //     flex: 1,
// //   },
// //   medicineName: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: '#333',
// //     marginBottom: 4,
// //   },
// //   description: {
// //     fontSize: 14,
// //     color: '#666',
// //     marginBottom: 8,
// //   },
// //   time: {
// //     fontSize: 14,
// //     color: '#555',
// //   },
// //   duration: {
// //     fontSize: 14,
// //     color: '#555',
// //   },
// //   actions: {
// //     flexDirection: 'row',
// //     gap: 8,
// //   },
// //   actionButton: {
// //     paddingVertical: 8,
// //     paddingHorizontal: 12,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   takenButton: {
// //     backgroundColor: '#48BB78',
// //   },
// //   skippedButton: {
// //     backgroundColor: '#F56565',
// //   },
// //   disabledButton: {
// //     backgroundColor: '#ccc',
// //   },
// //   actionButtonText: {
// //     color: '#fff',
// //     fontSize: 12,
// //     fontWeight: '500',
// //   },
// // });

// // export default RemindersList;

// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface Reminder {
//   id: string;
//   medicineName: string;
//   medicineDescription: string;
//   image: string | null;
//   time: Date;
//   startDate: string;
//   endDate: string;
//   taken: boolean;
//   skipped: boolean;
// }

// interface Props {
//   reminders: Reminder[];
//   onEdit: (index: number) => void;
//   onDelete: (index: number) => void;
//   onTaken: (index: number) => void;
//   onSkipped: (index: number) => void;
// }

// const RemindersList: React.FC<Props> = ({ reminders, onEdit, onDelete, onTaken, onSkipped }) => {
//   const [localReminders, setLocalReminders] = useState<Reminder[]>([]);

//   useEffect(() => {
//     const loadReminders = async () => {
//       try {
//         const storedReminders = await AsyncStorage.getItem('reminders');
//         if (storedReminders) {
//           setLocalReminders(JSON.parse(storedReminders));
//         }
//       } catch (error) {
//         console.error('Error loading reminders from storage:', error);
//       }
//     };

//     loadReminders();
//   }, [reminders]); // Reload reminders when the `reminders` prop changes

//   return (
//     <View style={styles.container}>
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
//               <Text style={styles.time}>⏰ {new Date(item.time).toLocaleTimeString()}</Text>
//               <Text style={styles.duration}>📅 {item.startDate} to {item.endDate}</Text>
//             </View>
//             <View style={styles.actions}>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.takenButton, item.taken && styles.disabledButton]}
//                 onPress={() => onTaken(index)}
//                 disabled={item.taken || item.skipped}
//               >
//                 <Text style={styles.actionButtonText}>{item.taken ? 'Taken ✅' : 'Mark as Taken'}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.skippedButton, item.skipped && styles.disabledButton]}
//                 onPress={() => onSkipped(index)}
//                 disabled={item.skipped || item.taken}
//               >
//                 <Text style={styles.actionButtonText}>{item.skipped ? 'Skipped ❌' : 'Mark as Skipped'}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
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
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//     width: width - 32, // Ensure the card doesn't overflow the screen
//   },
//   image: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 16,
//   },
//   placeholderImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
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
//     maxWidth: width * 0.5, // Limit width to prevent overflow
//   },
//   description: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//     maxWidth: width * 0.5, // Limit width to prevent overflow
//   },
//   time: {
//     fontSize: 14,
//     color: '#555',
//   },
//   duration: {
//     fontSize: 14,
//     color: '#555',
//   },
//   actions: {
//     flexDirection: 'column', // Stack buttons vertically
//     gap: 8,
//   },
//   actionButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minWidth: 100, // Ensure buttons have a minimum width
//   },
//   takenButton: {
//     backgroundColor: '#48BB78',
//   },
//   skippedButton: {
//     backgroundColor: '#F56565',
//   },
//   disabledButton: {
//     backgroundColor: '#ccc',
//   },
//   actionButtonText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '500',
//   },
// });

// export default RemindersList;


import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; // For icons

interface Reminder {
  id: string;
  medicineName: string;
  medicineDescription: string;
  image: string | null;
  time: Date;
  startDate: string;
  endDate: string;
  taken: boolean;
  skipped: boolean;
}

interface Props {
  reminders: Reminder[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onTaken: (index: number) => void;
  onSkipped: (index: number) => void;
}

const RemindersList: React.FC<Props> = ({ reminders, onEdit, onDelete, onTaken, onSkipped }) => {
  const [localReminders, setLocalReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    const loadReminders = async () => {
      try {
        const storedReminders = await AsyncStorage.getItem('reminders');
        if (storedReminders) {
          setLocalReminders(JSON.parse(storedReminders));
        }
      } catch (error) {
        console.error('Error loading reminders from storage:', error);
      }
    };

    loadReminders();
  }, [reminders]); // Reload reminders when the `reminders` prop changes

  return (
    <View style={styles.container}>
      <FlatList
        data={localReminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
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
              <View style={styles.dateContainer}>
                <MaterialIcons name="date-range" size={16} color="#555" />
                <Text style={styles.duration}>{item.startDate} to {item.endDate}</Text>
              </View>
            </View>
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
          </View>
        )}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: width - 32,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  imageText: {
    fontSize: 24,
    color: '#666',
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
    marginRight: 16,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    maxWidth: width * 0.5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    maxWidth: width * 0.5,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
  },
  duration: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'column',
    gap: 8,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  takenButton: {
    backgroundColor: '#48BB78',
  },
  skippedButton: {
    backgroundColor: '#F56565',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default RemindersList;