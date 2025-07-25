import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import colors from "../colors";

//Dropdown menu customized for picking "Trainingsplan"
export default function WorkoutPicker({
  myPickerValue,
  onValueChange,
  daysRequired,
}) {
  const [selectedValue, setSelectedValue] = useState("Anfänger");

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <Picker
          selectedValue={myPickerValue}
          onValueChange={onValueChange}
          mode="dialog"
        >
          <Picker.Item
            label="Wähle dein Workout aus"
            value=""
            enabled={false}
          />
          <Picker.Item label="Anfänger" value="Anfänger" />
          <Picker.Item label="Fortgeschritten" value="Fortgeschritten" />
          <Picker.Item label="Profi" value="Profi" />
        </Picker>
      </View>
    </View>
  );
}

//<Text style={styles.label}>Select your workout program:</Text>
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 13,
    marginBottom: 8,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.third,
  },
});
