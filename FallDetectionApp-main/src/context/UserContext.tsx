import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserData = {
  name: string;
  age: string;
  height: string;
  weight: string;
  emergencyContact1: string;
  emergencyContact2: string;
};

type UserContextType = {
  userData: UserData | null;
  setUserData: (userData: UserData) => void;
  userEmail: string | null;
  setUserEmail: (email: string) => void;
  clearUserData: () => void; // Add this function
};

export const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => {},
  userEmail: null,
  setUserEmail: () => {},
  clearUserData: () => {}, // Add this function
});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const saveUserData = async (data: UserData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      setUserData(data);
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData'); // Clear user data from storage
      setUserData(null); // Reset userData in state
      setUserEmail(null); // Reset userEmail in state
    } catch (error) {
      console.error('Failed to clear user data:', error);
    }
  };

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData: saveUserData, userEmail, setUserEmail, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};