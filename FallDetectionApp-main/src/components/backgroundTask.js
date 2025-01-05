import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';

// Define the background task for handling notifications
const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask<NotificationTaskData>(
  BACKGROUND_NOTIFICATION_TASK,
  async ({ data, error }) => {
    if (error) {
      console.error("Task error:", error);
      return;
    }

    if (data && data.notification) {
      const { notification } = data;
      console.log("Notification received in background:", notification);

      // Play the alarm sound
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/alarm.wav"),
        { isLooping: true }
      );
      await sound.playAsync();

      // Automatically stop the sound after 10 minutes (600,000 milliseconds)
      setTimeout(() => {
        sound.stopAsync();
        sound.unloadAsync();
      }, 600000); // 10 minutes
    }
  }
);

// Register the background task
Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);