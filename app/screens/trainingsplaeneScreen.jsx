import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";

const TrainingsplaeneScreen = ({ route }) => {
  return (
    <ScrollView style={styles.container}>
      <Text>
        <Text style={{ fontSize: 22 }}>Trainingspläne</Text>
        {"\n"}
        {"\n"}
      </Text>
      <Text>
        Der Trainingsaufbau ist immer nur beispielhaft, die konkreten Tage
        können verändert werden.{"\n"}
        {"\n"}Anfänger{"\n"}Anfänger ist ein Trainingsplan für Einsteiger und
        alle, die ganz neu mit Körpergewichtstraining oder sportlicher Aktivität
        beginnen. Es handelt sich um eine einfache Zwei-Tage-pro-Woche-Routine,
        die vier der sechs Grundübungen abdeckt: Pushups, Pullups, Squats und
        Leg Raises. Die Übungen werden jeweils mit 2-3 Arbeitssätzen trainiert.
        Brücken und Handstand-Liegestütze werden in diesem Stadium noch
        ausgelassen, da sie ein höheres Maß an Kraft und Gelenkfestigkeit
        erfordern. Diese Routine ermöglicht dem Körper - insbesondere den
        Sehnen, Gelenken und Bändern - ausreichend Erholung und Anpassung. Das
        Programm ist besonders geeignet für den Einstieg in das System und
        sollte so lange verfolgt werden, bis mindestens Schritt 6 in den vier
        Übungen erreicht ist.{"\n"}
        {"\n"}Trainingsaufbau:{"\n"}Montag: Pushups & Leg Raises (je 2-3
        Arbeitssätze){"\n"}Freitag: Pullups & Squats (je 2-3 Arbeitssätze){"\n"}
        Alle anderen Tage: Pause{"\n"}
        {"\n"}Fortgeschritten{"\n"}Fortgeschritten ist eine ideale
        Drei-Tage-pro-Woche-Routine für Sportler mit etwas Trainingserfahrung.
        In diesem Plan kommen alle sechs Grundübungen zum Einsatz. Trotz höherem
        Umfang als bei Anfänger bleibt genug Erholungszeit, um Fortschritte zu
        erzielen. Der Plan ist für Fortgeschrittene geeignet, wird aber auch von
        fortgeschritteneren Athleten als regelmäßige Rückkehr zur Basis
        empfohlen. Die Routine ist effizient und lässt sich gut in einen vollen
        Terminkalender integrieren. Wer langfristige Kraftzuwächse mit wenig
        Risiko für Überlastung sucht, ist hier genau richtig.{"\n"}
        {"\n"}Trainingsaufbau:{"\n"}Montag: Pushups & Leg Raises (je 2
        Arbeitssätze){"\n"}Mittwoch: Pullups & Squats (je 2 Arbeitssätze){"\n"}
        Freitag: Handstand Pushups & Bridges (je 2 Arbeitssätze){"\n"}Alle
        anderen Tage: Pause{"\n"}
        {"\n"}Profi{"\n"}Profi ist ein Sechs-Tage-pro-Woche-Plan für Sportler
        mit guter Regenerationsfähigkeit und Trainingserfahrung. Jeden Tag wird
        nur eine der sechs Grundübungen trainiert - mit voller Konzentration auf
        Qualität und Leistung. Die Einheiten sind sehr kurz (oft unter 7
        Minuten), aber intensiv. Die Struktur stellt sicher, dass nie direkt
        zwei benachbarte Muskelgruppen an aufeinanderfolgenden Tagen belastet
        werden, was für eine optimale Erholung sorgt. Der siebte Tag (Sonntag)
        ist Ruhetag. Ideal für alle, die mit maximalem Fokus an einer Technik
        arbeiten wollen, ohne den Körper zu überlasten.{"\n"}
        {"\n"}Trainingsaufbau:{"\n"}Montag: Pullups (je 2-3 Arbeitssätze){"\n"}
        Dienstag: Bridges (je 2-3 Arbeitssätze){"\n"}Mittwoch: Handstand Pushups
        (je 2-3 Arbeitssätze){"\n"}Donnerstag: Leg Raises (je 2-3 Arbeitssätze)
        {"\n"}Freitag: Squats (je 2-3 Arbeitssätze){"\n"}Samstag: Pushups (je
        2-3 Arbeitssätze){"\n"}Sonntag: Pause
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default TrainingsplaeneScreen;
/*
 */
