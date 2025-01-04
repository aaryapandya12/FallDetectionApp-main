import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native';
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
  numberOfMedications: number; // Added field
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
  const [currentDate, setCurrentDate] = useState(new Date());

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

  return (
    <View style={styles.container}>
      {/* Render the calendar */}
      {renderCalendar()}

      {/* Render the reminders list */}
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
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 56,
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
  card: {
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
  medicationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
  },
  medicationText: {
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
});

export default RemindersList;