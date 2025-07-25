import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

const BridgeScreen = ({ route }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Hauptüberschrift */}
      <Text>
        <Text style={styles.headline}>Brücken</Text>
        {"\n"}
        {"\n"}
      </Text>

      {/* Level 1 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 1: Short Bridges (Kurze Brücken)
        </Text>
        {"\n"}Anleitung:
        {"\n"}Lege dich auf den Rücken, Füße flach auf dem Boden, ca.
        schulterbreit, Knie gebeugt. Die Fersen sind etwa 15–20 cm vom Gesäß
        entfernt. Hebe langsam Hüften und unteren Rücken an, bis Schultern und
        Füße das Körpergewicht tragen. Der Rumpf bildet eine gerade Linie von
        Knien bis Schultern. Halte kurz die Position, senke dich dann
        kontrolliert wieder ab. Atme beim Heben aus, beim Senken ein.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 10 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 25 Wdh.
        {"\n"}Level-Up: 3 Sätze à 50 Wdh.
        {"\n"}
      </Text>

      {/* Level 2 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 2: Straight Bridges (Gerade Brücken)
        </Text>
        {"\n"}Anleitung:
        {"\n"}Setze dich mit gestreckten Beinen auf den Boden, Hände neben der
        Hüfte mit Fingern zu den Zehen zeigend. Drücke dich hoch, bis der Körper
        von den Fersen bis zur Schulter eine gerade Linie bildet. Halte die
        Spannung, Blick zur Decke. Senke dich dann wieder langsam ab.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 10 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 20 Wdh.
        {"\n"}Level-Up: 3 Sätze à 40 Wdh.
        {"\n"}
      </Text>

      {/* Level 3 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 3: Angled Bridges (Abgewinkelte Brücken)
        </Text>
        {"\n"}Anleitung:
        {"\n"}Lege dich mit dem Rücken auf ein Bett oder eine Bank, Füße am
        Boden, Hände seitlich des Kopfs, Finger zeigen zu den Füßen. Drücke
        Hüfte und Rücken nach oben, bis der Oberkörper frei über der Fläche
        schwebt. Die Ellbogen können gebeugt bleiben. Senke dich dann vorsichtig
        wieder ab.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 8 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 15 Wdh.
        {"\n"}Level-Up: 3 Sätze à 30 Wdh.
        {"\n"}
      </Text>

      {/* Level 4 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 4: Head Bridges (Kopfbrücken)
        </Text>
        {"\n"}Anleitung:
        {"\n"}Lege dich flach mit dem Rücken auf den Boden, Hände neben dem
        Kopf, Finger zeigen zu den Füßen. Hebe Hüfte und Rücken, bis dein Körper
        eine Brücke bildet. Senke dich dann ab, bis der Scheitel sanft den Boden
        berührt. Halte kurz, drücke dich dann zurück in die Brückenposition.
        Atme ruhig und gleichmäßig.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 8 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 15 Wdh.
        {"\n"}Level-Up: 2 Sätze à 25 Wdh.
        {"\n"}
      </Text>

      {/* Level 5 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 5: Half Bridges (Halbe Brücken mit Ball)
        </Text>
        {"\n"}Anleitung:
        {"\n"}Lege dich mit einem Basketball unter dem unteren Rücken auf den
        Boden. Hände neben dem Kopf, Finger zeigen Richtung Füße, Füße flach.
        Hebe Hüfte und Rücken an, bis der Körper über dem Ball eine Bogenform
        bildet. Senke dich langsam wieder ab, ohne das Gewicht auf dem Ball
        abzulegen.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 8 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 15 Wdh.
        {"\n"}Level-Up: 2 Sätze à 20 Wdh.
        {"\n"}
      </Text>

      {/* Level 6 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 6: Full Bridges (Volle Brücken)
        </Text>
        {"\n"}Anleitung:
        {"\n"}Lege dich auf den Rücken, Füße flach, Hände neben dem Kopf. Drücke
        dich mit Armen und Beinen hoch in eine volle Brücke. Die Arme und Beine
        sind gestreckt, der Rücken tief durchgebogen. Halte kurz, senke dich
        langsam ab. Dies ist die Grundlage für alle fortgeschrittenen
        Brückenformen.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 6 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh.
        {"\n"}Level-Up: 2 Sätze à 15 Wdh.
        {"\n"}
      </Text>

      {/* Level 7 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 7: Wall Walking Bridges (Down) (Wandabstieg)
        </Text>
        {"\n"}Anleitung:
        {"\n"}Stelle dich ca. eine Armlänge vor eine Wand. Beuge dich langsam
        nach hinten, bis du mit den Händen die Wand berührst. „Laufe“ mit den
        Händen Stück für Stück nach unten, bis du den Boden erreichst. Lasse
        dich dann in Rückenlage sinken.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 3 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 6 Wdh.
        {"\n"}Level-Up: 2 Sätze à 10 Wdh.
        {"\n"}
      </Text>

      {/* Level 8 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 8: Wall Walking Bridges (Up) (Wandaufstieg)
        </Text>
        {"\n"}Anleitung:
        {"\n"}Gehe wie bei Level 7 rückwärts an der Wand hinunter und dann in
        die Brücke. Dann kehrst du die Bewegung um und „läufst“ mit den Händen
        wieder nach oben, bis du wieder stehst. Beginne mit kleinen Bewegungen
        und steigere langsam die Tiefe.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 2 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 4 Wdh.
        {"\n"}Level-Up: 2 Sätze à 8 Wdh.
        {"\n"}
      </Text>

      {/* Level 9 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 9: Closing Bridges (Rückwärts in die Brücke)
        </Text>
        {"\n"}Anleitung:
        {"\n"}Stehe aufrecht, Hände auf der Hüfte und schiebe dein Becken
        vorwärts. Beuge dich langsam nach hinten, bis du den Boden siehst, dann
        strecke die Arme nach hinten und lande in der Brücke. Halte kurz, senke
        den Rücken dann ab und wiederhole. Erfordert Beweglichkeit, Kontrolle
        und Mut.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 1 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 3 Wdh.
        {"\n"}Level-Up: 2 Sätze à 6 Wdh.
        {"\n"}
      </Text>

      {/* Level 10 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 10: Stand-to-Stand Bridges (Stand-zu-Stand-Brücken)
        </Text>
        {"\n"}Anleitung:
        {"\n"}Beuge dich aus dem Stand in die Brücke (wie Level 9) – und drücke
        dich dann direkt wieder in den Stand zurück. Diese Bewegung kombiniert
        Kraft, Beweglichkeit und Balance in höchster Form. Keine Schwungbewegung
        – alles erfolgt kontrolliert.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 1 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 3 Wdh.
        {"\n"}Level-Up: 2 Sätze à 10–30 Wdh.
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

export default BridgeScreen;
