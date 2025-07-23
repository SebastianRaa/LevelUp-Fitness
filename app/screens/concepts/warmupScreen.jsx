import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";

const WarmupScreen = ({ route }) => {
  return (
    <ScrollView style={styles.container}>
      <Text>
        <Text style={styles.headline}>Warmup</Text>
        {"\n"}
        {"\n"}
      </Text>
      <Text>
        Beim LevelUp Fitness Programm werden für jede Übung jeweils 2 Warmup
        Sätze vorher gemacht. Diese sind von der gleichen Grundübung, aber man
        sucht sich Übungen von deutlich einfacheren Leveln aus, soweit möglich.
        {"\n"}
        {"\n"}Beispiel:
        {"\n"}Warm Up: Wall Push Ups 1x15 (Level 1){"\n"}Warm Up: Incline Push
        Ups 1x15 (Level 2){"\n"}Work: Kneeling Push Ups 2x20 (Level 3)
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

export default WarmupScreen;
/*
 */
