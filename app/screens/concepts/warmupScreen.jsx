import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const WarmupScreen = ({ route, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ alignSelf: "flex-start", marginBottom: 10 }}
      >
        <Ionicons name="arrow-back" size={16} />
      </Pressable>
      <Text>
        <Text style={styles.headline}>Aufwärmen</Text>
        {"\n"}
        {"\n"}
      </Text>
      <Text>
        Beim LevelUp Fitness Programm werden für jede Grundübung jeweils 2 Sätze
        zum Aufwärmen gemacht. Diese sind von der gleichen Grundübung, aber man
        sucht sich hierfür Übungen von deutlich einfacheren Leveln aus, soweit
        möglich.
        {"\n"}
        {"\n"}Beispiel für Liegestütze Level 3:
        {"\n"}Aufwärmen: Wandliegestütze (L1) 1x10 {"\n"}Aufwärmen: Schräge
        Liegestütze (L2) 1x10
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
