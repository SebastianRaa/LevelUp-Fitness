import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";

const SquatScreen = ({ route }) => {
  return (
    <ScrollView style={styles.container}>
      <Text>
        <Text style={{ fontSize: 22 }}>Kniebeuge</Text>
        {"\n"}
        {"\n"}
      </Text>
      <Text>
        Level 1: Shoulderstand Squats (Schulterstand-Kniebeugen){"\n"}Anleitung:
        {"\n"}Lege dich auf den Rücken und stütze dich mit den Schultern am
        Boden ab, die Beine zeigen gerade nach oben. Stütze dich mit den Händen
        am unteren Rücken ab. Beuge langsam die Knie und senke deine Füße in
        Richtung Gesicht. Halte die Bewegung kontrolliert und kehre in die
        Ausgangsposition zurück. Halte dabei Bauch- und Beinmuskulatur
        angespannt. {"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 10 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 25 Wdh.{"\n"}Level-Up: 3 Sätze à 50 Wdh.
        {"\n"}
        {"\n"}Level 2: Jackknife Squats (Klappmesser-Kniebeugen){"\n"}Anleitung:
        {"\n"}Stelle dich mit leicht gespreizten Beinen hin und halte dich an
        einer stabilen Erhöhung vor dir fest. Die Erhöhung sollte bis zu deinen
        Schienbeienen gehen. Beuge Knie und Hüfte gleichzeitig, bis dein Po nahe
        an den Fersen ist. Der Oberkörper ist dabei nach vorne geneigt. Halte
        die Fersen flach am Boden. Nutze die Arme leicht zur Stabilisierung,
        ohne Schwung zu holen. Anschließend wieder nach oben drücken. {"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 10 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 20 Wdh.{"\n"}Level-Up: 3 Sätze à 40 Wdh.​
        {"\n"}
        {"\n"}Level 3: Supported Squats (Gestützte Kniebeugen){"\n"}Anleitung:
        {"\n"}Stelle dich aufrecht hin, die Füße schulterbreit, und halte dich
        an einem stabilen Gegenstand vor dir fest (z. B. Tischkante). Beuge Knie
        und Hüfte, bis du so tief wie möglich in die Hocke gehst. Verwende deine
        Arme nur leicht zur Unterstützung beim Hochdrücken. Achte auf einen
        geraden Rücken und feste Fußstellung. {"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 10 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 15 Wdh.{"\n"}Level-Up: 3 Sätze à 30 Wdh.​
        {"\n"}
        {"\n"}Level 4: Half Squats (Halbe Kniebeugen){"\n"}Anleitung:{"\n"}
        Stelle dich mit den Füßen leicht nach außen gedreht schulterbreit auf.
        Beuge die Knie etwa bis 90 Grad, der Rücken bleibt gerade. Halte kurz in
        der unteren Position, bevor du dich kraftvoll wieder aufrichtest.
        Vermeide Schwung und halte die Fersen am Boden.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 8 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 35 Wdh.{"\n"}Level-Up: 2 Sätze à 50 Wdh.​
        {"\n"}
        {"\n"}Level 5: Full Squats (Volle Kniebeugen){"\n"}Anleitung:{"\n"}Füße
        schulterbreit, Arme vor der Brust. Beuge dich kontrolliert tief nach
        unten, bis deine Oberschenkel deine Waden berühren. Halte kurz unten,
        bevor du dich kraftvoll wieder aufrichtest. Achte auf stabile
        Fußstellung und eine gerade Wirbelsäule.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 10 Wdh.{"\n"}Level-Up: 2 Sätze à 30 Wdh.
        {"\n"}
        {"\n"}Level 6: Close Squats (Enge Kniebeugen){"\n"}Anleitung:{"\n"}
        Stelle deine Füße nah zusammen, Zehen zeigen leicht nach außen. Führe
        eine tiefe Kniebeuge mit geradem Rücken aus. Diese Variante erhöht die
        Belastung auf die Oberschenkelmuskulatur deutlich. Halte unten kurz inne
        und drücke dich wieder hoch.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 10 Wdh.{"\n"}Level-Up: 2 Sätze à 20 Wdh.
        {"\n"}
        {"\n"}Level 7: Uneven Squats (Ungleichgewicht-Kniebeugen){"\n"}
        Anleitung:{"\n"}Stelle einen Fuß nach vorne gestreckt auf eine Erhöhung
        (z. B. Basketball, Stapel Bücher), das andere bleibt senkrecht auf dem
        Boden. Senke dich langsam ab, wobei das belastete Bein die Hauptarbeit
        übernimmt. Halte das Gleichgewicht und drücke dich wieder hoch. Seite
        wechseln.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh. pro Seite{"\n"}
        Fortgeschritten: 2 Sätze à 10 Wdh. pro Seite{"\n"}Level-Up: 2 Sätze à 20
        Wdh. pro Seite​{"\n"}
        {"\n"}Level 8: Half One-Leg Squats (Halbe Einbein-Kniebeugen){"\n"}
        Anleitung:{"\n"}Stelle dich auf ein Bein, das andere bleibt gestreckt
        auf Höhe deiner Oberschenkel in der Luft vor dir. Beuge das Standbein,
        bis das Knie ca. 90 Grad erreicht. Halte kurz unten, dann drücke dich
        wieder hoch. Fordert Gleichgewicht, Hüftstabilität und Körperspannung.
        {"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh. pro Seite{"\n"}
        Fortgeschritten: 2 Sätze à 10 Wdh. pro Seite{"\n"}Level-Up: 2 Sätze à 20
        Wdh. pro Seite​{"\n"}
        {"\n"}Level 9: Assisted One-Leg Squats (Unterstützte Einbein-Kniebeugen)
        {"\n"}Anleitung:{"\n"}Stelle dich auf ein Bein und halte die andere
        Seite gestreckt nach vorne. Gehe tief in die Hocke, bis dein Bein
        vollständig gebeugt ist. Lege eine Hand auf einen Ball oder eine
        Erhöhung seitlich des Körpers, um dich leicht zu stützen. Drücke dich
        mit der Bein- und etwas Armkraft wieder hoch.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh. pro Seite{"\n"}
        Fortgeschritten: 2 Sätze à 10 Wdh. pro Seite{"\n"}Level-Up: 2 Sätze à 20
        Wdh. pro Seite​{"\n"}
        {"\n"}Level 10: One-Leg Squats (Einbein-Kniebeugen){"\n"}Anleitung:
        {"\n"}Stehe auf einem Bein, das andere Bein gestreckt vor dir in der
        Luft. Senke dich langsam ganz tief ab, bis dein Oberschenkel deine Wade
        berührt. Halte die Spannung und drücke dich kraftvoll mit dem Standbein
        wieder hoch. Vermeide es, zu kippen oder Schwung zu nutzen. Halte die
        Arme zur Balance vor dir.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 1 Wdh. pro Seite{"\n"}
        Fortgeschritten: 2 Sätze à 10 Wdh. pro Seite{"\n"}Level-Up: 2 Sätze à 50
        Wdh. pro Seite
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default SquatScreen;
/*
 */
