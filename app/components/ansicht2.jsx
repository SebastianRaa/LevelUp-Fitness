import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BarChart } from "react-native-gifted-charts";
import ProgressBar from "./ProgressBar";
import Storage from "expo-sqlite/kv-store";

const Ansicht2 = ({ route }) => {
  //get values from key value storage
  const [loading, setLoading] = useState(true);
  const [pushups, setPushups] = useState();
  const [squats, setSquats] = useState();
  const [pullups, setPullups] = useState();
  const [leg_raises, setLeg_raises] = useState();
  const [bridges, setBridges] = useState();
  const [handstand_pushups, setHandstand_pushups] = useState();

  useEffect(() => {
    (async () => {
      try {
        //await Storage.setItem("handstand_pushups", "10");
        const storedPushups = JSON.parse(await Storage.getItemAsync("pushups"));
        const storedSquats = JSON.parse(await Storage.getItemAsync("squats"));
        const storedPullups = JSON.parse(await Storage.getItemAsync("pullups"));
        const storedLeg_raises = JSON.parse(
          await Storage.getItemAsync("leg_raises")
        );
        const storedBridges = JSON.parse(await Storage.getItemAsync("bridges"));
        const storedHandstand_pushups = JSON.parse(
          await Storage.getItemAsync("handstand_pushups")
        );

        if (storedPushups) setPushups(storedPushups);
        if (storedSquats) setSquats(storedSquats);
        if (storedPullups) setPullups(storedPullups);
        if (storedLeg_raises) setLeg_raises(storedLeg_raises);
        if (storedBridges) setBridges(storedBridges);
        if (storedHandstand_pushups)
          setHandstand_pushups(storedHandstand_pushups);
      } catch (e) {
        console.warn("Fehler beim Laden: ", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.chartBackground}>
      <Text style={styles.headline}>Aktueller Trainingsstand nach Level</Text>
      <ProgressBar label="Liegestütze" fillWidth={pushups ? pushups : 1} />
      <ProgressBar label="Kniebeugen" fillWidth={squats ? squats : 1} />
      <ProgressBar label="Klimmzüge" fillWidth={pullups ? pullups : 1} />
      <ProgressBar label="Beinheber" fillWidth={leg_raises ? leg_raises : 1} />
      <ProgressBar label="Brücken" fillWidth={bridges ? bridges : 1} />
      <ProgressBar
        label="Handstand Liegestütze"
        fillWidth={handstand_pushups ? handstand_pushups : 1}
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    //const db = await SQLite.openDatabaseAsync("training.db");
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
