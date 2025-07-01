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
  const [selectedValue, setSelectedValue] = useState("New Blood");

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <Picker selectedValue={myPickerValue} onValueChange={onValueChange}>
          <Picker.Item
            label="Wähle dein Workout aus"
            value=""
            enabled={false}
          />
          <Picker.Item label="New Blood" value="New Blood" />
          <Picker.Item label="Good Behaviour" value="Good Behaviour" />
          <Picker.Item label="Veterano" value="Veterano" />
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
