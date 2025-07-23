import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

const PullupScreen = ({ route }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Hauptüberschrift */}
      <Text>
        <Text style={styles.headline}>Klimmzüge</Text>
        {"\n"}
        {"\n"}
      </Text>

      {/* Level 1 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 1: Vertical Pulls (Vertikale Züge)
        </Text>
        {"\n"}
        Anleitung:
        {"\n"}
        Suche dir eine stabile vertikale Fläche, z. B. einen Türrahmen oder ein
        Geländer. Stelle dich nah davor, greife es etwa schulterbreit und lehne
        dich nach hinten. Strecke die Arme fast vollständig, bis du eine Dehnung
        im Rücken spürst. Ziehe dich nun durch Anspannen der Schulterblätter und
        Beugen der Arme zurück. Halte den Körper angespannt und die Bewegung
        langsam und kontrolliert.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 10 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 20 Wdh.
        {"\n"}Level-Up: 3 Sätze à 40 Wdh.
        {"\n"}
      </Text>

      {/* Level 2 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 2: Horizontal Pulls (Waagrechte Züge / Tischziehen)
        </Text>
        {"\n"}
        Anleitung:
        {"\n"}
        Lege dich unter einen stabilen Tisch, greife die Kante schulterbreit im
        Obergriff. Spanne den Körper an, hebe ihn hoch, bis Brust und Tischkante
        sich berühren. Halte die Körperspannung während der gesamten Bewegung.
        Senke dich wieder kontrolliert ab. Diese Übung stärkt Rücken, Arme und
        Griffkraft.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 10 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 20 Wdh.
        {"\n"}Level-Up: 3 Sätze à 30 Wdh.
        {"\n"}
      </Text>

      {/* Level 3 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 3: Jackknife Pullups (Klappmesser-Klimmzüge)
        </Text>
        {"\n"}
        Anleitung:
        {"\n"}
        Hänge dich an eine hohe Stange, die vor einem Stuhl oder Tisch steht.
        Lege die Unterschenkel auf die Erhöhung. Ziehe dich nun an der Stange
        hoch und drücke dabei die Beine leicht in die Auflage, um Unterstützung
        zu erhalten. Sobald dein Kinn über die Stange reicht, halte kurz, senke
        dich dann langsam ab.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 10 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 15 Wdh.
        {"\n"}Level-Up: 3 Sätze à 20 Wdh.
        {"\n"}
      </Text>

      {/* Level 4 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 4: Half Pullups (Halbe Klimmzüge)
        </Text>
        {"\n"}
        Anleitung:
        {"\n"}
        Springe an die Klimmzugstange und beginne mit gebeugten Armen (Oberarme
        parallel zum Boden). Ziehe dich bis zum Kinn über die Stange hoch. Senke
        dich wieder in die Ausgangsposition ab, ohne ganz zu strecken.
        Bewegungs­ radius: obere Hälfte der Zugbewegung. Dies trainiert Griff,
        Rücken und Arme intensiv.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 8 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 11 Wdh.
        {"\n"}Level-Up: 2 Sätze à 15 Wdh.
        {"\n"}
      </Text>

      {/* Level 5 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 5: Full Pullups (Klassische Klimmzüge)
        </Text>
        {"\n"}
        Anleitung:
        {"\n"}
        Hänge dich im schulterbreiten Obergriff an eine Klimmzugstange. Körper
        komplett gestreckt, leichte Beugung im Ellbogen. Ziehe dich hoch, bis
        dein Kinn über der Stange ist. Halte kurz, senke dich dann langsam
        wieder ganz ab. Kein Schwung, saubere Form: 2 Sekunden hoch, 1 Sekunde
        halten, 2 Sekunden runter.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 8 Wdh.
        {"\n"}Level-Up: 2 Sätze à 10 Wdh.
        {"\n"}
      </Text>

      {/* Level 6 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 6: Close Pullups (Enge Klimmzüge)
        </Text>
        {"\n"}
        Anleitung:
        {"\n"}
        Greife die Stange mit sehr engem Griff – maximal 10 cm Abstand zwischen
        den Händen. Ziehe dich mit hoher Körperspannung kontrolliert nach oben.
        Diese Variante beansprucht die Bizeps deutlich stärker. Achte darauf,
        die Ellbogen nicht nach außen kippen zu lassen.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 8 Wdh.
        {"\n"}Level-Up: 2 Sätze à 10 Wdh.
        {"\n"}
      </Text>

      {/* Level 7 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 7: Uneven Pullups (Ungleiche Klimmzüge)
        </Text>
        {"\n"}
        Anleitung:
        {"\n"}
        Greife die Stange mit einer Hand, mit der anderen greifst du das
        Handgelenk dieser Hand. Ziehe dich mit dominanter Armkraft hoch, die
        andere Hand hilft passiv mit. Halte kurz oben, senke dich dann langsam
        ab. Wechsle die Seite nach jedem Satz oder jeder Wiederholung.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh. pro Seite
        {"\n"}Fortgeschritten: 2 Sätze à 7 Wdh. pro Seite
        {"\n"}Level-Up: 2 Sätze à 9 Wdh. pro Seite
        {"\n"}
      </Text>

      {/* Level 8 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 8: Half One-Arm Pullups (Halbe Einarm-Klimmzüge)
        </Text>
        {"\n"}
        Anleitung:
        {"\n"}
        Greife die Stange mit nur einer Hand, dein Arm ist bereits 90° gebeugt.
        Oberarm parallel zum Boden. Nimm die andere Hand hinter den Rücken.
        Spanne den ganzen Körper an, ziehe dich kontrolliert hoch, bis das Kinn
        über die Stange kommt. Senke dich dann wieder in die Startposition ab.
        Diese Variante bereitet auf echte Einarm-Klimmzüge vor.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 4 Wdh. pro Seite
        {"\n"}Fortgeschritten: 2 Sätze à 6 Wdh. pro Seite
        {"\n"}Level-Up: 2 Sätze à 8 Wdh. pro Seite
        {"\n"}
      </Text>

      {/* Level 9 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 9: Assisted One-Arm Pullups (Unterstützte Einarm-Klimmzüge)
        </Text>
        {"\n"}
        Anleitung:
        {"\n"}
        Greife die Stange mit einer Hand, in der anderen hältst du ein Handtuch
        ungefähr auf Augenhöhe, das ebenfalls über die Stange hängt. Ziehe dich
        mit beiden Armen hoch, aber entlaste das Handtuch nach und nach, bis du
        nur noch mit einer Seite arbeitest. Oben kurz halten, dann kontrolliert
        absenken.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 3 Wdh. pro Seite
        {"\n"}Fortgeschritten: 2 Sätze à 5 Wdh. pro Seite
        {"\n"}Level-Up: 2 Sätze à 7 Wdh. pro Seite
        {"\n"}
      </Text>

      {/* Level 10 */}
      <Text>
        <Text style={styles.subHeadline}>
          Level 10: One-Arm Pullups (Einarmige Klimmzüge – Master Step)
        </Text>
        {"\n"}
        Anleitung:
        {"\n"}
        Hänge frei an der Stange mit nur einer Hand, der Körper ist komplett
        angespannt. Ziehe dich aus der Kraft des einen Arms kontrolliert nach
        oben, bis das Kinn über der Stange ist. Halte kurz, dann senke dich
        langsam und mit Muskelkontrolle wieder ab. Kein Schwung, keine Hilfen –
        nur pure Kraft.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 1 Wdh. pro Seite
        {"\n"}Fortgeschritten: 2 Sätze à 3 Wdh. pro Seite
        {"\n"}Level-Up: 2 Sätze à 6 Wdh. pro Seite
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

export default PullupScreen;
