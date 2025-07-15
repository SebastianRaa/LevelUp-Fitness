import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import Abzeichen from "../components/abzeichen";

const GAP = 15;
const COLUMNS = 3;
const TOTAL_CHILDREN = 12;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Gesamt-Lücken in der Breite: links + rechts + zwischen den Spalten
const totalGapWidth = GAP * (COLUMNS + 1);

// Breite einer Zelle
const cellWidth = (SCREEN_WIDTH - totalGapWidth) / COLUMNS;

// Quadratische Zellen
const cellHeight = cellWidth;

//Screen für die Abzeichen
const AbzeichenScreen = () => {
  return (
    <View style={styles.background}>
      <Text style={styles.headline}>Abzeichen</Text>
      <View style={styles.container}>
        {Array.from({ length: TOTAL_CHILDREN }).map((_, idx) => {
          // Jedes 3. Element (idx 2, 5, 8, 11) darf kein rechtes Margin haben
          const isLastInRow = (idx + 1) % COLUMNS === 0;
          return (
            <View
              key={idx}
              style={[
                styles.cell,
                {
                  width: cellWidth,
                  height: cellHeight,
                  marginRight: isLastInRow ? 0 : GAP,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

/*<View style={styles.container}>
      <Text style={styles.headline}>Abzeichen</Text>
      <View>
        <Abzeichen />
        <Abzeichen />
        <Abzeichen />
        <Abzeichen />
        <Abzeichen />
        <Abzeichen />
        <Abzeichen />
        <Abzeichen />
        <Abzeichen />
        <Abzeichen />
        <Abzeichen />
      </View>
    </View>*/

const styles = StyleSheet.create({
  background: { alignItems: "center", marginTop: 10 },
  headline: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  parent: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    // Außenabstand (Rundum)
    padding: GAP,
    // sorgt dafür, dass bei Zeilenumbrüchen der Abstand erhalten bleibt
    alignContent: "flex-start",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: GAP, // Außenabstand
    alignContent: "flex-start",
    backgroundColor: "#fff",
  },
  cell: {
    marginBottom: GAP, // Abstand nach unten
    backgroundColor: "#aaf",
    borderRadius: 4,
  },
});

export default AbzeichenScreen;
/*
.parent {
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(4, 1fr);
grid-column-gap: 15px;
grid-row-gap: 15px;
}

.div1 { grid-area: 1 / 1 / 5 / 4; }

 */
