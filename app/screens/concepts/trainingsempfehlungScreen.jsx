import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";

const TrainingsempfehlungScreen = ({ route }) => {
  return (
    <ScrollView style={styles.container}>
      <Text>
        <Text style={styles.headline}>Trainingsempfehlungen</Text>
        {"\n"}
        {"\n"}
      </Text>
      <Text>
        Die Trainingsempfehlung werden auf Basis deiner letzten Trainings und
        deines Trainingsplans generiert. Dadurch hast du zu jederzeit ein
        konkretes Trainingsziel vor Augen und weißt, was du als nächstes zu tun
        hast. Die Empehlungen sind aber optional und müssen nicht beachtet
        werden.
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

export default TrainingsempfehlungScreen;
/*
 */
