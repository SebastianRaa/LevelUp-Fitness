import React from "react";
import { ScrollView, Text, StyleSheet, Image, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const HandstandpushupScreen = ({ route }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Hauptüberschrift */}
      <Text>
        <Text style={styles.headline}>Handstand Liegestütze</Text>
        {"\n"}
        {"\n"}
      </Text>

      {/* Level 1 */}
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>Level 1: Wand-Kopfstand</Text>
        {"\n"}Anleitung:
        {"\n"}Platziere ein Kissen oder eine gefaltete Decke am Boden vor einer
        stabilen Wand. Knie dich hin, setze deine Hände etwa schulterbreit neben
        den Kopf und bringe den Scheitel auf das Polster. Stelle ein Bein nahe
        an den Ellbogen, das andere streckst du aus. Stoße dich dann mit dem
        gebeugten Bein kraftvoll ab, während du das andere nach oben kickst, bis
        beide Beine gegen die Wand gelehnt sind. Strecke die Beine langsam und
        halte die Position. Atme ruhig durch die Nase. Senke die Beine
        kontrolliert, um wieder in den Kniestand zurückzukehren.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 30 Sekunden halten
        {"\n"}Fortgeschritten: 1 Minute halten
        {"\n"}Level-Up: 2 Minuten halten
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/handstand_pushups_11-min.jpg")}
        resizeMode="contain"
        style={styles.imageHorizontal}
      />
      <Image
        source={require("../../../assets/images/exercises/handstand_pushups_12-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
      />

      {/* Level 2 */}
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>Level 2: Krähenstand</Text>
        {"\n"}Anleitung:
        {"\n"}Hocke dich hin, Knie weit auseinander, Hände flach vor dir auf dem
        Boden. Lehne deinen Körper nach vorn, sodass deine Knie gegen die
        Oberarme drücken. Verlagere langsam das Gewicht nach vorn, bis deine
        Füße den Boden verlassen. Halte das Gleichgewicht mit den Händen,
        während du den Rumpf stabilisierst. Atme ruhig und konzentriere dich auf
        die Balance.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 10 Sekunden halten
        {"\n"}Fortgeschritten: 30 Sekunden halten
        {"\n"}Level-Up: 1 Minute halten
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/handstand_pushups_21-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Image
        source={require("../../../assets/images/exercises/handstand_pushups_22-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />

      {/* Level 3 */}
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>Level 3: Wand-Handstand</Text>
        {"\n"}Anleitung:
        {"\n"}Stelle dich vor eine Wand. Setze die Hände schulterbreit und etwa
        20 cm von der Wand entfernt auf den Boden. Kicke dich in den Handstand,
        bis die Fersen die Wand leicht berühren. Der Körper bildet eine leichte
        Rückwärtskrümmung. Halte die Arme gestreckt, atme ruhig und kontrolliere
        die Position.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 30 Sekunden halten
        {"\n"}Fortgeschritten: 1 Minute halten
        {"\n"}Level-Up: 2 Minuten halten
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/handstand_pushups_31-min.jpg")}
        resizeMode="contain"
        style={styles.imageHorizontal}
      />

      {/* Level 4 */}
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>
          Level 4: Halbe Handstandliegestütze
        </Text>
        {"\n"}Anleitung:
        {"\n"}Gehe in den Wandhandstand mit Händen etwa 20 cm von der Wand
        entfernt. Beuge langsam Ellbogen und Schultern, bis der Kopf etwa auf
        halber Strecke zum Boden ist. Halte die Position kurz, dann drücke dich
        wieder nach oben. Behalte durchgehende Körperspannung und atme ruhig.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh.
        {"\n"}Level-Up: 2 Sätze à 20 Wdh.
        {"\n"}
      </Text>

      {/* Level 5 */}
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>
          Level 5: Volle Handstandliegestütze
        </Text>
        {"\n"}Anleitung:
        {"\n"}Führe einen Wandhandstand aus, Hände etwa schulterbreit und 20 cm
        von der Wand entfernt. Senke dich langsam ab, bis der Kopf sanft den
        Boden berührt. Fersen bleiben an der Wand. Halte kurz und drücke dich
        dann kraftvoll wieder nach oben. Kontrolliere die Bewegung zu jeder
        Zeit.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh.
        {"\n"}Level-Up: 2 Sätze à 15 Wdh.
        {"\n"}
      </Text>

      {/* Level 6 */}
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>
          Level 6: Enge Handstandliegestütze
        </Text>
        {"\n"}Anleitung:
        {"\n"}Gehe in den Wandhandstand, aber setze die Hände so nah wie möglich
        zusammen, sodass sich die Zeigefinger berühren. Senke dich wie in Level
        5, aber mit größerer Belastung auf Ellbogen und Trizeps. Drücke dich
        unter voller Körperspannung wieder hoch.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 9 Wdh.
        {"\n"}Level-Up: 2 Sätze à 12 Wdh.
        {"\n"}
      </Text>

      {/* Level 7 */}
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>
          Level 7: Ungleiche Handstandliegestütze
        </Text>
        {"\n"}Anleitung:
        {"\n"}Gehe in den Wandhandstand und platziere eine Hand leicht seitlich
        auf einem Basketball, die andere bleibt auf dem Boden. Verteile dein
        Gewicht dabei gleichmäßig auf beide Hände. Senke dich langsam, bis der
        Kopf den Boden berührt. Halte kurz und drücke dich kontrolliert wieder
        nach oben.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh. pro Seite
        {"\n"}Fortgeschritten: 2 Sätze à 8 Wdh. pro Seite
        {"\n"}Level-Up: 2 Sätze à 10 Wdh. pro Seite
        {"\n"}
      </Text>

      {/* Level 8 */}
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>
          Level 8: Halbe einarmige Handstandliegestütze
        </Text>
        {"\n"}Anleitung:
        {"\n"}Gehe in den Wandhandstand. Verlagere nach und nach dein ganzes
        Körpergewicht auf eine Hand. Die andere Hand wird zur Balance zur Seite
        gestreckt. Senke dich langsam ab, bis der Kopf etwa auf halber Strecke
        ist, halte kurz und drücke dich wieder hoch. Wechsle die Seite.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 4 Wdh. pro Seite
        {"\n"}Fortgeschritten: 2 Sätze à 6 Wdh. pro Seite
        {"\n"}Level-Up: 2 Sätze à 8 Wdh. pro Seite
        {"\n"}
      </Text>

      {/* Level 9 */}
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>
          Level 9: Hebel-Handstandliegestütze
        </Text>
        {"\n"}Anleitung:
        {"\n"}Im Wandhandstand platzierst du eine Hand normal auf dem Boden, die
        andere mit Handrücken zum Boden. Diese zweite Hand hilft nur minimal.
        Senke dich ab, bis der Kopf leicht den Boden berührt, dann drücke dich
        wieder hoch. Dabei gleitet die Hilfshand über den Boden von dir weg und
        wieder zu dir hin. Halte Körperspannung und nutze die Hilfshand nur
        sparsam.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 3 Wdh. pro Seite
        {"\n"}Fortgeschritten: 2 Sätze à 4 Wdh. pro Seite
        {"\n"}Level-Up: 2 Sätze à 6 Wdh. pro Seite
        {"\n"}
      </Text>

      {/* Level 10 */}
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>
          Level 10: Einarmige Handstandliegestütze
        </Text>
        {"\n"}Anleitung:
        {"\n"}Gehe in den Wandhandstand, verlagere dein gesamtes Gewicht auf
        eine Hand. Die Hilfshand ist wie bei Level 8 nach außen gestreckt. Beuge
        kontrolliert Ellbogen und Schulter, bis der Kopf den Boden leicht
        berührt. Drücke dich mit Kraft wieder hoch. Nutze bei Bedarf etwas
        Schwung aus den Beinen, um vom Boden wieder nach oben zu kommen.
        {"\n"}
        {"\n"}Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 1 Wdh. pro Seite
        {"\n"}Fortgeschritten: 2 Sätze à 2 Wdh. pro Seite
        {"\n"}Level-Up: 1 Satz à 5 Wdh. pro Seite
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
  text: {
    marginTop: 20,
  },
  subHeadline: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 20,
  },
  imageUpright: {
    //height: deviceHeight * 0.4,
    height: deviceHeight * 0.3,
    aspectRatio: 9 / 16,
    marginTop: 10,
  },
  imageHorizontal: {
    //height: deviceHeight * 0.4,
    height: deviceHeight * 0.15,
    aspectRatio: 16 / 9,
    marginTop: 10,
  },
  imageQuadratic: {
    height: deviceHeight * 0.2,
    aspectRatio: 1,
    marginTop: 10,
  },
  rowUpright: {
    flexDirection: "row",
    width: deviceWidth,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default HandstandpushupScreen;
