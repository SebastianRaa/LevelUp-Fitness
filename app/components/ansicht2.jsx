import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";
import ProgressBar from "./ProgressBar";

const Ansicht2 = ({ route }) => {
  return (
    <View style={styles.chartBackground}>
      <Text style={styles.headline}>Aktueller Trainingsstand nach Level</Text>
      <ProgressBar label="Liegestütze" fillWidth={1.2} />
      <ProgressBar label="Kniebeugen" fillWidth={7.5} />
      <ProgressBar label="Klimmzüge" fillWidth={6.9} />
      <ProgressBar label="Beinheber" fillWidth={4.8} />
      <ProgressBar label="Brücken" fillWidth={8.3} />
      <ProgressBar label="Handstand Liegestütze" fillWidth={3.2} />
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
