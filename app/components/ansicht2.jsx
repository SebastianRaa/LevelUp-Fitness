import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { BarChart } from "react-native-gifted-charts";
import ProgressBar from "./ProgressBar";
import * as SQLite from "expo-sqlite";
import Storage from "expo-sqlite/kv-store";

const Ansicht2 = ({ route }) => {
  //get values from key value storage
  const pushups = JSON.parse(Storage.getItemSync("pushups"));
  const squats = JSON.parse(Storage.getItemSync("squats"));
  const pullups = JSON.parse(Storage.getItemSync("pullups"));
  const leg_raises = JSON.parse(Storage.getItemSync("leg_raises"));
  const bridges = JSON.parse(Storage.getItemSync("bridges"));
  const handstand_pushups = JSON.parse(
    Storage.getItemSync("handstand_pushups")
  );

  return (
    <View style={styles.chartBackground}>
      <Text style={styles.headline}>Aktueller Trainingsstand nach Level</Text>
      <ProgressBar label="Liegestütze" fillWidth={pushups} />
      <ProgressBar label="Kniebeugen" fillWidth={squats} />
      <ProgressBar label="Klimmzüge" fillWidth={pullups} />
      <ProgressBar label="Beinheber" fillWidth={leg_raises} />
      <ProgressBar label="Brücken" fillWidth={bridges} />
      <ProgressBar
        label="Handstand Liegestütze"
        fillWidth={handstand_pushups}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  chartBackground: {
    //backgroundColor: "lightblue"
  },
  headline: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
});
export default Ansicht2;

/**
 *<Text>
        <BarChart
          barWidth={22}
          barBorderRadius={4}
          frontColor="blue"
          data={barData}
          //yAxisThickness={0}
          //xAxisThickness={0}
          shiftY={0}
          shiftX={0}
          //backgroundColor={"lightblue"}
          //width={300}
          //height={350}
          maxValue={10}
          //labelsDistanceFromXaxis={0}
          //labelWidth={60}
          rotateYAxisTexts={90}
        />
      </Text>
 *
 *<View>
        <Text style={styles.label}>Label</Text>
        <View style={styles.bar}>
          <View style={styles.barFill}></View>
          <View style={[styles.stripesContainer]}>
            {stripes.map((leftPos, index) => (
              <View
                key={index}
                style={[styles.stripe, { left: leftPos - 0.5 }]}
              />
            ))}
          </View>
        </View>
      </View>
 */

/*async function getData() {
    const db = await SQLite.openDatabaseAsync("training.db");
    const result =
      await db.runAsync(`CREATE TABLE IF NOT EXISTS levels (id INTEGER PRIMARY KEY AUTOINCREMENT,
      pushups REAL,
      squats REAL,
      pullups REAL,
      leg_raises REAL,
      bridges REAL,
      handstand_pushups REAL);`);

    const firstRow = await db.getFirstAsync(`SELECT * FROM levels`);
  }*/
