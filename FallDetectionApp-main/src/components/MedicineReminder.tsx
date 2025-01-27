import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Alert,
  FlatList,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import RemindersList from "./RemindersList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Reminder } from "./types";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function MedicineReminder() {
  const [medicineName, setMedicineName] = useState("");
  const [medicineDescription, setMedicineDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [time, setTime] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [historyReminders, setHistoryReminders] = useState<Reminder[]>([]); // New state for history
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [activeReminder, setActiveReminder] = useState<Reminder | null>(null);
  const [showRemindersList, setShowRemindersList] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });
  const [frequency, setFrequency] = useState("daily");
  const [numberOfMedications, setNumberOfMedications] = useState(1);
  const [showHistory, setShowHistory] = useState(false); // New state for history modal

  const API_URL = "http://192.168.1.4:5000/api";

  // Fetch reminders from the backend
  const fetchReminders = async () => {
    try {
      const response = await fetch(`${API_URL}/reminders`);
      const data = await response.json();
      setReminders(data);
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
  }, []);


  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Notification permissions are required to set reminders.");
      }
    };
    requestPermissions();

    const notificationSubscription =
      Notifications.addNotificationReceivedListener(handleNotificationReceived);
    return () => notificationSubscription.remove();
  }, []);

  useEffect(() => {
    const loadReminders = async () => {
      try {
        const storedReminders = await AsyncStorage.getItem("reminders");
        const storedHistory = await AsyncStorage.getItem("historyReminders");

        if (storedReminders) {
          const parsedReminders: Reminder[] = JSON.parse(storedReminders);
          setReminders(parsedReminders);
        }

        if (storedHistory) {
          const parsedHistory: Reminder[] = JSON.parse(storedHistory);
          setHistoryReminders(parsedHistory);
        }
      } catch (error) {
        console.error("Error loading reminders from storage:", error);
      }
    };

    loadReminders();
  }, []);

  const saveRemindersToStorage = async (reminders: Reminder[]) => {
    try {
      await AsyncStorage.setItem("reminders", JSON.stringify(reminders));
    } catch (error) {
      console.error("Error saving reminders to storage:", error);
    }
  };

  const saveHistoryToStorage = async (history: Reminder[]) => {
    try {
      await AsyncStorage.setItem("historyReminders", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving history to storage:", error);
    }
  };

  const handleNotificationReceived = async (
    notification: Notifications.Notification
  ) => {
    console.log("Notification received:", notification);
    await playSound();
    setIsAlarmActive(true);
    setActiveReminder({
      id: notification.request.identifier,
      medicineName: notification.request.content.title || "",
      medicineDescription: notification.request.content.body || "",
      image: notification.request.content.data?.image || null,
      time: new Date(),
      startDate: "",
      endDate: "",
      taken: false,
      skipped: false,
      numberOfMedications: 1,
    });
  };

  const playSound = async () => {
    try {
      console.log("Playing sound...");
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/alarm.wav"),
        { isLooping: true } // Loop the sound
      );
      setSound(sound);
      await sound.playAsync();

      // Automatically stop the sound after 10 minutes (600,000 milliseconds)
      setTimeout(() => {
        stopSound();
      }, 600000); // 10 minutes
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsAlarmActive(false);
      setActiveReminder(null);
    }
  };

  const snoozeAlarm = async () => {
    if (activeReminder) {
      const snoozeTime = new Date();
      snoozeTime.setMinutes(snoozeTime.getMinutes() + 5);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Snoozed: ${activeReminder.medicineName}`,
          body: "Reminder snoozed for 5 minutes.",
          sound: true,
          data: { image: activeReminder.image },
        },
        trigger: snoozeTime,
      });

      stopSound(); // Stop the sound when snoozing
      alert("Reminder snoozed for 5 minutes.");
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const scheduleNotification = async () => {
    if (
      !medicineName ||
      !image ||
      !selectedDates.startDate ||
      !selectedDates.endDate
    ) {
      alert(
        "Please fill all fields, upload an image, and select the duration."
      );
      return;
    }

    const trigger = new Date(time);
    if (trigger <= new Date()) {
      alert("Please select a future time for the reminder.");
      return;
    }

    const newReminder: Reminder = {
      id: Math.random().toString(),
      medicineName,
      medicineDescription,
      image,
      time,
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
      taken: false,
      skipped: false,
      frequency,
      numberOfMedications,
    };

    // if (editingIndex !== null) {
    //   const updatedReminders = [...reminders];
    //   updatedReminders[editingIndex] = newReminder;
    //   setReminders(updatedReminders);
    //   saveRemindersToStorage(updatedReminders);
    //   setEditingIndex(null);
    // } else {
    //   const updatedReminders = [...reminders, newReminder];
    //   setReminders(updatedReminders);
    //   saveRemindersToStorage(updatedReminders);
    // }

    try {
      if (editingIndex !== null) {
        // Update reminder
        const response = await fetch(`${API_URL}/reminders/${reminders[editingIndex].id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReminder),
        });
        const updatedReminder = await response.json();
        const updatedReminders = [...reminders];
        updatedReminders[editingIndex] = updatedReminder;
        setReminders(updatedReminders);
        setEditingIndex(null);
      } else {
        // Add new reminder
        const response = await fetch(`${API_URL}/reminders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReminder),
        });
        const addedReminder = await response.json();
        setReminders([...reminders, addedReminder]);
      }

    // Schedule notifications for each day between startDate and endDate
    const startDate = new Date(selectedDates.startDate);
    const endDate = new Date(selectedDates.endDate);
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const notificationTime = new Date(currentDate);
      notificationTime.setHours(trigger.getHours(), trigger.getMinutes(), 0, 0);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Medicine Reminder: ${medicineName}`,
          body: medicineDescription || "Time to take your medicine!",
          sound: true,
          data: { image },
          categoryIdentifier: 'alarm', // Add the category for actions
        },
        trigger: notificationTime,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    setMedicineName("");
    setMedicineDescription("");
    setImage(null);
    setTime(new Date());
    setSelectedDates({ startDate: "", endDate: "" });
    setFrequency("daily");
    setNumberOfMedications(1);

    alert(
      editingIndex !== null
        ? "Reminder updated successfully!"
        : "Reminder set successfully!"
    );
  } catch (error) {
    console.error("Error saving reminder:", error);
  }
};

  const handleEdit = (index: number) => {
    const reminder = reminders[index];
    setMedicineName(reminder.medicineName);
    setMedicineDescription(reminder.medicineDescription);
    setImage(reminder.image);
    setTime(reminder.time);
    setSelectedDates({
      startDate: reminder.startDate,
      endDate: reminder.endDate,
    });
    setFrequency(reminder.frequency || "daily");
    setNumberOfMedications(reminder.numberOfMedications || 1);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedReminders = reminders.filter((_, i) => i !== index);
            setReminders(updatedReminders);
            saveRemindersToStorage(updatedReminders);
          },
        },
      ]
    );
  };

  // const handleTaken = (index: number) => {
  //   const updatedReminders = [...reminders];
  //   const takenReminder = updatedReminders[index];
  //   takenReminder.taken = true;

  //   // Move the reminder to history
  //   const updatedHistory = [...historyReminders, takenReminder];
  //   setHistoryReminders(updatedHistory);
  //   saveHistoryToStorage(updatedHistory);

  //   // Remove the reminder from the active list
  //   updatedReminders.splice(index, 1);
  //   setReminders(updatedReminders);
  //   saveRemindersToStorage(updatedReminders);
  // };

  const handleTaken = async (index: number) => {
    try {
      const response = await fetch(`${API_URL}/reminders/${reminders[index].id}/taken`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to mark reminder as taken");
      }
  
      const data = await response.json();
      console.log("Reminder marked as taken:", data);
  
      // Update local state
      const updatedReminders = reminders.filter((_, i) => i !== index);
      setReminders(updatedReminders);
  
      const updatedHistory = [...historyReminders, data.reminder];
      setHistoryReminders(updatedHistory);
    } catch (error) {
      console.error("Error marking reminder as taken:", error);
    }
  };

  // const handleSkipped = (index: number) => {
  //   const updatedReminders = [...reminders];
  //   const skippedReminder = updatedReminders[index];
  //   skippedReminder.skipped = true;

  //   // Move the reminder to history
  //   const updatedHistory = [...historyReminders, skippedReminder];
  //   setHistoryReminders(updatedHistory);
  //   saveHistoryToStorage(updatedHistory);

  //   // Remove the reminder from the active list
  //   updatedReminders.splice(index, 1);
  //   setReminders(updatedReminders);
  //   saveRemindersToStorage(updatedReminders);
  // };
  const handleSkipped = async (index: number) => {
    try {
      const response = await fetch(`${API_URL}/reminders/${reminders[index].id}/skipped`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to mark reminder as skipped");
      }
  
      const data = await response.json();
      console.log("Reminder marked as skipped:", data);
  
      // Update local state
      const updatedReminders = reminders.filter((_, i) => i !== index);
      setReminders(updatedReminders);
  
      const updatedHistory = [...historyReminders, data.reminder];
      setHistoryReminders(updatedHistory);
    } catch (error) {
      console.error("Error marking reminder as skipped:", error);
    }
  };

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
            saveHistoryToStorage([]);
          },
        },
      ]
    );
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  const handleDayPress = (day: any) => {
    if (!selectedDates.startDate || selectedDates.endDate) {
      setSelectedDates({ startDate: day.dateString, endDate: "" });
    } else if (day.dateString > selectedDates.startDate) {
      setSelectedDates({ ...selectedDates, endDate: day.dateString });
    } else {
      setSelectedDates({
        startDate: day.dateString,
        endDate: selectedDates.startDate,
      });
    }
  };

  const markedDates = {
    [selectedDates.startDate]: {
      selected: true,
      startingDay: true,
      color: "#667eea",
    },
    [selectedDates.endDate]: {
      selected: true,
      endingDay: true,
      color: "#667eea",
    },
    ...(selectedDates.startDate &&
      selectedDates.endDate && {
        [`${selectedDates.startDate}-${selectedDates.endDate}`]: {
          selected: true,
          color: "#a3bffa",
        },
      }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}></View>

      {showRemindersList ? (
        <RemindersList
          reminders={reminders}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onTaken={handleTaken}
          onSkipped={handleSkipped}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <View style={styles.cardIconsContainer}>
              <Text style={styles.cardTitle}>Add a New Reminder</Text>
              <TouchableOpacity
                onPress={() => setShowRemindersList(!showRemindersList)}
                style={styles.iconButton}
              >
                <Ionicons name="list" size={28} color="#4A5568" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Medicine Name"
              placeholderTextColor="#A0AEC0"
              value={medicineName}
              onChangeText={setMedicineName}
            />

            <TextInput
              style={styles.input}
              placeholder="Description (optional)"
              placeholderTextColor="#A0AEC0"
              value={medicineDescription}
              onChangeText={setMedicineDescription}
            />

            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Ionicons name="image" size={24} color="#fff" />
              <Text style={styles.imageButtonText}>Upload Medicine Image</Text>
            </TouchableOpacity>

            {image && <Image source={{ uri: image }} style={styles.image} />}

            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Ionicons name="time" size={24} color="#fff" />
              <Text style={styles.timeButtonText}>Select Reminder Time</Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChangeTime}
              />
            )}

            <TouchableOpacity
              style={styles.calendarButton}
              onPress={() => setShowCalendarModal(true)}
            >
              <Ionicons name="calendar" size={24} color="#fff" />
              <Text style={styles.calendarButtonText}>
                Select Medicine Duration
              </Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Number of Medications"
              placeholderTextColor="#A0AEC0"
              value={numberOfMedications.toString()}
              onChangeText={(text) => setNumberOfMedications(Number(text))}
              keyboardType="numeric"
            />

            <View style={styles.frequencyContainer}>
              <Text style={styles.frequencyLabel}>Frequency:</Text>
              <TouchableOpacity
                style={[
                  styles.frequencyButton,
                  frequency === "daily" && styles.frequencyButtonSelected,
                ]}
                onPress={() => setFrequency("daily")}
              >
                <Text
                  style={[
                    styles.frequencyButtonText,
                    frequency === "daily" && styles.frequencyButtonTextSelected,
                  ]}
                >
                  Daily
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.frequencyButton,
                  frequency === "weekly" && styles.frequencyButtonSelected,
                ]}
                onPress={() => setFrequency("weekly")}
              >
                <Text
                  style={[
                    styles.frequencyButtonText,
                    frequency === "weekly" &&
                      styles.frequencyButtonTextSelected,
                  ]}
                >
                  Weekly
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.frequencyButton,
                  frequency === "custom" && styles.frequencyButtonSelected,
                ]}
                onPress={() => setFrequency("custom")}
              >
                <Text
                  style={[
                    styles.frequencyButtonText,
                    frequency === "custom" &&
                      styles.frequencyButtonTextSelected,
                  ]}
                >
                  Custom
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={scheduleNotification}
            >
              <Text style={styles.primaryButtonText}>
                {editingIndex !== null ? "Update Reminder" : "Set Reminder"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <Modal visible={showCalendarModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Duration</Text>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={markedDates}
              markingType="period"
              minDate={new Date().toISOString().split("T")[0]}
              theme={{
                selectedDayBackgroundColor: "#667eea",
                selectedDayTextColor: "#fff",
                todayTextColor: "#667eea",
                arrowColor: "#667eea",
              }}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowCalendarModal(false)}
            >
              <Text style={styles.modalButtonText}>Set</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={isAlarmActive} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Medicine Reminder</Text>
            {activeReminder?.image && (
              <Image
                source={{ uri: activeReminder.image }}
                style={styles.modalImage}
              />
            )}
            <Text style={styles.modalText}>Time to take your medicine!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={stopSound}>
              <Text style={styles.modalButtonText}>Stop Alarm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={snoozeAlarm}>
              <Text style={styles.modalButtonText}>Snooze for 5 Minutes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showHistory} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>History</Text>
            <FlatList
              data={historyReminders}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.historyItem}>
                  <Text style={styles.historyText}>
                    {item.medicineName} -{" "}
                    {new Date(item.time).toLocaleTimeString()}
                  </Text>
                  <Text style={styles.historyText}>
                    {item.taken ? "Taken" : "Skipped"}
                  </Text>
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleDeleteAllHistory}
            >
              <Text style={styles.modalButtonText}>Delete All History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowHistory(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
    padding: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 20, // Adjust for safe area
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D3748",
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  cardIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#2D3748",
  },
  imageButton: {
    backgroundColor: "#4C51BF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#4C51BF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  imageButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    marginLeft: 10,
  },
  timeButton: {
    backgroundColor: "#4C51BF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#4C51BF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  timeButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    marginLeft: 10,
  },
  calendarButton: {
    backgroundColor: "#4C51BF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#4C51BF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    marginLeft: 10,
  },
  primaryButton: {
    backgroundColor: "#48BB78",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#48BB78",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: "#4A5568",
    marginBottom: 20,
  },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: "#4C51BF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    shadowColor: "#4C51BF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  modalButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  frequencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  frequencyLabel: {
    fontSize: 16,
    color: "#2D3748",
    marginRight: 10,
  },
  frequencyButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4C51BF",
  },
  frequencyButtonSelected: {
    backgroundColor: "#4C51BF",
  },
  frequencyButtonText: {
    fontSize: 14,
    color: "#4C51BF",
  },
  frequencyButtonTextSelected: {
    color: "#fff",
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  historyText: {
    fontSize: 16,
    color: "#2D3748",
  },
});
