import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import colors from "../colors";
import Storage from "expo-sqlite/kv-store";
const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function sortWeekDays(days) {
  return days
    .slice() // clone, damit das Original unverändert bleibt
    .sort((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b));
}

//component used for "picking days" - one box for each day of the week, clicked boxes will turn green and will be considered as "selected"
const DayPickerVariant = ({
  daysRequired,
  selectedDays,
  onChangeSelectedDays,
  workoutPickerValue,
}) => {
  //const [selectedDays, setSelectedDays] = useState([]);
  const [localSel, setLocalSel] = useState(selectedDays);
  //console.log("selectedDays: " + selectedDays);

  function toggleDay(day) {
    const next = localSel.includes(day)
      ? localSel.filter((d) => d !== day)
      : [...localSel, day];

    setLocalSel(next);
    onChangeSelectedDays(next);
  }

  useEffect(() => {
    setLocalSel(selectedDays);
  }, [selectedDays]);

  useEffect(() => {
    Storage.setItemAsync("Trainingstage", JSON.stringify(selectedDays)).catch(
      (err) => console.warn("Fehler beim Speichern Trainingstage:", err)
    );
    //Trainingstage korrekte Anzahl? Dann speichern des Ablaufs
    if (selectedDays.length == daysRequired) {
      const sortedDays = sortWeekDays(selectedDays);
      //console.log("arr: " + sortedDays);
      const exercises = [
        ["pushups", "leg_raises"],
        ["pullups", "squats"],
        ["handstand_pushups", "bridges"],
      ];
      const exercisesProfi = [
        ["pullups"],
        ["bridges"],
        ["handstand_pushups"],
        ["leg_raises"],
        ["squats"],
        ["pushups"],
      ];
      if (
        workoutPickerValue === "Anfänger" ||
        workoutPickerValue === "Fortgeschritten"
      ) {
        const schedule = sortedDays.reduce((acc, day, idx) => {
          acc[day] = exercises[idx] || [];
          return acc;
        }, {});
        //console.log(JSON.stringify(schedule));
        Storage.setItemAsync("schedule", JSON.stringify(schedule)).catch(
          (err) => console.warn("Fehler beim Speichern von schedule:", err)
        );
      } else {
        const schedule = sortedDays.reduce((acc, day, idx) => {
          acc[day] = exercisesProfi[idx] || [];
          return acc;
        }, {});
        //console.log(JSON.stringify(schedule));
        Storage.setItemAsync("schedule", JSON.stringify(schedule)).catch(
          (err) => console.warn("Fehler beim Speichern von schedule:", err)
        );
      }
    }
  }, [selectedDays, workoutPickerValue]);

  return (
    <View>
      <View style={styles.row}>
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.btn, localSel.includes(day) && styles.btnSel]}
            onPress={() => toggleDay(day)}
          >
            <Text style={[styles.txt, localSel.includes(day) && styles.txtSel]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {localSel.length !== daysRequired && (
        <Text style={styles.error}>
          Bitte wähle für diesen Trainingsplan genau {daysRequired} Tage aus
        </Text>
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
  row: { flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 },
  btn: { padding: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 8 },
  btnSel: { backgroundColor: colors.primary },
  txt: { fontSize: 14 },
  txtSel: { color: "#fff" },
  error: { color: "red", paddingLeft: 20, marginTop: 5 },
});

export default DayPickerVariant;
