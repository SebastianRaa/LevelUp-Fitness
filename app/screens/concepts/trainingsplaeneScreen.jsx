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

const TrainingsplaeneScreen = ({ route, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ alignSelf: "flex-start", marginBottom: 10 }}
      >
        <Ionicons name="arrow-back" size={16} />
      </Pressable>
      <Text>
        <Text style={styles.headline}>Trainingspläne</Text>
        {"\n"}
        {"\n"}
      </Text>
      <Text>
        Der Trainingsaufbau ist immer nur beispielhaft, die konkreten Tage
        können verändert werden.{"\n"}
        {"\n"}
        <Text style={styles.subHeadline}>Anfänger</Text>
        {"\n"}Anfänger ist ein Trainingsplan für Einsteiger und alle, die ganz
        neu mit Körpergewichtstraining oder sportlicher Aktivität beginnen. Es
        handelt sich um eine einfache Zwei-Tage-pro-Woche-Routine, die vier der
        sechs Grundübungen abdeckt: Liegestütze, Klimmzüge, Kniebeuge und
        Beinheber. Die Übungen werden jeweils mit 2-3 Arbeitssätzen trainiert.
        Brücken und Handstand-Liegestütze werden in diesem Stadium noch
        ausgelassen, da sie ein höheres Maß an Kraft und Gelenkfestigkeit
        erfordern. Diese Routine ermöglicht dem Körper - insbesondere den
        Sehnen, Gelenken und Bändern - ausreichend Erholung und Anpassung. Das
        Programm ist besonders geeignet für den Einstieg in das System und
        sollte so lange verfolgt werden, bis mindestens Level 6 in den vier
        Grundübungen erreicht ist.{"\n"}
        {"\n"}Trainingsaufbau:{"\n"}Montag: Liegestütze & Beinheber (je 2-3
        Arbeitssätze){"\n"}Freitag: Klimmzüge & Kniebeuge (je 2-3 Arbeitssätze)
        {"\n"}
        Alle anderen Tage: Pause{"\n"}
        {"\n"}
        <Text style={styles.subHeadline}>Fortgeschritten</Text>
        {"\n"}Fortgeschritten ist eine ideale Drei-Tage-pro-Woche-Routine für
        Sportler mit etwas Trainingserfahrung. In diesem Plan kommen alle sechs
        Grundübungen zum Einsatz. Trotz höherem Umfang als bei Anfänger bleibt
        genug Erholungszeit, um Fortschritte zu erzielen. Der Plan ist für
        Fortgeschrittene geeignet, wird aber auch von fortgeschritteneren
        Athleten als regelmäßige Rückkehr zur Basis empfohlen. Die Routine ist
        effizient und lässt sich gut in einen vollen Terminkalender integrieren.
        Wer langfristige Kraftzuwächse mit wenig Risiko für Überlastung sucht,
        ist hier genau richtig.{"\n"}
        {"\n"}Trainingsaufbau:{"\n"}Montag: Liegestütze & Beinheber (je 2
        Arbeitssätze){"\n"}Mittwoch: Klimmzüge & Kniebeuge (je 2 Arbeitssätze)
        {"\n"}
        Freitag: Handstand Liegestütze & Brücken (je 2 Arbeitssätze){"\n"}Alle
        anderen Tage: Pause{"\n"}
        {"\n"}
        <Text style={styles.subHeadline}>Profi</Text>
        {"\n"}Profi ist ein Sechs-Tage-pro-Woche-Plan für Sportler mit guter
        Regenerationsfähigkeit und Trainingserfahrung. Jeden Tag wird nur eine
        der sechs Grundübungen trainiert - mit voller Konzentration auf Qualität
        und Leistung. Die Einheiten sind sehr kurz, aber intensiv. Die Struktur
        stellt sicher, dass nie direkt zwei benachbarte Muskelgruppen an
        aufeinanderfolgenden Tagen belastet werden, was für eine optimale
        Erholung sorgt. Der siebte Tag ist Ruhetag. Ideal für alle, die mit
        maximalem Fokus an einer Technik arbeiten wollen, ohne den Körper zu
        überlasten.{"\n"}
        {"\n"}Trainingsaufbau:{"\n"}Montag: Klimmzüge (je 2-3 Arbeitssätze)
        {"\n"}
        Dienstag: Brücken (je 2-3 Arbeitssätze){"\n"}Mittwoch: Handstand
        Liegestütze (je 2-3 Arbeitssätze){"\n"}Donnerstag: Beinheber (je 2-3
        Arbeitssätze)
        {"\n"}Freitag: Kniebeuge (je 2-3 Arbeitssätze){"\n"}Samstag: Liegestütze
        (je 2-3 Arbeitssätze){"\n"}Sonntag: Pause{"\n"}
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

export default TrainingsplaeneScreen;
/*
 */
