import React from "react";
import AppNavigator from "./src/navigation/AppNavigator"; // Import the navigator
import { UserProvider } from "./src/context/UserContext"; // Import the UserProvider

const App: React.FC = () => {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
};

export default App;