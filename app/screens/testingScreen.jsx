import React, { useState } from "react";
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
import { Picker } from "@react-native-picker/picker";
import colors from "../colors";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import Storage from "expo-sqlite/kv-store";
import db from "../db";
//import { Iconify } from "react-native-iconify";

export default function TestingScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  async function dbAction() {
    //const db = await SQLite.openDatabaseAsync("training.db");
    //await db.execAsync(`DROP TABLE IF EXISTS trainings`);
    await db.execAsync(`CREATE TABLE IF NOT EXISTS trainings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    datestring TEXT,
    baseExercise INTEGER,
    level INTEGER,
    work1_rep TEXT,
    work2_rep TEXT,
    work3_rep TEXT,
    work4_rep TEXT,
    work5_rep TEXT,
    work6_rep TEXT,
    warmup1_level TEXT,
    warmup1_rep TEXT,
    warmup2_level TEXT,
    warmup2_rep TEXT,
    warmup3_level TEXT,
    warmup3_rep TEXT,
    warmup4_level TEXT,
    warmup4_rep TEXT,
    warmup5_level TEXT,
    warmup5_rep TEXT,
    warmup6_level TEXT,
    warmup6_rep TEXT
);`);

    const result = await db.runAsync(
      "INSERT INTO trainings (datestring, baseExercise, level, work1_rep, work2_rep, work3_rep, work4_rep) VALUES (?, ?, ?, ?, ?, ?, ?)",
      "09.07.2025",
      "leg_raises",
      6,
      41,
      36,
      21,
      10
    );
    console.log(result.lastInsertRowId, result.changes);
  }

  async function resultsLog() {
    //const db = await SQLite.openDatabaseAsync("training.db");
    //const firstRow = await db.getFirstAsync("SELECT * FROM trainings");
    //console.log(firstRow);
    const allRows = await db.getAllAsync("SELECT * FROM trainings");
    console.log(allRows);
  }

  async function storageTest() {
    await Storage.setItem(
      "levels",
      JSON.stringify({
        pushups: 7.2,
        squats: 8.2,
        pullups: 1.2,
        leg_raises: 5.2,
        bridges: 8.2,
        handstand_pushups: 6.2,
      })
    );
    const levels = await Storage.getItem("levels");
    const entity = JSON.parse(levels);
    console.log(entity); // { entity: 'value' }
  }

  async function storageTest2() {
    //await Storage.setItem("levels", "abc");
    const levels = await Storage.getItem("handstand_pushups");
    console.log(levels); // { entity: 'value' }
  }

  return (
    <ScrollView>
      <Text>Hi </Text>
      <Button title="Create & insert DB" onPress={dbAction} />
      <Button title="Results" onPress={resultsLog} />
      <Button title="Storage Test" onPress={storageTest2} />
      {/*<Iconify icon="mdi:home" width="24" height="24" />*/}
    </ScrollView>
  );
}

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
    justifyContent: "space-evenly",
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
