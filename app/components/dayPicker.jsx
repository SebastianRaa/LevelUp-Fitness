import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

//component used for "picking days" - one box for each day of the week, clicked boxes will turn green and will be considered as "selected"
const DayPicker = ({ daysRequired }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

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
    backgroundColor: "#4caf50",
  },
  dayText: {
    fontSize: 14,
  },
  selectedText: {
    color: "#fff",
  },
});

export default DayPicker;
