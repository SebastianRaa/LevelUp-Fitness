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

const deviceWidth = Dimensions.get("window").width;

const Ansicht3 = ({ route }) => {
  const [grunduebung, setGrunduebung] = useState(1);
  const [level, setLevel] = useState(1);
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
  });

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
        >
          <Picker.Item
            label="Wähle eine Grundübung aus"
            value={0}
            enabled={false}
          />
          <Picker.Item label="Liegestütze" value={1} />
          <Picker.Item label="Kniebeuge" value={2} />
          <Picker.Item label="Klimmzüge" value={3} />
          <Picker.Item label="Beinheber" value={4} />
          <Picker.Item label="Brücken" value={5} />
          <Picker.Item label="Handstand Liegestütze" value={6} />
        </Picker>
      </View>
      <View style={styles.picker}>
        <Picker
          selectedValue={level}
          onValueChange={(newVal, itemIndex) => setLevel(newVal)}
        >
          <Picker.Item label="Wähle ein Level aus" value={0} enabled={false} />
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
          <Picker.Item label="5" value={5} />
          <Picker.Item label="6" value={6} />
          <Picker.Item label="7" value={7} />
          <Picker.Item label="8" value={8} />
          <Picker.Item label="9" value={9} />
          <Picker.Item label="10" value={10} />
        </Picker>
      </View>
      <View style={styles.chartContainer}>
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
        <LineChart
          scrollRef={ref}
          data={lineData}
          //curved
          initialSpacing={0}
          rotateLabel
          width={deviceWidth * 0.75}
          xAxisLabelsVerticalShift={10}
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
/*
 */
