import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const GesamtLevelScreen = ({ route, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ alignSelf: "flex-start", marginBottom: 10 }}
      >
        <Ionicons name="arrow-back" size={16} />
      </Pressable>
      <Text>
        <Text style={styles.headline}>Gesamt-Level</Text>
        {"\n"}
        {"\n"}
        Das Gesamt-Level auf dem Profil stellt deinen Fortschritt innerhalb des
        gesamten Trainingskonzepts dar. Jeder fängt auf Gesamt-Level 1 an,
        Maximum ist 55. Dabei werden die aktuellen Level der 6 Grundübungen
        aufsummiert. Wenn du beispielsweise bei den Kniebeugen ein Level
        aufsteigst, dann steigt auch dein Gesamt-Level um 1 an.
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  headline: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  subHeadline: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 20,
  },
});

export default GesamtLevelScreen;
/*
 */
