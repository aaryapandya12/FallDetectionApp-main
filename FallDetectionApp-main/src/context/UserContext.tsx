// // import React, { createContext, useState } from 'react';

// // type UserData = {
// //   name: string;
// //   age: string;
// //   height: string;
// //   weight: string;
// //   emergencyContact1: string;
// //   emergencyContact2: string;
// // };

// // type UserContextType = {
// //   userData: UserData | null;
// //   setUserData: (userData: UserData) => void;
// // };

// // export const UserContext = createContext<UserContextType>({
// //   userData: null,
// //   setUserData: () => {},
// // });

// // export const UserProvider: React.FC = ({ children }) => {
// //   const [userData, setUserData] = useState<UserData | null>(null);

// //   return (
// //     <UserContext.Provider value={{ userData, setUserData }}>
// //       {children}
// //     </UserContext.Provider>
// //   );
// // };

// import React, { createContext, useState } from "react";

// type UserData = {
//   name: string;
//   age: string;
//   height: string;
//   weight: string;
//   emergencyContact1: string;
//   emergencyContact2: string;
// };

// type UserContextType = {
//   userData: UserData | null;
//   setUserData: (userData: UserData) => void;
// };

// export const UserContext = createContext<UserContextType>({
//   userData: null,
//   setUserData: () => {},
// });

// export const UserProvider: React.FC = ({ children }) => {
//   const [userData, setUserData] = useState<UserData | null>(null);

//   return (
//     <UserContext.Provider value={{ userData, setUserData }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

import React, { createContext, useState, ReactNode } from "react";

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
};

export const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => {},
});

type UserProviderProps = {
  children: ReactNode; // Explicitly define the children prop
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};