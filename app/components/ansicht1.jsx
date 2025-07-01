import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  Calendar,
  CalendarUtils,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";

const deviceWidth = Dimensions.get("window").width;

//config for calendar
LocaleConfig.locales["de"] = {
  monthNames: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ],
  dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  today: "Heute",
};

LocaleConfig.defaultLocale = "de";

// Disclaimer from component docs: Make sure that markedDates param is immutable. If you change markedDates object content but the reference to it does not change calendar update will not be triggered.

const Ansicht1 = ({ route }) => {
  const [selected, setSelected] = useState("");
  return (
    <View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={styles.headline}>Trainingsübersicht</Text>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
            console.log(day);
          }}
          firstDay={1}
          markedDates={{
            "2025-06-03": {
              marked: true,
              dotColor: "lime",
            },
            "2025-06-05": { selected: true, selectedColor: "lightgreen" },
            "2025-06-06": {
              selected: true,
              selectedColor: "mediumslateblue",
            },
            "2025-06-12": { selected: true, selectedColor: "darkgreen" },
            "2025-06-23": { selected: true, selectedColor: "lime" },
            "2025-06-01": { selected: true, selectedColor: "springgreen" },
            "2025-06-19": { selected: true, selectedColor: "red" },
            "2025-06-10": { marked: true, dotColor: "green" },
            "2025-06-17": { marked: true, dotColor: "darkgreen" },
            "2025-06-09": { marked: true, dotColor: "red" },
            "2025-06-30": { marked: true, dotColor: "red" },
            "2025-06-20": { marked: true, dotColor: "greenyellow" },
          }}
        />
      </View>
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
  calendarContainer: {
    width: deviceWidth * 0.8,
  },
});
export default Ansicht1;
/*
 */
