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
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import Storage from "expo-sqlite/kv-store";
import LevelUpRequirements from "../data/exercises/levelUpRequirements";

export default function ExerciseEntryScreen({ route, navigation }) {
  const [grunduebung, setGrunduebung] = useState(0);
  // BEREICH 1: Array von Warm-Up Gruppen { level, value }
  const [warmupGroups, setWarmupGroups] = useState([{ level: 0, value: "" }]);

  // BEREICH 2: ein einzelner Level-Picker + Array von Zahl-Inputs
  const [workLevel, setWorkLevel] = useState(0);
  const [workReps, setWorkReps] = useState([""]);
  var totalWorkReps = 0;

  const [date, setDate] = useState(
    new Date().toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );

  //Es gibt 3 Arten zu diesem Screen zu kommen:
  // 1. Über den Button Übung eintragen (kann einfach heutiges date verwendet werden, recommendations kommen mit)
  // 2. Über die Trainingsverwaltung auf eine Übung klicken (training ist mindestens teilweise ausgefüllt)
  // 3. Über die Trainingsverwaltung auf ein beliebiges Datum klicken und neue Übung hinzufügen (date kommt rein, keine recommendations)
  const { item } = route.params ? route.params : "";

  // Funktionen für Bereich 1
  const addGroup = () =>
    setWarmupGroups((g) =>
      g.length > 5 ? g : [...g, { level: 0, value: "" }]
    );

  const removeGroup = () =>
    setWarmupGroups((g) => (g.length > 0 ? g.slice(0, -1) : g));

  const updateGroup = (idx, field, val) =>
    setWarmupGroups((g) =>
      g.map((grp, i) => (i === idx ? { ...grp, [field]: val } : grp))
    );

  // Funktionen für Bereich 2
  const addWorkReps = () =>
    setWorkReps((arr) => (arr.length > 5 ? arr : [...arr, ""]));

  const removeWorkReps = () =>
    setWorkReps((arr) => (arr.length > 1 ? arr.slice(0, -1) : arr));

  const updateWorkReps = (idx, text) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    setWorkReps((arr) => arr.map((v, i) => (i === idx ? cleaned : v)));
  };

  async function onPressFertig() {
    //User-Error handling: Keine Grundübung ausgewählt
    if (grunduebung === 0) {
      Alert.alert(
        "Achtung",
        "Bitte wähle eine Grundübung aus, um deine Eingaben speichern zu können.",
        [{ text: "OK" }]
      );
      return;
    } else if (workLevel === 0) {
      //User-Error handling: Keine Level für die Arbeitssätze ausgewählt
      Alert.alert(
        "Achtung",
        "Bitte wähle ein Level für deine Arbeitssätze aus, um deine Eingaben speichern zu können.",
        [{ text: "OK" }]
      );
      return;
    } else if (!workReps[0]) {
      //User-Error handling: Keine Reps für den ersten Arbeitssatz ausgewählt
      Alert.alert(
        "Achtung",
        "Bitte trage mindestens ein Satz für deine Arbeitssätze ein, um deine Eingaben speichern zu können.",
        [{ text: "OK" }]
      );
      return;
    }
    //Warten auf Ergebnis des DB-Inserts
    const result = await saveToDB();
    //erfolg
    if (result === 1) {
      await saveToStorage();
      Alert.alert(
        "Eintrag abgeschlossen",
        "Deine Eingaben wurden gespeichert.",
        [{ text: "OK" }]
      );
      navigation.navigate("TabHome");
    } else {
      //misserfolg
      Alert.alert(
        "Fehler",
        "Deine Eingaben konnten leider nicht gespeichert werden.",
        [{ text: "OK" }]
      );
    }
  }

  async function saveToDB() {
    try {
      //need to dynamically create query string and values
      const fields = [];
      const placeholders = ["?", "?", "?"];
      const values = [date, grunduebung, workLevel];

      //iterate over every work set
      Object.entries(workReps).forEach(([key, value], index) => {
        if (value) {
          fields.push(`work${index + 1}_rep`);
          //console.log("key: " + key + 1);
          //console.log("value: " + value);
          placeholders.push("?");
          values.push(value);
          //console.log("value " + value + typeof value);
          totalWorkReps = totalWorkReps + Number(value);
        }
      });

      //iterate over every group of warmup entries
      Object.entries(warmupGroups).forEach(([key, value], index) => {
        if (value.level && value.value) {
          fields.push(`warmup${index + 1}_level`);
          fields.push(`warmup${index + 1}_rep`);
          placeholders.push("?");
          placeholders.push("?");
          values.push(value.level);
          values.push(value.value);
        }
      });

      const query = `INSERT INTO trainings (datestring, baseExercise, level, ${fields.join(
        ", "
      )}) VALUES (${placeholders.join(", ")})`;
      console.log(query);
      console.log(values);
      const db = await SQLite.openDatabaseAsync("training.db");
      const result = await db.runAsync(query, values);
      console.log(result);
      if (result.changes === 1) {
        console.log("Speichern war erfolgreich.");
        return 1;
      } else {
        console.log("Keine Zeile gespeichert.");
        return 0;
      }
    } catch (error) {
      console.error("❌ Fehler beim Speichern", error);
      return 0;
    }
  }

  //save level of base exercise to key value storage
  async function saveToStorage() {
    const req = LevelUpRequirements[grunduebung][workLevel];
    //console.log("totalWorkReps: " + totalWorkReps);
    //console.log("req: " + req);
    if (totalWorkReps >= req) {
      const levelUp = workLevel + 1;
      await Storage.setItem(`${grunduebung}`, `${levelUp}`);
    } else {
      var progress = totalWorkReps / req;
      progress = progress.toFixed(1).slice(1); //should round to one decimal and get rid of 0 at the front
      await Storage.setItem(`${grunduebung}`, `${workLevel + progress}`);
      //console.log(progress);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => navigation.navigate("TabHome")}>
        <Ionicons name="close-outline" />
      </Pressable>
      {/* === BEREICH 1: dynamische Gruppen === */}
      <Text style={styles.headingBig}>Übungseintragung</Text>
      <Text style={styles.heading}>Grundübung</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={grunduebung}
          onValueChange={(newVal, itemIndex) => setGrunduebung(newVal)}
        >
          <Picker.Item
            label="- Grundübung wählen -"
            value={0}
            enabled={false}
          />
          <Picker.Item label="Liegestütze" value={"pushups"} />
          <Picker.Item label="Kniebeuge" value={"squats"} />
          <Picker.Item label="Klimmzüge" value={"pullups"} />
          <Picker.Item label="Beinheber" value={"leg_raises"} />
          <Picker.Item label="Brücken" value={"bridges"} />
          <Picker.Item
            label="Handstand Liegestütze"
            value={"handstand_pushups"}
          />
        </Picker>
      </View>
      <Text style={[styles.heading, { marginTop: 10 }]}>Warm-up</Text>
      {warmupGroups.map((grp, i) => (
        <View key={i} style={styles.group}>
          <View style={styles.picker}>
            <Picker
              selectedValue={grp.level}
              onValueChange={(val) => updateGroup(i, "level", val)}
            >
              <Picker.Item label="- Level wählen -" value={0} enabled={false} />
              {[...Array(10)].map((_, idx) => (
                <Picker.Item
                  key={idx + 1}
                  label={`${idx + 1}`}
                  value={idx + 1}
                />
              ))}
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={4}
            value={grp.value}
            onChangeText={(text) =>
              updateGroup(i, "value", text.replace(/[^0-9]/g, ""))
            }
            placeholder={`#${i + 1}`}
          />
        </View>
      ))}
      <View style={styles.buttonsRow}>
        <Button title="Satz hinzufügen" onPress={addGroup} />
        <View style={styles.spacer} />
        <Button title="Satz entfernen" onPress={removeGroup} />
      </View>

      {/* === BEREICH 2: Single Picker + flexible Zahl-Inputs === */}
      <Text style={[styles.heading, { marginTop: 24 }]}>Arbeitssätze</Text>
      <View style={[styles.group, { marginBottom: 8 }]}>
        <View style={styles.picker}>
          <Picker
            selectedValue={workLevel}
            onValueChange={(val) => setWorkLevel(val)}
          >
            <Picker.Item label="- Level wählen -" value={0} enabled={false} />
            {[...Array(10)].map((_, idx) => (
              <Picker.Item key={idx + 1} label={`${idx + 1}`} value={idx + 1} />
            ))}
          </Picker>
        </View>
      </View>
      {workReps.map((val, i) => (
        <TextInput
          key={i}
          style={[styles.input, styles.numberInput]}
          keyboardType="numeric"
          maxLength={4}
          value={val}
          onChangeText={(text) => updateWorkReps(i, text)}
          placeholder={`#${i + 1}`}
        />
      ))}
      <View style={styles.buttonsRow}>
        <Button title="Satz hinzufügen" onPress={addWorkReps} />
        <View style={styles.spacer} />
        <Button title="Satz entfernen" onPress={removeWorkReps} />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Fertig" onPress={() => onPressFertig()} />
      </View>
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
