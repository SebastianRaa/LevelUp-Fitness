import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import colors from "../colors";
import Storage from "expo-sqlite/kv-store";
const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

//component used for "picking days" - one box for each day of the week, clicked boxes will turn green and will be considered as "selected"
const DayPicker = ({ daysRequired, trainingDays }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  //console.log("selectedDays: " + selectedDays);

  function toggleDay(day) {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  useEffect(() => {
    setSelectedDays(trainingDays);
  }, [trainingDays]);

  useEffect(() => {
    Storage.setItemAsync("Trainingstage", JSON.stringify(selectedDays)).catch(
      (err) => console.warn("Fehler beim Speichern Trainingstage:", err)
    );
  }, [selectedDays]);

  return (
    <View>
      <View style={styles.container}>
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDays.includes(day) && styles.selectedButton,
            ]}
            onPress={() => toggleDay(day)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDays.includes(day) && styles.selectedText,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {daysRequired != selectedDays.length ? (
        <Text style={{ paddingLeft: 20, color: "red" }}>
          Bitte wähle für diesen Trainingsplan exakt {daysRequired} Tage aus
        </Text>
      ) : (
        ""
      )}
    </View>
  );
};

//can easily be changed to row style for welcome screen for example
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 20,
  },
  dayButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  dayText: {
    fontSize: 14,
  },
  selectedText: {
    color: "#fff",
  },
});

export default DayPicker;
