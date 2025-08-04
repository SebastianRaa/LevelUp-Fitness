import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { ScrollView, Text, StyleSheet, Image, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const LegraiseScreen = () => {
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
        <Text style={styles.headline}>Beinheber</Text>
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
        <Text style={styles.subHeadline}>Level 1: Sitzende Knieheber</Text>
        {"\n"}
        Setze dich auf die Kante eines Stuhls oder Bettes, lehne dich leicht
        zurück und halte dich an der Sitzkante fest. Strecke die Beine durch und
        halte die Fersen ein paar Zentimeter über dem Boden. Ziehe die Knie
        langsam zur Brust, atme dabei aus und spanne die Bauchmuskeln an. Halte
        die Endposition kurz und atme vollständig aus. Strecke die Beine wieder
        kontrolliert aus und atme dabei ein, ohne den Boden zu berühren. Behalte
        die Rumpfspannung bei und führe die Bewegung langsam und kontrolliert
        aus. Vermeide hastige Wiederholungen.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 10 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 25 Wdh.
        {"\n"}Level-Up: 3 Sätze à 40 Wdh.
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/leg_raises_11-min.jpg")}
        resizeMode="contain"
        style={styles.imageHorizontal}
      />
      <Image
        source={require("../../../assets/images/exercises/leg_raises_12-min.jpg")}
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
        <Text style={styles.subHeadline}>Level 2: Liegende Knieheber</Text>
        {"\n"}
        Lege dich flach auf den Rücken, Beine zusammen, Arme seitlich am Boden.
        Beuge die Knie auf etwa 90 Grad, die Füße schweben ein bis zwei
        Zentimeter über dem Boden. Drücke die Hände fest in den Boden, um den
        Oberkörper zu stabilisieren. Ziehe die Knie kontrolliert über die
        Hüften, sodass die Oberschenkel senkrecht und die Waden parallel zum
        Boden stehen. Halte den 90-Grad-Winkel in den Knien konstant und spanne
        die Bauchmuskeln an. Atme beim Hochziehen aus. Pausiere kurz oben, dann
        strecke die Beine beim Absenken langsam wieder aus und atme ein. Die
        Füße dürfen den Boden während der gesamten Übung nicht berühren.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 10 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 20 Wdh.
        {"\n"}Level-Up: 3 Sätze à 35 Wdh.
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/leg_raises_21-min.jpg")}
        resizeMode="contain"
        style={styles.imageHorizontal}
      />
      <Image
        source={require("../../../assets/images/exercises/leg_raises_22-min.jpg")}
        resizeMode="contain"
        style={styles.imageHorizontal}
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
        <Text style={styles.subHeadline}>
          Level 3: Liegende Beinheber mit gebeugten Knien
        </Text>
        {"\n"}
        Lege dich auf den Rücken, die Beine ausgestreckt und die Hände seitlich
        auf dem Boden. Beuge die Knie leicht um etwa 45 Grad und halte die Füße
        knapp über dem Boden. Hebe Beine und Füße gleichzeitig an, bis die Füße
        direkt über deinem Becken schweben. Der Kniewinkel bleibt während der
        gesamten Bewegung unverändert. Stabilisiere deinen Oberkörper mit den
        Händen am Boden. Halte oben kurz inne, bevor du kontrolliert in die
        Ausgangsposition zurückkehrst. Atme beim Hochheben aus und beim Absenken
        ein, ohne die Füße abzulegen.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 10 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 15 Wdh.
        {"\n"}Level-Up: 3 Sätze à 30 Wdh.
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/leg_raises_31-min.jpg")}
        resizeMode="contain"
        style={styles.imageHorizontal}
      />
      <Image
        source={require("../../../assets/images/exercises/leg_raises_32-min.jpg")}
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
        <Text style={styles.subHeadline}>
          Level 4: Liegende Froschbeinheber
        </Text>
        {"\n"}
        Hebe deine angewinkelten Beine wie in Level 3 an und strecke sie oben
        vollständig, sodass sie senkrecht zum Boden stehen. Atme während dieser
        Aufwärtsbewegung aus. Senke die gestreckten Beine dann langsam und
        kontrolliert in etwa vier Sekunden ab, bis sie knapp über dem Boden
        schweben. Halte die Beine dabei gerade und stabil. Atme beim Absenken
        ruhig ein. Nutze die längere Absenkphase, um deine Körpermitte
        intensiver zu fordern. Wiederhole die Bewegung kontrolliert ohne
        Schwung.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 8 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 15 Wdh.
        {"\n"}Level-Up: 3 Sätze à 25 Wdh.
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/leg_raises_41-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Image
        source={require("../../../assets/images/exercises/leg_raises_42-min.jpg")}
        resizeMode="contain"
        style={styles.imageHorizontal}
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
        <Text style={styles.subHeadline}>
          Level 5: Liegendes gestrecktes Beinheben
        </Text>
        {"\n"}
        Lege dich auf den Rücken, die Beine ausgestreckt, die Füße zusammen und
        die Arme seitlich am Boden. Hebe deine Füße ein bis zwei Zentimeter vom
        Boden ab und stabilisiere deinen Oberkörper mit den Händen. Hebe die
        gestreckten Beine langsam an, bis sie senkrecht über deinem Becken
        stehen, und atme dabei aus. Halte die Bauchmuskeln angespannt und führe
        die Bewegung in mindestens zwei Sekunden aus. Pausiere kurz oben, dann
        senke die Beine kontrolliert ab, während du einatmest. Achte darauf, die
        Knie gestreckt zu lassen und die Fersen nicht abzulegen. Wiederhole den
        Ablauf fließend und präzise.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh.
        {"\n"}Level-Up: 2 Sätze à 20 Wdh.
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/leg_raises_51-min.jpg")}
        resizeMode="contain"
        style={styles.imageHorizontal}
      />
      <Image
        source={require("../../../assets/images/exercises/leg_raises_52-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />

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
        <Text style={styles.subHeadline}>Level 6: Hängende Knieheber</Text>
        {"\n"}
        Spring hoch und greife eine Klimmzugstange etwa schulterbreit. Hänge
        frei, halte deinen Körper gestreckt und die Schultern aktiv angespannt.
        Ziehe die Knie kontrolliert an, bis sie auf Höhe deines Beckens sind und
        einen rechten Winkel bilden. Deine Oberschenkel sollten parallel zum
        Boden sein. Atme beim Hochziehen aus und halte die Bauchspannung.
        Pausiere kurz in der oberen Position, dann senke die Beine langsam ab
        und atme dabei ein. Wiederhole die Bewegung sauber und ohne Schwung.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh.
        {"\n"}Level-Up: 2 Sätze à 15 Wdh.
        {"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/leg_raises_61-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
      />
      <Image
        source={require("../../../assets/images/exercises/leg_raises_62-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
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
          Level 7: Hängende Beinheber mit gebeugten Knien
        </Text>
        {"\n"}
        Greife eine Klimmzugstange schulterbreit, halte deinen Körper gestreckt
        und die Schultern angespannt. Beuge deine Knie um etwa 45 Grad, sodass
        deine Füße leicht hinter deinem Körper hängen. Hebe nun die Beine aus
        der Hüfte an, bis die Füße auf Höhe deines Beckens sind. Halte dabei den
        Kniewinkel konstant und bewege nur die Hüften. Atme beim Anheben aus und
        spanne die Bauchmuskeln fest an. Pausiere oben kurz, dann senke die
        Beine kontrolliert ab und atme ein. Wiederhole die Bewegung ruhig und
        ohne Schwung.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh.
        {"\n"}Level-Up: 2 Sätze à 15 Wdh.
        {"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/leg_raises_71-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
      />
      <Image
        source={require("../../../assets/images/exercises/leg_raises_72-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
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
          Level 8: Hängende Froschbeinheber
        </Text>
        {"\n"}
        Beginne wie bei Level 7, hängend mit leicht gebeugten Knien. Ziehe deine
        Beine hoch, bis die Füße auf Höhe deines Beckens sind. Strecke dann die
        Beine vollständig nach vorne aus, sodass sie parallel zum Boden stehen.
        Dein Körper bildet nun einen rechten Winkel zwischen Ober- und
        Unterkörper. Pausiere kurz in dieser Position, ohne sofort abzusenken.
        Senke anschließend die gestreckten Beine langsam und kontrolliert ab.
        Kehre in die vollständig hängende Ausgangsposition zurück. Atme beim
        Anheben aus und beim Absenken ein. Halte während der gesamten Bewegung
        deinen Bauch fest angespannt. Wiederhole die Übung ruhig und ohne
        Schwung.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh.
        {"\n"}Level-Up: 2 Sätze à 15 Wdh.
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/leg_raises_81-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Image
        source={require("../../../assets/images/exercises/leg_raises_82-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Image
        source={require("../../../assets/images/exercises/leg_raises_101-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
      />

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
          Level 9: Hängendes teilweise gestrecktes Beinheben
        </Text>
        {"\n"}
        Hänge dich an eine Klimmzugstange, halte den Körper gestreckt und die
        Schultern aktiv angespannt. Hebe deine gestreckten Beine an, bis sie
        einen 45-Grad-Winkel erreichen, und halte kurz. Das ist die
        Startposition. Hebe die Beine dann weiter an, bis sie parallel zum Boden
        sind. Pausiere in dieser Endposition kurz und spanne den Bauch fest an.
        Senke die Beine kontrolliert zurück auf 45 Grad. Atme beim Hochheben aus
        und beim Absenken ein. Achte darauf, die Knie stets gestreckt zu halten.
        Wiederhole die Bewegung ruhig und ohne Schwung.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh.
        {"\n"}Level-Up: 2 Sätze à 15 Wdh.
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/leg_raises_91-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
      />
      <Image
        source={require("../../../assets/images/exercises/leg_raises_92-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
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
        <Text style={styles.subHeadline}>
          Level 10: Hängendes gestrecktes Beinheben
        </Text>
        {"\n"}
        Greife eine hohe Klimmzugstange schulterbreit und hänge dich gestreckt
        daran. Halte deine Schultern angespannt – das ist die Startposition.
        Hebe deine gestreckten Beine langsam innerhalb von mindestens zwei
        Sekunden an, bis sie parallel zum Boden stehen. Atme dabei vollständig
        aus, um deine Bauchmuskeln maximal anzuspannen. Pausiere kurz in der
        Endposition. Senke die Beine ebenso kontrolliert in mindestens zwei
        Sekunden zurück in die Startposition. Atme während des Absenkens ruhig
        ein. Halte deinen Körper und die Beine stets unter Spannung. Benutze
        keine Schwungkraft – nur reine Muskelarbeit ist erlaubt.
        {"\n"}
        {"\n"}
        Trainingsziele:
        {"\n"}Anfänger: 1 Satz à 5 Wdh.
        {"\n"}Fortgeschritten: 2 Sätze à 10 Wdh.
        {"\n"}Level-Up: 2 Sätze à 30 Wdh.
        {"\n"}
      </Text>

      <Image
        source={require("../../../assets/images/exercises/leg_raises_101-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
      />
      <Image
        source={require("../../../assets/images/exercises/leg_raises_102-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
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
    //alignSelf: "center",
  },
  imageHorizontal: {
    //height: deviceHeight * 0.4,
    height: deviceHeight * 0.15,
    aspectRatio: 16 / 9,
    marginTop: 10,
    //alignSelf: "center",
  },
  imageQuadratic: {
    height: deviceHeight * 0.2,
    aspectRatio: 1,
    marginTop: 10,
    //alignSelf: "center",
  },
  rowUpright: {
    flexDirection: "row",
    width: deviceWidth,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default LegraiseScreen;
