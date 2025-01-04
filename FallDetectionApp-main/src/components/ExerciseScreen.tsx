import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Progress from 'react-native-progress';

const ExerciseUI: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState<string>('Stretching');
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [progress, setProgress] = useState<{ date: string; duration: number }[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const exercises = [
    { name: 'Stretching', duration: 300 },
    { name: 'Meditation', duration: 600 },
    { name: 'Yoga', duration: 900 },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= exercises.find((ex) => ex.name === currentExercise)!.duration) {
            clearInterval(interval);
            setIsTimerRunning(false);
            recordProgress();
            return 0;
          }
          return prevTimer + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, currentExercise]);

  useEffect(() => {
    // Load saved progress from storage (simulated here)
    const savedProgress = [
      { date: '10/25/2023', duration: 1200 },
      { date: '10/24/2023', duration: 900 },
      { date: '10/23/2023', duration: 600 },
      { date: '10/22/2023', duration: 300 },
      { date: '10/21/2023', duration: 1200 },
      { date: '10/20/2023', duration: 900 },
      { date: '10/19/2023', duration: 600 },
    ];
    setProgress(savedProgress);
  }, []);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setTimer(0);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimer(0);
  };

  const handleExerciseChange = (exercise: string) => {
    setCurrentExercise(exercise);
    setTimer(0);
    setIsTimerRunning(false);
  };

  const recordProgress = () => {
    const date = new Date().toLocaleDateString();
    const newProgress = { date, duration: timer };
    const updatedProgress = [...progress, newProgress];
    setProgress(updatedProgress);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const getTotalDuration = (period: 'daily' | 'weekly' | 'monthly') => {
    const today = new Date();
    const filteredProgress = progress.filter((entry) => {
      const entryDate = new Date(entry.date);
      switch (period) {
        case 'daily':
          return entryDate.toLocaleDateString() === today.toLocaleDateString();
        case 'weekly':
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
          return entryDate >= startOfWeek;
        case 'monthly':
          return (
            entryDate.getMonth() === today.getMonth() &&
            entryDate.getFullYear() === today.getFullYear()
          );
        default:
          return false;
      }
    });
    return filteredProgress.reduce((acc, entry) => acc + entry.duration, 0);
  };

  const randomProgress = Math.random() * 0.8 + 0.1; // Random value between 0.1 and 0.9

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Senior Fitness App</Text> */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Choose an Exercise:</Text>
        <Picker
          selectedValue={currentExercise}
          onValueChange={(itemValue) => handleExerciseChange(itemValue as string)}
          style={styles.picker}
        >
          {exercises.map((exercise) => (
            <Picker.Item key={exercise.name} label={exercise.name} value={exercise.name} />
          ))}
        </Picker>
      </View>
      <View style={styles.videoPlaceholder}>
        <Text style={styles.placeholderText}>Video will appear here</Text>
      </View>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(timer)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isTimerRunning && styles.disabledButton]}
          onPress={startTimer}
          disabled={isTimerRunning}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isTimerRunning && styles.disabledButton]}
          onPress={stopTimer}
          disabled={!isTimerRunning}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetTimer}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Instructions:</Text>
        <Text style={styles.instructionsText}>
          {currentExercise === 'Stretching'
            ? 'Gently stretch your arms and legs. Hold each stretch for 20 seconds.'
            : currentExercise === 'Meditation'
            ? 'Sit comfortably, close your eyes, and focus on your breathing for 10 minutes.'
            : 'Perform gentle yoga poses for 15 minutes. Focus on your breath and posture.'}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.label}>Progress Chart</Text>
        <Picker
          selectedValue={selectedPeriod}
          onValueChange={(itemValue) => setSelectedPeriod(itemValue as 'daily' | 'weekly' | 'monthly')}
          style={styles.picker}
        >
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Monthly" value="monthly" />
        </Picker>
        <Text style={styles.progressText}>
          Total Exercise Time ({selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}):{' '}
          {formatTime(getTotalDuration(selectedPeriod))}
        </Text>
        <View style={styles.chartContainer}>
          <Text style={styles.chartLabel}>Exercise Progress</Text>
          <Progress.Bar
            progress={randomProgress}
            width={300}
            height={15}
            color="#007bff"
            borderRadius={10}
          />
          <Text style={styles.chartPercentage}>{(randomProgress * 100).toFixed(1)}%</Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  videoPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007bff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  resetButton: {
    backgroundColor: '#ff4444',
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 16,
    color: '#666',
  },
  progressContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  chartPercentage: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 10,
  },
});

export default ExerciseUI;

