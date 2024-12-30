import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "./Footer";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slidable images for the carousel
  const carouselImages = [
    {
      id: 1,
      uri: "https://via.placeholder.com/300", // Replace with actual image URL
    },
    {
      id: 2,
      uri: "https://via.placeholder.com/300", // Replace with actual image URL
    },
    {
      id: 3,
      uri: "https://via.placeholder.com/300", // Replace with actual image URL
    },
  ];

  // Key Features of the Project
  const keyFeatures = [
    {
      id: 1,
      icon: "heart",
      title: "Health Monitoring",
      description: "Track heart rate, oxygen levels, and activity in real-time.",
      color: "#4CAF50",
    },
    {
      id: 2,
      icon: "alert",
      title: "Fall Detection",
      description: "Automatically detect falls and send alerts to caregivers.",
      color: "#FF5252",
    },
    {
      id: 3,
      icon: "call",
      title: "Emergency Contacts",
      description:
        "Quickly connect with family or nearby hospitals in emergencies.",
      color: "#2196F3",
    },
    {
      id: 4,
      icon: "location",
      title: "GPS Tracking",
      description:
        "Locate the user in case of an emergency for faster assistance.",
      color: "#FFC107",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Navigation Bar at the top */}
      <View style={styles.navbar}>
        <Text style={styles.navText}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate("PersonalDetail")}>
          <Ionicons name="person-circle" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {/* Welcome Section */}
      <LinearGradient
        colors={["#007bff", "#00bfff"]}
        style={styles.welcomeBackground}
      >
        <Text style={styles.welcomeText}>
          Welcome to our Health Monitoring App
        </Text>
        <Text style={styles.subtitleText}>
          Empowering Safety and Well-being for Elders
        </Text>
      </LinearGradient>

      {/* Slidable Image Carousel */}
      <View style={styles.carouselContainer}>
        <Swiper
          autoplay
          autoplayTimeout={5}
          showsPagination
          paginationStyle={styles.pagination}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          onIndexChanged={(index) => setCurrentSlide(index)}
        >
          {carouselImages.map((image) => (
            <View key={image.id} style={styles.slide}>
              <Image source={{ uri: image.uri }} style={styles.carouselImage} />
              <View style={styles.imageOverlay} />
            </View>
          ))}
        </Swiper>
      </View>

      {/* Key Features Section */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Key Features</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuresScroll}
        >
          {keyFeatures.map((feature) => (
            <View
              key={feature.id}
              style={[styles.featureCard, { backgroundColor: feature.color }]}
            >
              <Ionicons name={feature.icon} size={32} color="white" />
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Footer with activeScreen prop */}
      <Footer navigation={navigation} activeScreen="HomeScreen" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#007bff",
    elevation: 4,
  },
  navText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Roboto-Bold",
  },
  welcomeBackground: {
    width: "100%",
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto-Bold",
  },
  subtitleText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Roboto-Regular",
  },
  carouselContainer: {
    height: 200,
    width: "100%",
    marginBottom: 20,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  carouselImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
  },
  pagination: {
    bottom: 10,
  },
  dot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#007bff",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  featuresContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    fontFamily: "Roboto-Bold",
  },
  featuresScroll: {
    paddingHorizontal: 10,
  },
  featureCard: {
    width: 160,
    padding: 16,
    borderRadius: 12,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Roboto-Bold",
  },
  featureDescription: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
    marginTop: 8,
    fontFamily: "Roboto-Regular",
  },
});

export default HomeScreen;