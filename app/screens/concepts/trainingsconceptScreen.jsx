import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";

const TraningsconceptScreen = ({ route }) => {
  return (
    <ScrollView style={styles.container}>
      <Text>
        <Text style={styles.headline}>Trainingskonzept</Text>
        {"\n"}
        {"\n"}
      </Text>
      <Text>
        LevelUp Fitness ist ein simples, aber hoch effektives Trainingssystem
        für den Aufbau funktionaler Kraft mit dem eigenen Körpergewicht. Es ist
        ein System, das mit wenigen Geräten auskommt, überall durchführbar ist
        und auf eine gesunde Weise Muskeln aufbaut.{"\n"}
        {"\n"}Im Zentrum des Programms stehen sechs verschiedene Grundübungen:
        {"\n"}
        {"\n"}Pushups{"\n"}Squats{"\n"}Pullups{"\n"}Leg Raises{"\n"}Bridges
        {"\n"}Handstand Pushups{"\n"}
        {"\n"}Jede dieser sechs Übungen ist in zehn aufeinander aufbauende Level
        (Schwierigkeitsgrade) unterteilt – von einfacheren Einstiegsvarianten
        wie Wall-Pushups bis extrem schwierige Übungen wie einarmige Klimmzüge.
        Dabei fängt man bei jeder Grundübung auf dem ersten Level an und geht
        erst zum nächsten Level über, wenn man alle "Level-Up" Sätze mit der
        richtigen Anzahl schafft. Handstand Pushups und Bridges werden erst
        angefangen, wenn man bei den ersten vier Übungen mindestens Level 6
        errreicht hat. Zu beachten ist auch, dass Fortschritt nicht linear und
        nicht vergleichbar ist: Jeder Mensch hat individuelle Stärken und
        Schwächen. Manche steigen bei Pushups schnell auf, brauchen bei Brücken
        aber länger – und das ist völlig normal. Die meisten Sportler sollten
        mit dem Anfänger Trainingsplan einsteigen (siehe Trainingspläne).{"\n"}
        {"\n"}Wichtig ist auch die Konzentration auf Technik, Gelenkgesundheit
        und Körperspannung. Es wird nicht auf maximale Wiederholungen oder
        Zeitdruck trainiert, sondern auf Sauberkeit der Ausführung. Des Weiteren
        werden nicht die Muskeln allein trainiert, sondern auch Sehnen, Bänder,
        Gelenke und das zentrale Nervensystem – um alltagstaugliche Stärke zu
        entwickeln.
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

export default TraningsconceptScreen;
/*
 */
