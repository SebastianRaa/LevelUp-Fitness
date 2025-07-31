import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const PushupScreen = ({ route }) => {
  return (
    <ScrollView style={styles.container}>
      <Text>
        <Text style={styles.headline}>Liegestütze</Text>
        {"\n"}
        {"\n"}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>Level 1: Wandliegestütze</Text>
        {"\n"}Stell dich etwa eine Armlänge von einer stabilen Wand entfernt
        auf. Platziere deine Hände schulterbreit an der Wand auf Brusthöhe.
        Spanne deinen Körper an, halte ihn gerade wie ein Brett. Beuge langsam
        die Arme und bringe deine Stirn kontrolliert zur Wand. Drücke dich
        kraftvoll zurück in die Ausgangsposition. Atme beim Absenken ein und
        beim Hochdrücken aus. Halte deinen ganzen Körper während der Bewegung
        angespannt.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 10 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 25 Wdh.{"\n"}Level-Up: 3 Sätze à 50 Wdh.
        {"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/pushups_11-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
      />
      <Image
        source={require("../../../assets/images/exercises/pushups_12-min.jpg")}
        resizeMode="contain"
        style={styles.imageUpright}
      />
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>Level 2: Schräge Liegestütze</Text>
        {"\n"}Finde eine stabile Oberfläche auf Hüfthöhe, etwa einen Tisch oder
        eine Bank. Setze deine Hände schulterbreit auf und stelle deine Füße
        weit nach hinten, bis dein Körper eine gerade Linie bildet. Senke deine
        Brust kontrolliert zur Kante ab. Drücke dich kraftvoll wieder hoch, ohne
        ins Hohlkreuz zu fallen. Achte darauf, dass deine Ellbogen beim Beugen
        etwa 45 Grad vom Körper abstehen. Spannung im Rumpf halten.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 10 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 20 Wdh.{"\n"}Level-Up: 3 Sätze à 40 Wdh.
        {"\n"}
        {"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/pushups_21-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Image
        source={require("../../../assets/images/exercises/pushups_22-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>Level 3: Knie-Liegestütze</Text>
        {"\n"}Gehe in eine klassische Liegestützposition, aber stütze deine Knie
        auf dem Boden ab. Deine Hände befinden sich leicht unter Schulterhöhe.
        Halte deinen Körper von den Schultern bis zu den Knien in einer geraden
        Linie. Senke deinen Oberkörper kontrolliert Richtung Boden, ohne ins
        Hohlkreuz zu fallen. Drücke dich aus der Brust- und Armmuskulatur wieder
        hoch. Atme beim Absenken ein und beim Hochdrücken aus.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 10 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 15 Wdh.{"\n"}Level-Up: 3 Sätze à 30 Wdh.
        {"\n"}
        {"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/pushups_31-min.jpg")}
        resizeMode="contain"
        style={styles.imageHorizontal}
      />
      <Image
        source={require("../../../assets/images/exercises/pushups_32-min.jpg")}
        resizeMode="contain"
        style={styles.imageHorizontal}
      />
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>Level 4: Halbe Liegestütze</Text>
        {"\n"}Nimm die klassische Liegestützposition ein: auf Händen und Füßen,
        Körper völlig gerade. Senke dich nur etwa bis zur Hälfte der normalen
        Tiefe ab. Halte kurz die Spannung unten und drücke dich wieder hoch.
        Achte darauf, dass deine Hüfte nicht durchhängt. Ellbogen bleiben leicht
        am Körper geführt. Führe die Bewegung langsam und bewusst aus.
        {"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 8 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 12 Wdh.{"\n"}Level-Up: 2 Sätze à 25 Wdh.
        {"\n"}
        {"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/pushups_41-min.jpg")}
        resizeMode="contain"
        style={styles.imageHorizontal}
      />
      <Image
        source={require("../../../assets/images/exercises/pushups_42-min.jpg")}
        resizeMode="contain"
        style={styles.imageHorizontal}
      />
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>Level 5: Volle Liegestütze</Text>
        {"\n"}Starte in der vollen Liegestützposition, Hände etwa schulterbreit
        auf dem Boden. Dein Körper bildet von Kopf bis Fersen eine Linie. Senke
        dich langsam und kontrolliert ab, bis deine Brust fast den Boden
        berührt. Drücke dich mit voller Kraft wieder nach oben. Halte Spannung
        im gesamten Körper, besonders im Rumpf. Vermeide es, die Ellbogen zu
        weit auszustellen. Atme während der Bewegung ruhig und rhythmisch.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 10 Wdh.{"\n"}Level-Up: 2 Sätze à 20 Wdh.
        {"\n"}
        {"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/pushups_51-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Image
        source={require("../../../assets/images/exercises/pushups_52-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>Level 6: Enge Liegestütze</Text>
        {"\n"}Setze deine Hände so nah zusammen, dass sich Daumen und
        Zeigefinger beinahe berühren. Spanne deinen Körper wieder wie ein Brett
        an. Senke deinen Oberkörper in einer geraden Linie nach unten. Die
        Ellbogen bleiben dicht am Körper geführt. Drücke dich kraftvoll hoch,
        ohne Schwung zu holen. Achte besonders auf Rumpfspannung, um
        durchzuhängen zu vermeiden. Diese Variante fordert Trizeps und Brust
        besonders stark.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh.{"\n"}
        Fortgeschritten: 2 Sätze à 10 Wdh.{"\n"}Level-Up: 2 Sätze à 20 Wdh.
        {"\n"}
        {"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/pushups_61-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Image
        source={require("../../../assets/images/exercises/pushups_62-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>Level 7: Unebene Liegestütze</Text>
        {"\n"}Lege eine Hand auf eine Erhöhung, etwa ein Buch oder einen Ball,
        die andere Hand bleibt am Boden. Dein Körper bleibt während der gesamten
        Bewegung gerade. Senke dich kontrolliert ab und drücke dich wieder nach
        oben. Der Großteil deines Gewichts sollte auf der unteren Hand lasten.
        Wechsel nach der gewünschten Wiederholungszahl die Seiten. Halte Hüfte
        und Schultern parallel zum Boden. Arbeite langsam und präzise, um die
        Belastung zu kontrollieren.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh. pro Seite{"\n"}
        Fortgeschritten: 2 Sätze à 10 Wdh. pro Seite{"\n"}Level-Up: 2 Sätze à 20
        Wdh. pro Seite{"\n"}
        {"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/pushups_71-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Image
        source={require("../../../assets/images/exercises/pushups_72-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>
          Level 8: Halbe einarmige Liegestütze
        </Text>
        {"\n"}
        Stelle dich in eine breite Liegestützposition, wobei ein Arm hinter dem
        Rücken verschränkt wird. Der belastete Arm steht leicht weiter unter der
        Schulter. Senke deinen Körper nur halb ab und halte ihn völlig stabil.
        Achte darauf, dass du nicht zur Seite kippst. Drücke dich aus einer
        kraftvollen, stabilen Position wieder hoch. Halte deinen ganzen Körper
        angespannt, insbesondere die Körpermitte. Arbeite an Gleichgewicht und
        Kontrolle.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh. pro Seite{"\n"}
        Fortgeschritten: 2 Sätze à 10 Wdh. pro Seite{"\n"}Level-Up: 2 Sätze à 20
        Wdh. pro Seite{"\n"}
        {"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/pushups_81-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Image
        source={require("../../../assets/images/exercises/pushups_82-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>Level 9: Hebel Liegestütze</Text>
        {"\n"}Gehe in eine Liegestützposition mit einer Hand unter deinem
        Brustbein und der anderen auf einem Basketball seitlich neben dir. Beide
        Arme sind gestreckt, der Körper bleibt gerade. Senke dich langsam ab,
        bis deine Brust etwa eine Faustbreite über dem Boden schwebt. Der
        Basketball rollt dabei leicht seitlich mit. Zur Kontrolle der Tiefe
        kannst du einen Baseball oder Tennisball nutzen. Halte kurz unten inne.
        Drücke dich dann kontrolliert zurück in die Ausgangsposition.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh. pro Seite{"\n"}
        Fortgeschritten: 2 Sätze à 10 Wdh. pro Seite{"\n"}Level-Up: 2 Sätze à 20
        Wdh. pro Seite{"\n"}
        {"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/pushups_91-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Text style={styles.text}>
        <Text style={styles.subHeadline}>Level 10: Einarmige Liegestütze</Text>
        {"\n"}Stelle deine Füße leicht weiter auseinander für bessere
        Stabilität. Verstecke die freie Hand hinter deinem Rücken. Die
        arbeitende Hand steht direkt unter deiner Schulter. Senke dich langsam
        und kontrolliert mit nur einem Arm ab. Halte deinen Körper komplett
        angespannt und gerade, ohne seitlich wegzukippen. Drücke dich kraftvoll
        aus Brust und Trizeps wieder hoch. Diese Übung erfordert höchste
        Körperspannung und Präzision.{"\n"}
        {"\n"}Trainingsziele:{"\n"}Anfänger: 1 Satz à 5 Wdh. pro Seite{"\n"}
        Fortgeschritten: 2 Sätze à 10 Wdh. pro Seite{"\n"}Level-Up: 1 Sätze à
        100 Wdh. pro Seite{"\n"}
      </Text>
      <Image
        source={require("../../../assets/images/exercises/pushups_101-min.jpg")}
        resizeMode="contain"
        style={styles.imageQuadratic}
      />
      <Image
        source={require("../../../assets/images/exercises/pushups_102-min.jpg")}
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
  subHeadline: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 20,
  },
  text: {
    marginTop: 20,
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

export default PushupScreen;
/*
 */
