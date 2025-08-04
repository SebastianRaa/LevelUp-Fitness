import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRoute, useFocusEffect } from "@react-navigation/native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const SquatScreen = () => {
  const route = useRoute();
  const scrollRef = useRef(null);

  const [positions, setPositions] = useState({});

  useFocusEffect(
    useCallback(() => {
      const anchor = route.params?.anchor;
      const y = positions[anchor];
      if (anchor && typeof y === "number") {
        scrollRef.current?.scrollTo({ y, animated: true });
      }
    }, [route.params, positions])
  );
  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      {/* Hauptüberschrift */}
      <Text>
        <Text style={styles.headline}>Kniebeuge</Text>
        {"\n"}
        {"\n"}
      </Text>

      {/* Level 1 */}
      <Text
        style={styles.text}
        onLayout={(e) => {
          const y = e.nativeEvent?.layout?.y;
          if (typeof y === "number" && positions.level1 == null) {
            setPositions((p) => ({ ...p, level1: y }));
          }
        }}
      >
        <Text style={styles.subHeadline}>
          Level 1: Schulterstand-Kniebeugen
        </Text>
        {"\n"}
        Lege dich auf den Rücken und stütze dich mit den Schultern am Boden ab,
        die Beine zeigen gerade nach oben. Stütze dich mit den Händen am unteren
        Rücken ab. Beuge langsam die Knie und senke deine Füße in Richtung
        Gesicht. Halte die Bewegung kontrolliert und kehre in die
        Ausgangsposition zurück. Halte dabei Bauch- und Beinmuskulatur
        angespannt.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 10 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 25 Wdh.
        {"\n"}Level-Up: 3 Sätze à 50 Wdh.
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/squats_11-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
      />
      <Image
        source={require("../../../assets/images/exercises/squats_12-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />

      {/* Level 2 */}
      <Text
        style={styles.text}
        onLayout={(e) => {
          const y = e.nativeEvent?.layout?.y;
          if (typeof y === "number" && positions.level2 == null) {
            setPositions((p) => ({ ...p, level2: y }));
          }
        }}
      >
        <Text style={styles.subHeadline}>Level 2: Klappmesser-Kniebeugen</Text>
        {"\n"}
        Stelle dich mit leicht gespreizten Beinen hin und halte dich an einer
        stabilen Erhöhung vor dir fest. Die Erhöhung sollte bis zu deinen
        Schienbeinen gehen. Beuge Knie und Hüfte gleichzeitig, bis dein Po nahe
        an den Fersen ist. Der Oberkörper ist dabei nach vorne geneigt. Halte
        die Fersen flach am Boden. Nutze die Arme leicht zur Stabilisierung,
        ohne Schwung zu holen. Anschließend wieder nach oben drücken.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 10 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 20 Wdh.
        {"\n"}Level-Up: 3 Sätze à 40 Wdh.
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/squats_21-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Image
        source={require("../../../assets/images/exercises/squats_22-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      {/* Level 3 */}
      <Text
        style={styles.text}
        onLayout={(e) => {
          const y = e.nativeEvent?.layout?.y;
          if (typeof y === "number" && positions.level3 == null) {
            setPositions((p) => ({ ...p, level3: y }));
          }
        }}
      >
        <Text style={styles.subHeadline}>Level 3: Gestützte Kniebeugen</Text>
        {"\n"}
        Stelle dich aufrecht hin, die Füße schulterbreit, und halte dich an
        einem stabilen Gegenstand vor dir fest (z. B. Tischkante). Beuge Knie
        und Hüfte, bis du so tief wie möglich in die Hocke gehst. Verwende deine
        Arme nur leicht zur Unterstützung beim Hochdrücken. Achte auf einen
        geraden Rücken und feste Fußstellung.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 10 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 15 Wdh.
        {"\n"}Level-Up: 3 Sätze à 30 Wdh.
        {"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/squats_31-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
      />
      <Image
        source={require("../../../assets/images/exercises/squats_32-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      {/* Level 4 */}
      <Text
        style={styles.text}
        onLayout={(e) => {
          const y = e.nativeEvent?.layout?.y;
          if (typeof y === "number" && positions.level4 == null) {
            setPositions((p) => ({ ...p, level4: y }));
          }
        }}
      >
        <Text style={styles.subHeadline}>Level 4: Halbe Kniebeugen</Text>
        {"\n"}
        Stelle dich mit den Füßen leicht nach außen gedreht schulterbreit auf.
        Beuge die Knie etwa bis 90 Grad, der Rücken bleibt gerade. Halte kurz in
        der unteren Position, bevor du dich kraftvoll wieder aufrichtest.
        Vermeide Schwung und halte die Fersen am Boden.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 8 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 35 Wdh.
        {"\n"}Level-Up: 2 Sätze à 50 Wdh.
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/squats_41-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
      />
      <Image
        source={require("../../../assets/images/exercises/squats_42-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      {/* Level 5 */}
      <Text
        style={styles.text}
        onLayout={(e) => {
          const y = e.nativeEvent?.layout?.y;
          if (typeof y === "number" && positions.level5 == null) {
            setPositions((p) => ({ ...p, level5: y }));
          }
        }}
      >
        <Text style={styles.subHeadline}>Level 5: Volle Kniebeugen</Text>
        {"\n"}
        Füße schulterbreit, Arme vor der Brust. Beuge dich kontrolliert tief
        nach unten, bis deine Oberschenkel deine Waden berühren. Halte kurz
        unten, bevor du dich kraftvoll wieder aufrichtest. Achte auf stabile
        Fußstellung und eine gerade Wirbelsäule.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh.
        {"\n"}Level-Up: 2 Sätze à 30 Wdh.
        {"\n"}
      </Text>

      {/* Level 6 */}
      <Text
        style={styles.text}
        onLayout={(e) => {
          const y = e.nativeEvent?.layout?.y;
          if (typeof y === "number" && positions.level6 == null) {
            setPositions((p) => ({ ...p, level6: y }));
          }
        }}
      >
        <Text style={styles.subHeadline}>Level 6: Enge Kniebeugen</Text>
        {"\n"}
        Stelle deine Füße nah zusammen, Zehen zeigen leicht nach außen. Führe
        eine tiefe Kniebeuge mit geradem Rücken aus. Diese Variante erhöht die
        Belastung auf die Oberschenkelmuskulatur deutlich. Halte unten kurz inne
        und drücke dich wieder hoch.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh.
        {"\n"}Level-Up: 2 Sätze à 20 Wdh.
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/squats_61-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
      />
      <Image
        source={require("../../../assets/images/exercises/squats_62-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      {/* Level 7 */}
      <Text
        style={styles.text}
        onLayout={(e) => {
          const y = e.nativeEvent?.layout?.y;
          if (typeof y === "number" && positions.level7 == null) {
            setPositions((p) => ({ ...p, level7: y }));
          }
        }}
      >
        <Text style={styles.subHeadline}>
          Level 7: Ungleichgewicht-Kniebeugen
        </Text>
        {"\n"}
        Stelle einen Fuß nach vorne gestreckt auf eine Erhöhung (z. B.
        Basketball, Stapel Bücher), das andere bleibt senkrecht auf dem Boden.
        Senke dich langsam ab, wobei das belastete Bein die Hauptarbeit
        übernimmt. Halte das Gleichgewicht und drücke dich wieder hoch. Seite
        wechseln.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh. pro Seite
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh. pro Seite
        {"\n"}Level-Up: 2 Sätze à 20 Wdh. pro Seite
        {"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/squats_71-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
      />

      {/* Level 8 */}
      <Text
        style={styles.text}
        onLayout={(e) => {
          const y = e.nativeEvent?.layout?.y;
          if (typeof y === "number" && positions.level8 == null) {
            setPositions((p) => ({ ...p, level8: y }));
          }
        }}
      >
        <Text style={styles.subHeadline}>
          Level 8: Halbe Einbein-Kniebeugen
        </Text>
        {"\n"}
        Stelle dich auf ein Bein, das andere bleibt gestreckt auf Höhe deiner
        Oberschenkel in der Luft vor dir. Beuge das Standbein, bis das Knie ca.
        90 Grad erreicht. Halte kurz unten, dann drücke dich wieder hoch.
        Fordert Gleichgewicht, Hüftstabilität und Körperspannung.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh. pro Seite
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh. pro Seite
        {"\n"}Level-Up: 2 Sätze à 20 Wdh. pro Seite
        {"\n"}
      </Text>

      {/* Level 9 */}
      <Text
        style={styles.text}
        onLayout={(e) => {
          const y = e.nativeEvent?.layout?.y;
          if (typeof y === "number" && positions.level9 == null) {
            setPositions((p) => ({ ...p, level9: y }));
          }
        }}
      >
        <Text style={styles.subHeadline}>
          Level 9: Unterstützte Einbein-Kniebeugen
        </Text>
        {"\n"}
        Stelle dich auf ein Bein und halte die andere Seite gestreckt nach
        vorne. Gehe tief in die Hocke, bis dein Bein vollständig gebeugt ist.
        Lege eine Hand auf einen Ball oder eine Erhöhung seitlich des Körpers,
        um dich leicht zu stützen. Drücke dich mit der Bein- und etwas Armkraft
        wieder hoch.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh. pro Seite
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh. pro Seite
        {"\n"}Level-Up: 2 Sätze à 20 Wdh. pro Seite
        {"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/squats_91-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
      />

      {/* Level 10 */}
      <Text
        style={styles.text}
        onLayout={(e) => {
          const y = e.nativeEvent?.layout?.y;
          if (typeof y === "number" && positions.level10 == null) {
            setPositions((p) => ({ ...p, level10: y }));
          }
        }}
      >
        <Text style={styles.subHeadline}>Level 10: Einbein-Kniebeugen</Text>
        {"\n"}
        Stehe auf einem Bein, das andere Bein gestreckt vor dir in der Luft.
        Senke dich langsam ganz tief ab, bis dein Oberschenkel deine Wade
        berührt. Halte die Spannung und drücke dich kraftvoll mit dem Standbein
        wieder hoch. Vermeide es, zu kippen oder Schwung zu nutzen. Halte die
        Arme zur Balance vor dir.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 1 Wdh. pro Seite
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh. pro Seite
        {"\n"}Level-Up: 2 Sätze à 50 Wdh. pro Seite
        {"\n"}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginBottom: 10 },
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

export default SquatScreen;
