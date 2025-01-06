// import React from 'react';
// import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../navigation/AppNavigator';

// type MyProfileScreenRouteProp = RouteProp<RootStackParamList, 'MyProfileScreen'>;

// interface MyProfileScreenProps {
//   route: MyProfileScreenRouteProp;
// }

// const MyProfileScreen: React.FC<MyProfileScreenProps> = ({ route }) => {
//   const { userData } = route.params;
  
//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <Image
//           source={{ uri: 'https://via.placeholder.com/150' }}
//           style={styles.profileImage}
//         />
//         <Text style={styles.userName}>{userData.name}</Text>
//         <Text style={styles.userAge}>Age: {userData.age}</Text>
//         <TouchableOpacity style={styles.editButton}>
//           <MaterialIcons name="edit" size={18} color="#fff" />
//           <Text style={styles.editButtonText}>Edit Profile</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Details Section */}
//       <View style={styles.detailsSection}>
//         <View style={styles.detailItem}>
//           <Text style={styles.detailLabel}>Height</Text>
//           <Text style={styles.detailValue}>{userData.height} cm</Text>
//         </View>
//         <View style={styles.detailItem}>
//           <Text style={styles.detailLabel}>Weight</Text>
//           <Text style={styles.detailValue}>{userData.weight} kg</Text>
//         </View>
//         <View style={styles.detailItem}>
//           <Text style={styles.detailLabel}>Emergency Contact 1</Text>
//           <Text style={styles.detailValue}>{userData.emergencyContact1}</Text>
//         </View>
//         <View style={styles.detailItem}>
//           <Text style={styles.detailLabel}>Emergency Contact 2</Text>
//           <Text style={styles.detailValue}>{userData.emergencyContact2}</Text>
//         </View>
//       </View>

//       {/* Additional Info Section */}
//       <View style={styles.additionalInfoSection}>
//         <Text style={styles.sectionTitle}>Additional Information</Text>
//         <Text style={styles.additionalInfoText}>
//           This app is designed to help detect falls and ensure your safety. Please keep your profile information up to date for accurate emergency responses.
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   scrollContent: {
//     paddingBottom: 20,
//   },
//   header: {
//     alignItems: 'center',
//     paddingVertical: 30,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 15,
//     borderWidth: 3,
//     borderColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 5,
//   },
//   userAge: {
//     fontSize: 16,
//     color: '#777',
//     marginBottom: 20,
//   },
//   editButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#007bff',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 25,
//     shadowColor: '#007bff',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   editButtonText: {
//     fontSize: 16,
//     color: '#fff',
//     marginLeft: 8,
//     fontWeight: '500',
//   },
//   detailsSection: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     marginBottom: 20,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   detailItem: {
//     marginBottom: 15,
//   },
//   detailLabel: {
//     fontSize: 14,
//     color: '#777',
//     marginBottom: 5,
//     fontWeight: '500',
//   },
//   detailValue: {
//     fontSize: 16,
//     color: '#333',
//     fontWeight: '600',
//   },
//   additionalInfoSection: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 10,
//   },
//   additionalInfoText: {
//     fontSize: 14,
//     color: '#555',
//     lineHeight: 22,
//   },
// });

// export default MyProfileScreen;


import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type MyProfileScreenRouteProp = RouteProp<RootStackParamList, 'MyProfileScreen'>;

interface MyProfileScreenProps {
  route: MyProfileScreenRouteProp;
}

const MyProfileScreen: React.FC<MyProfileScreenProps> = ({ route }) => {
  const { userData = { name: '', age: '', height: '', weight: '', emergencyContact1: '', emergencyContact2: '' } } = route.params || {};

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userAge}>Age: {userData.age}</Text>
        <TouchableOpacity style={styles.editButton}>
          <MaterialIcons name="edit" size={18} color="#fff" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Details Section */}
      <View style={styles.detailsSection}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Height</Text>
          <Text style={styles.detailValue}>{userData.height} cm</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Weight</Text>
          <Text style={styles.detailValue}>{userData.weight} kg</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Emergency Contact 1</Text>
          <Text style={styles.detailValue}>{userData.emergencyContact1}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Emergency Contact 2</Text>
          <Text style={styles.detailValue}>{userData.emergencyContact2}</Text>
        </View>
      </View>

      {/* Additional Info Section */}
      <View style={styles.additionalInfoSection}>
        <Text style={styles.sectionTitle}>Additional Information</Text>
        <Text style={styles.additionalInfoText}>
          This app is designed to help detect falls and ensure your safety. Please keep your profile information up to date for accurate emergency responses.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  userAge: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  detailsSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  detailItem: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  additionalInfoSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  additionalInfoText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
});

export default MyProfileScreen;