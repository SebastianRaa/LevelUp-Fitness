import { Text, SafeAreaView, StyleSheet, Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./(tabs)/home";
import Settings from "./(tabs)/profile";
import Training from "./(tabs)/training";
import Knowledge from "./(tabs)/knowledge";
import TabHome from "./(tabs)/tabHome";
import PushupScreen from "./screens/pushupScreen";
import PullupScreen from "./screens/pullupScreen";
import LegraiseScreen from "./screens/legraiseScreen";
import HandstandpushupScreen from "./screens/handstandpushupScreen";
import BridgeScreen from "./screens/bridgeScreen";
import SquatScreen from "./screens/squatScreen";
import WarmupScreen from "./screens/warmupScreen";
import TrainingsconceptScreen from "./screens/trainingsconceptScreen";
import TrainingsempfehlungScreen from "./screens/trainingsempfehlungScreen";
import TrainingsplaeneScreen from "./screens/trainingsplaeneScreen";
import AbzeichenScreen from "./screens/abzeichenScreen";
import colors from "./colors";
import TestingScreen from "./screens/testingScreen";
import ExerciseEntryScreen from "./screens/exerciseEntryScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
/*
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

//defining the different screens the app can navigate to
export default function App() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabHome" component={TabHome} />
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
      <Stack.Screen name="AbzeichenScreen" component={AbzeichenScreen} />
      <Stack.Screen name="TestingScreen" component={TestingScreen} />
      <Stack.Screen
        name="ExerciseEntryScreen"
        component={ExerciseEntryScreen}
      />
    </Stack.Navigator>
  );
}
/*<Stack.Screen name="Ansicht1" component={Ansicht1} />
      <Stack.Screen name="Ansicht2" component={Ansicht2} />
      <Stack.Screen name="Ansicht3" component={Ansicht3} />*/
