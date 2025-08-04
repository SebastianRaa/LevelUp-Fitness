import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { LineChart } from "react-native-gifted-charts";
import { Picker } from "@react-native-picker/picker";
import colors from "../colors";
import * as SQLite from "expo-sqlite";
import db from "../db";
import levelUpRequirements from "../data/exercises/levelUpRequirements";
const deviceWidth = Dimensions.get("window").width;

const Ansicht3 = ({ route }) => {
  const [grunduebung, setGrunduebung] = useState("pushups");
  const [level, setLevel] = useState(1);
  const [data, setData] = useState([]);
  const [stepValue, setStepValue] = useState(10);
  const ref = useRef(null);

  const lineData = [
    { value: 4, label: "1 Jan" },
    { value: 14, label: "10 Jan" },
    { value: 8, label: "20 Jan" },
    { value: 38, label: "30 Jan" },
    { value: 36, label: "1 Feb" },
    { value: 28, label: "10 Feb" },
    { value: 14, label: "20 Feb" },
    { value: 28, label: "28 Feb" },
    { value: 4, label: "1 Mar" },
    { value: 14, label: "10 Mar" },
    { value: 8, label: "20 Mar" },
    { value: 14, label: "30 Mar" },
    { value: 8, label: "1 Apr" },
    { value: 38, label: "10 Apr" },
    { value: 14, label: "20 Apr" },
    { value: 28, label: "30 Apr" },
    { value: 4, label: "1 May" },
    { value: 10, label: "10 May" },
    { value: 8, label: "20 May" },
    { value: 14, label: "30 May" },
    { value: 8, label: "1 Jun" },
    { value: 38, label: "10 Jun" },
    { value: 14, label: "20 Jun" },
    { value: 28, label: "30 Jun" },
    { value: 4, label: "1 Jul" },
    { value: 28, label: "10 Jul" },
    { value: 4, label: "20 Jul" },
    { value: 14, label: "30 Jul" },
  ];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  const showOrHidePointer = (ind) => {
    ref.current?.scrollTo({
      x: ind * 200 - 25,
    }); // adjust as per your UI
  };

  useEffect(() => {
    showOrHidePointer(500); //very high number in order to scroll at the end of the graph
    async function getData() {
      //const db = await SQLite.openDatabaseAsync("training.db");
      const query = `SELECT * FROM trainings WHERE baseExercise=? AND level=?`;
      const values = [grunduebung, level];
      //console.log(query);
      //console.log(values);
      const result = await db.getAllAsync(query, values);
      console.log(result);
      //console.log("result length: " + result.length);
      const newData = [];
      let highestValue = 0;
      for (let i = 0; i < result.length; i++) {
        let totalWork = 0;
        let counter = 0;
        for (let j = 0; j < 6; j++) {
          //console.log(totalWork);
          counter = j + 1;
          if (result[i][`work${counter}_rep`]) {
            totalWork = totalWork + Number(result[i][`work${counter}_rep`]);
          } else {
            break;
          }
        }
        newData.push({
          value: totalWork,
          label: result[i].datestring.slice(0, 5),
          dataPointText: totalWork,
        });
        if (totalWork > highestValue) highestValue = totalWork;
      }
      setData(newData);
      if (highestValue < 25) setStepValue(5);
      else if (highestValue < 50) setStepValue(10);
      else if (highestValue < 75) setStepValue(15);
      else if (highestValue < 100) setStepValue(20);
      else if (highestValue < 125) setStepValue(25);
      else if (highestValue < 150) setStepValue(30);
      else if (highestValue < 175) setStepValue(35);
      else if (highestValue < 200) setStepValue(40);
      else if (highestValue < 225) setStepValue(45);
      else if (highestValue < 250) setStepValue(50);
      else setStepValue(100);
    }
    getData();
  }, [grunduebung, level]);

  function yAxisLabelTextsGenerator(value) {
    const newVal = value * stepValue;
    return newVal.toString();
  }

  return (
    <View style={styles.chartBackground}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={styles.headline}>Level im Detail</Text>
      </View>

      <View style={styles.picker}>
        <Picker
          selectedValue={grunduebung}
          onValueChange={(newVal, itemIndex) => setGrunduebung(newVal)}
          mode="dialog"
        >
          <Picker.Item
            label="Wähle eine Grundübung aus"
            value={0}
            enabled={false}
          />
          <Picker.Item label="Liegestütze" value={"pushups"} />
          <Picker.Item label="Kniebeuge" value={"squats"} />
          <Picker.Item label="Klimmzüge" value={"pullups"} />
          <Picker.Item label="Beinheber" value={"leg_raises"} />
          <Picker.Item label="Brücken" value={"bridges"} />
          <Picker.Item
            label="Handstand Liegestütze"
            value={"handstand_pushups"}
          />
        </Picker>
      </View>
      <View style={styles.picker}>
        <Picker
          selectedValue={level}
          onValueChange={(newVal, itemIndex) => setLevel(newVal)}
          mode="dialog"
        >
          <Picker.Item label="Wähle ein Level aus" value={0} enabled={false} />
          {[...Array(10)].map((_, idx) => (
            <Picker.Item
              key={idx + 1}
              label={
                grunduebung
                  ? `L${idx + 1}: ` +
                    levelUpRequirements[grunduebung][`level${idx + 1}`]["name"]
                  : `L${idx + 1}`
              }
              value={idx + 1}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          scrollRef={ref}
          data={data}
          rotateLabel
          width={deviceWidth * 0.75}
          xAxisLabelsVerticalShift={10}
          initialSpacing={20}
          textShiftY={-10}
          overflowTop={10}
          noOfSections={5}
          stepValue={stepValue}
          yAxisLabelTexts={[
            "0",
            yAxisLabelTextsGenerator(1),
            yAxisLabelTextsGenerator(2),
            yAxisLabelTextsGenerator(3),
            yAxisLabelTextsGenerator(4),
            yAxisLabelTextsGenerator(5),
            yAxisLabelTextsGenerator(6),
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartBackground: {
    //backgroundColor: "lightblue",
    justifyContent: "center",
    alignContent: "center",
    //alignItems: "stretch",
  },
  headline: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  chartContainer: {
    marginTop: 50,
    marginRight: deviceWidth * 0.1,
  },
  picker: {
    //backgroundColor: "blue",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.third,
    marginBottom: 20,
  },
});

export default Ansicht3;
/*Monatskästchen zum Scrollen
<View style={{ flexDirection: "row", marginBottom: 20, marginLeft: 8 }}>
          {months.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  padding: 6,
                  margin: 4,
                  backgroundColor: "#ebb",
                  borderRadius: 8,
                }}
                onPress={() => showOrHidePointer(index)}
              >
                <Text>{months[index]}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
 */
