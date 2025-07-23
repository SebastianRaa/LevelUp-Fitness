import React, {
  useState,
  useImperativeHandle,
  useEffect,
  forwardRef,
} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import colors from "../colors";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";
import db from "../db";

const ExerciseListModal = ({ day }, ref) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [dailyData, setDailyData] = useState([]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const navigation = useNavigation();

  useImperativeHandle(ref, () => ({
    toggleModal,
  }));
  /*Übungen vom {day.day.toString().length == 2 ? day.day : "0" + day.day}
          .{day.month.toString().length == 2 ? day.month : "0" + day.month}.
          {day.year}*/

  useEffect(() => {
    if (!day) return;
    async function getTrainingDay() {
      try {
        //const db = await SQLite.openDatabaseAsync("training.db");
        const sql = `SELECT * FROM trainings WHERE datestring = ?;`;
        const result = await db.getAllAsync(sql, [day]);
        //console.log("SQL:", sql, [day], "→", result);
        setDailyData(result);
      } catch (err) {
        console.error(err);
      }
    }
    getTrainingDay();
  }, [day]);

  function getGermanName(exercise) {
    if (exercise == "pushups") {
      return "Liegestütze";
    } else if (exercise == "squats") {
      return "Kniebeuge";
    } else if (exercise == "pullups") {
      return "Klimmzüge";
    } else if (exercise == "leg_raises") {
      return "Beinheber";
    } else if (exercise == "bridges") {
      return "Brücken";
    } else if (exercise == "handstand_pushups") {
      return "Handstand Liegestütze";
    } else {
      return "Fehler";
    }
  }

  async function deleteEntry(item) {
    //const db = await SQLite.openDatabaseAsync("training.db");
    const query = `DELETE FROM trainings WHERE id=${item.id}`;
    console.log(query);
    const result = await db.execAsync(query);
    console.log(result);
    setDailyData((old) => old.filter((entry) => entry.id !== item.id));
  }

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          padding: 16,
          margin: 20,
        }}
      >
        <Pressable onPress={() => toggleModal()}>
          <Ionicons name="close-outline" />
        </Pressable>
        <Text style={styles.heading}>
          Übungen vom {day}
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
        {dailyData.length === 0 ? (
          <Text style={{ alignSelf: "center" }}>
            Für diesen Tag wurden noch keine Übungen eingetragen
          </Text>
        ) : (
          dailyData.map((item, index) => {
            return (
              <View key={item.id} style={styles.group}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("ExerciseEntryScreen", { item })
                  }
                >
                  <Text>{getGermanName(item.baseExercise)}</Text>
                </Pressable>
                <Text>
                  {item.work1_rep ? item.work1_rep : ""}
                  {item.work2_rep ? "/" + item.work2_rep : ""}
                  {item.work3_rep ? "/" + item.work3_rep : ""}
                  {item.work4_rep ? "/" + item.work4_rep : ""}
                  {item.work5_rep ? "/" + item.work5_rep : ""}
                  {item.work6_rep ? "/" + item.work6_rep : ""}
                </Text>
                <Pressable
                  onPress={() =>
                    Alert.alert(
                      "Eintrag löschen",
                      "Diese Übung wirklich löschen?",
                      [
                        // Abbrechen-Button
                        {
                          text: "Abbruch",
                          style: "cancel",
                        },
                        // Löschen-Button mit onPress
                        {
                          text: "Löschen",
                          style: "destructive",
                          onPress: () => {
                            deleteEntry(item);
                          },
                        },
                      ]
                    )
                  }
                >
                  <Ionicons name="trash-outline" />
                </Pressable>
              </View>
            );
          })
        )}

        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            borderRadius: 10,
            width: "50%",
            alignSelf: "center",
          }}
        >
          <Button
            title="Hinzufügen"
            onPress={() => navigation.navigate("ExerciseEntryScreen")}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  headingBig: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 8,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.third,
    width: "60%",
    alignSelf: "center",
  },
  input: {
    width: 80,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: colors.third,
    borderRadius: 5,
    textAlign: "center",
  },
  numberInput: {
    marginBottom: 8,
    alignSelf: "center", // mittig untereinander
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  spacer: {
    width: 16,
  },
  buttonWrapper: {
    width: "40%",
    marginTop: 30,
    marginBottom: 30,
    alignSelf: "center",
  },
});

export default forwardRef(ExerciseListModal);
