/*import { View, Text, SafeAreaView, Button } from "react-native";
import React, { useState } from "react";
import MyScrollView from "../components/myScrollView";
import { MyTimePicker } from "../components/myTimePicker";
import MyCardHistory from "../components/myCardHistory";

function Training() {
  return (
    <View>
      <MyCardHistory />
    </View>
  );
}
//<MyScrollView></MyScrollView>
export default Training;*/
import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";

const WEEK_COUNT = 52; // Total weeks in a year
const TOTAL_ROWS = 3; // Number of rows (3 sets of 52 weeks)
const barData = [
  { value: 2, label: "Liegestütze" },
  { value: 3, label: "Liegestütze" },
  { value: 2, label: "Liegestütze" },
  { value: 6, label: "Liegestütze" },
  { value: 3, label: "Liegestütze" },
  { value: 1, label: "Liegestütze" },
];

const Training = (props) => {
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const [selectedAnsicht, setSelectedAnsicht] = useState(1);

  // Toggle the selection of a week when it's pressed
  const handlePress = (weekNumber) => {
    setSelectedWeeks((prevSelected) => {
      if (prevSelected.includes(weekNumber)) {
        return prevSelected.filter((item) => item !== weekNumber);
      } else {
        return [...prevSelected, weekNumber];
      }
    });
  };

  // Render each week box in the scrollable list
  const renderWeekBox = (weekNumber) => {
    const isSelected = selectedWeeks.includes(weekNumber);
    return (
      <Pressable
        style={[styles.weekBox, isSelected && styles.selectedWeek]}
        onPress={() => handlePress(weekNumber)}
      >
        <Text style={styles.weekText}>Week {weekNumber}</Text>
      </Pressable>
    );
  };

  // Generate an array for each row (Week 1 to Week 52)
  const generateWeekRow = (rowIndex) => {
    return Array.from(
      { length: WEEK_COUNT },
      (_, index) => index + 1 + rowIndex * WEEK_COUNT
    );
  };

  // Render each row with horizontal scrolling
  const renderRow = ({ index }) => {
    const weeksInRow = generateWeekRow(index);
    return (
      <View style={styles.row}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {weeksInRow.map((weekNumber) => (
            <View key={weekNumber} style={styles.weekBoxContainer}>
              {renderWeekBox(weekNumber)}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Array.from({ length: TOTAL_ROWS })} // 3 rows
        renderItem={renderRow} // Render the rows
        keyExtractor={(item, index) => index.toString()} // Ensure each row has a unique key
        showsVerticalScrollIndicator={false} // Disable vertical scroll indicator
        contentContainerStyle={styles.flatListContent}
      />
      <Text>
        <BarChart
          horizontal
          barWidth={22}
          barBorderRadius={4}
          frontColor="blue"
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
          //shiftY={-50}
          maxValue={10}
        />
      </Text>
      <View>
        <Pressable onPress={() => props.navigation.navigate("Ansicht1")}>
          <View>
            <Text>1</Text>
          </View>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => props.navigation.navigate("Ansicht2")}>
          <View>
            <Text>2</Text>
          </View>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => props.navigation.navigate("Ansicht3")}>
          <View>
            <Text>3</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  flatListContent: {
    paddingVertical: 10,
  },
  row: {
    marginBottom: 15,
  },
  weekBoxContainer: {
    margin: 5,
  },
  weekBox: {
    width: 50, // Width of each box
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  weekText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "bold",
  },
  selectedWeek: {
    backgroundColor: "#4CAF50", // Green color when selected
  },
});

export default Training;
