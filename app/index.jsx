import {
  Text,
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./(tabs)/home";
import Settings from "./(tabs)/profile";
import Training from "./(tabs)/training";
import Knowledge from "./(tabs)/knowledge";
import TabHome from "./(tabs)/tabHome";
import PushupScreen from "./screens/exercises/pushupScreen";
import PullupScreen from "./screens/exercises/pullupScreen";
import LegraiseScreen from "./screens/exercises/legraiseScreen";
import HandstandpushupScreen from "./screens/exercises/handstandpushupScreen";
import BridgeScreen from "./screens/exercises/bridgeScreen";
import SquatScreen from "./screens/exercises/squatScreen";
import WarmupScreen from "./screens/concepts/warmupScreen";
import TrainingsconceptScreen from "./screens/concepts/trainingsconceptScreen";
import TrainingsempfehlungScreen from "./screens/concepts/trainingsempfehlungScreen";
import TrainingsplaeneScreen from "./screens/concepts/trainingsplaeneScreen";
import GesamtLevelScreen from "./screens/concepts/gesamtLevelScreen";
import AbzeichenScreen from "./screens/abzeichenScreen";
import WelcomeScreen from "./screens/welcomeScreen";
import colors from "./colors";
import TestingScreen from "./screens/testingScreen";
import ExerciseEntryScreen from "./screens/exerciseEntryScreen";
import Storage from "expo-sqlite/kv-store";
import db, { initDb } from "./db";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    initDb();
    (async () => {
      try {
        const has_seen_welcome = await Storage.getItemAsync("has_seen_welcome");
        if (has_seen_welcome) {
          if (has_seen_welcome === "true") setShowWelcome(false);
        } else {
          await Storage.setItem("pushups", "1.0");
          await Storage.setItem("squats", "1.0");
          await Storage.setItem("pullups", "1.0");
          await Storage.setItem("leg_raises", "1.0");
          await Storage.setItem("bridges", "1.0");
          await Storage.setItem("handstand_pushups", "1.0");
          await Storage.setItem("name", "Max Mustermann");
        }
        console.log("has_seen_welcome", has_seen_welcome);
      } catch (e) {
        console.warn("Warnung aus index.js useEffect: ", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    //defining the different screens the app can navigate to
    <SafeAreaProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showWelcome ? (
          <Stack.Screen name="WelcomeScreen">
            {(props) => (
              <WelcomeScreen
                {...props}
                onDone={async () => {
                  await Storage.setItemAsync("has_seen_welcome", "true");
                  setShowWelcome(false);
                }}
              />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="TabHome" component={TabHome} />
        )}

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Training" component={Training} />
        <Stack.Screen name="Knowledge" component={Knowledge} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="PushupScreen" component={PushupScreen} />
        <Stack.Screen name="PullupScreen" component={PullupScreen} />
        <Stack.Screen name="BridgeScreen" component={BridgeScreen} />
        <Stack.Screen
          name="HandstandpushupScreen"
          component={HandstandpushupScreen}
        />
        <Stack.Screen name="LegraiseScreen" component={LegraiseScreen} />
        <Stack.Screen name="SquatScreen" component={SquatScreen} />
        <Stack.Screen name="WarmupScreen" component={WarmupScreen} />
        <Stack.Screen
          name="TrainingsconceptScreen"
          component={TrainingsconceptScreen}
        />
        <Stack.Screen
          name="TrainingsempfehlungScreen"
          component={TrainingsempfehlungScreen}
        />
        <Stack.Screen
          name="TrainingsplaeneScreen"
          component={TrainingsplaeneScreen}
        />
        <Stack.Screen name="GesamtLevelScreen" component={GesamtLevelScreen} />
        <Stack.Screen name="AbzeichenScreen" component={AbzeichenScreen} />
        <Stack.Screen name="TestingScreen" component={TestingScreen} />
        <Stack.Screen
          name="ExerciseEntryScreen"
          component={ExerciseEntryScreen}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
/*<Stack.Screen name="TabHome" component={TabHome} /><Stack.Screen name="Ansicht1" component={Ansicht1} />
      <Stack.Screen name="Ansicht2" component={Ansicht2} />
      <Stack.Screen name="Ansicht3" component={Ansicht3} />*/

/*
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "home-outline";
        } else if (route.name === "Training") {
          iconName = "barbell-outline";
        } else if (route.name === "Knowledge") {
          iconName = "book-outline";
        } else if (route.name === "Settings") {
          iconName = "settings-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.secondary,
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Training" component={Training} />
    <Tab.Screen name="Knowledge" component={Knowledge} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "lightgrey",
      }}
    >
      <TabNavigator />
      <Stack.Navigator>
        <Stack.Screen name="Training" component={Training} />
        <Stack.Screen name="Knowledge" component={Knowledge} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </View>
  );
}
*/
