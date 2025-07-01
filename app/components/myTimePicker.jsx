//import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text, SafeAreaView, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import colors from "../colors";

//TimePicker used for the notficiation time
export const MyTimePicker = () => {
  const [date, setDate] = useState(new Date(1741539600000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        {date.toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
      <Button onPress={showTimepicker} title="Edit" color={colors.primary} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.third,
    fontSize: 10,
  },
});
