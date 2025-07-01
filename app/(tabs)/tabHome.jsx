import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./home";
import Profil from "./profile";
import Training from "./training";
import Knowledge from "./knowledge";
import colors from "../colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

//Konfiguration der "Bottom Tab Bar"
export default function TabHome() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Trainingshistorie") {
            iconName = "bar-chart-outline";
          } else if (route.name === "Know-how") {
            iconName = "book-outline";
          } else if (route.name === "Profil") {
            iconName = "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Trainingshistorie" component={Training} />
      <Tab.Screen name="Know-how" component={Knowledge} />
      <Tab.Screen name="Profil" component={Profil} />
    </Tab.Navigator>
  );
}
