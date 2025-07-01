import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";

const HandstandpushupScreen = ({ route }) => {
  return (
    <ScrollView style={styles.container}>
      <Text>
        <Text style={{ fontSize: 22 }}>Handstand Liegestütze</Text>
        {"\n"}
        {"\n"}
      </Text>
      <Text>
        Level 1: Wall Headstands (Wand-Kopfstand){"\n"}Anleitung:{"\n"}Platziere
        ein Kissen oder eine gefaltete Decke am Boden vor einer stabilen Wand.
        Knie dich hin, setze deine Hände etwa schulterbreit neben den Kopf und
        bringe den Scheitel auf das Polster. Stelle ein Bein nahe an den
        Ellbogen, das andere streckst du aus. Stoße dich dann mit dem gebeugten
        Bein kraftvoll ab, während du das andere nach oben kickst, bis beide
        Beine gegen die Wand gelehnt sind. Strecke die Beine langsam und halte
        die Position. Atme ruhig durch die Nase. Senke die Beine kontrolliert,
        um wieder in den Kniestand zurückzukehren​.{"\n"}
        {"\n"}Trainigsziele:{"\n"}Anfänger: 30 Sekunden halten{"\n"}
        Fortgeschritten: 1 Minute halten{"\n"}Level-Up: 2 Minuten halten{"\n"}
        {"\n"}Level 2: Crow Stands (Krähenstand){"\n"}Anleitung:{"\n"}Hocke dich
        hin, Knie weit auseinander, Hände flach vor dir auf dem Boden. Lehne
        deinen Körper nach vorn, sodass deine Knie gegen die Oberarme drücken.
        Verlagere langsam das Gewicht nach vorn, bis deine Füße den Boden
        verlassen. Halte das Gleichgewicht mit den Händen, während du den Rumpf
        stabilisierst. Atme ruhig und konzentriere dich auf die Balance.{"\n"}
        {"\n"}Trainigsziele:{"\n"}Anfänger: 10 Sekunden halten{"\n"}
        Fortgeschritten: 30 Sekunden halten{"\n"}Level-Up: 1 Minute halten​
        {"\n"}
        {"\n"}Level 3: Wall Handstands (Wand-Handstand){"\n"}Anleitung:{"\n"}
        Stelle dich vor eine Wand. Setze die Hände schulterbreit und etwa 20 cm
        von der Wand entfernt auf den Boden. Kicke dich in den Handstand, bis
        die Fersen die Wand leicht berühren. Der Körper bildet eine leichte
        Rückwärtskrümmung. Halte die Arme gestreckt, atme ruhig und kontrolliere
        die Position.{"\n"}
        {"\n"}Trainigsziele:{"\n"}Anfänger: 30 Sekunden halten{"\n"}
        Fortgeschritten: 1 Minute halten{"\n"}Level-Up: 2 Minuten halten{"\n"}
        {"\n"}Level 4: Half Handstand Pushups (Halbe Handstandliegestütze){"\n"}
        Anleitung:{"\n"}Gehe in den Wandhandstand mit Händen etwa 20 cm von der
        Wand entfernt. Beuge langsam Ellbogen und Schultern, bis der Kopf etwa
        auf halber Strecke zum Boden ist. Halte die Position kurz, dann drücke
        dich wieder nach oben. Behalte durchgehende Körperspannung und atme
        ruhig.{"\n"}
        {"\n"}Trainigsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 10 Wdh.{"\n"}Level-Up: 2 Sätze à 20 Wdh.​
        {"\n"}
        {"\n"}Level 5: Handstand Pushups (Volle Handstandliegestütze){"\n"}
        Anleitung:{"\n"}Führe einen Wandhandstand aus, Hände etwa schulterbreit
        und 20 cm von der Wand entfernt. Senke dich langsam ab, bis der Kopf
        sanft den Boden berührt. Fersen bleiben an der Wand. Halte kurz und
        drücke dich dann kraftvoll wieder nach oben. Kontrolliere die Bewegung
        zu jeder Zeit.{"\n"}
        {"\n"}Trainigsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 10 Wdh.{"\n"}Level-Up: 2 Sätze à 15 Wdh.​
        {"\n"}
        {"\n"}Level 6: Close Handstand Pushups (Enge Handstandliegestütze){"\n"}
        Anleitung:{"\n"}Gehe in den Wandhandstand, aber setze die Hände so nah
        wie möglich zusammen, sodass sich die Zeigefinger berühren. Senke dich
        wie in Level 5, aber mit größerer Belastung auf Ellbogen und Trizeps.
        Drücke dich unter voller Körperspannung wieder hoch.{"\n"}
        {"\n"}Trainigsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 9 Wdh.{"\n"}Level-Up: 2 Sätze à 12 Wdh.​
        {"\n"}
        {"\n"}Level 7: Uneven Handstand Pushups (Ungleiche Handstandliegestütze)
        {"\n"}Anleitung:{"\n"}Gehe in den Wandhandstand und platziere eine Hand
        leicht seitlich auf einem Basketball, die andere bleibt auf dem Boden.
        Verteile dein Gewicht dabei gleichmäßig auf beide Hände. Senke dich
        langsam, bis der Kopf wieder sanft den Boden berührt. Halte kurz und
        drücke dich kontrolliert wieder nach oben.{"\n"}
        {"\n"}Trainigsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh. pro Seite{"\n"}
        Fortgeschritten: 2 Sätze à 8 Wdh. pro Seite{"\n"}Level-Up: 2 Sätze à 10
        Wdh. pro Seite​{"\n"}
        {"\n"}Level 8: Half One-Arm Handstand Pushups (Halbe einarmige
        Handstandliegestütze){"\n"}Anleitung:{"\n"}Gehe in den Wandhandstand.
        Verlagere nach und nach dein ganzes Körpergewichts auf eine Hand. Die
        andere Hand wird zur Balance zur Seite gestreckt. Senke dich langsam ab,
        bis der Kopf etwa auf halber Strecke ist, halte kurz und drücke dich
        wieder hoch. Wechsle die Seite.{"\n"}
        {"\n"}Trainigsziele:{"\n"}Anfänger: 1 Satz à 4 Wdh. pro Seite{"\n"}
        Fortgeschritten: 2 Sätze à 6 Wdh. pro Seite{"\n"}Level-Up: 2 Sätze à 8
        Wdh. pro Seite​{"\n"}
        {"\n"}Level 9: Lever Handstand Pushups (Hebel-Handstandliegestütze)
        {"\n"}Anleitung:{"\n"}Im Wandhandstand platzierst du eine Hand normal
        auf dem Boden, die andere mit Handrücken zum Boden. Diese zweite Hand
        hilft nur minimal. Senke dich ab, bis der Kopf leicht den Boden berührt,
        dann drücke dich wieder hoch. Dabei gleitet die Hilfshand über den Boden
        von dir weg und wieder zu dir hin. Halte Körperspannung und nutze die
        Hilfshand nur sparsam.{"\n"}
        {"\n"}Trainigsziele:{"\n"}Anfänger: 1 Satz à 3 Wdh. pro Seite{"\n"}
        Fortgeschritten: 2 Sätze à 4 Wdh. pro Seite{"\n"}Level-Up: 2 Sätze à 6
        Wdh. pro Seite​{"\n"}
        {"\n"}Level 10: One-Arm Handstand Pushups (Einarmige
        Handstandliegestütze){"\n"}Anleitung:{"\n"}Gehe in den Wandhandstand,
        verlagere dein gesamtes Gewicht auf eine Hand. Die Hilfshand ist wie bei
        Level 8 nach außen zur Balance weggestreckt. Beuge kontrolliert Ellbogen
        und Schulter, bis der Kopf den Boden leicht berührt. Drücke dich mit
        Kraft wieder hoch. Nutze bei Bedarf etwas Schwung aus den Beinen um vom
        Boden nach oben zukommen.{"\n"}
        {"\n"}Trainigsziele:{"\n"}Anfänger: 1 Satz à 1 Wdh. pro Seite{"\n"}
        Fortgeschritten: 2 Sätze à 2 Wdh. pro Seite{"\n"}Level-Up: 1 Satz à 5
        Wdh. pro Seite​
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default HandstandpushupScreen;
/*
 */
