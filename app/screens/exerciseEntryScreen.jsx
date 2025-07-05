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

export default function ExerciseEntryScreen({ navigation }) {
  const [grunduebung, setGrunduebung] = useState(0);
  // BEREICH 1: Array von Gruppen { level, value }
  const [groups, setGroups] = useState([{ level: 0, value: "" }]);

  // BEREICH 2: ein einzelner Level-Picker + Array von Zahl-Inputs
  const [singleLevel, setSingleLevel] = useState(0);
  const [numberInputs, setNumberInputs] = useState([]);

  const [date, setDate] = useState(
    new Date().toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
  );

  // Funktionen für Bereich 1
  const addGroup = () =>
    setGroups((g) => (g.length > 5 ? g : [...g, { level: 0, value: "" }]));

  const removeGroup = () =>
    setGroups((g) => (g.length > 0 ? g.slice(0, -1) : g));

  const updateGroup = (idx, field, val) =>
    setGroups((g) =>
      g.map((grp, i) => (i === idx ? { ...grp, [field]: val } : grp))
    );

  // Funktionen für Bereich 2
  const addNumberInput = () =>
    setNumberInputs((arr) => (arr.length > 5 ? arr : [...arr, ""]));

  const removeNumberInput = () =>
    setNumberInputs((arr) => (arr.length > 1 ? arr.slice(0, -1) : arr));

  const updateNumberInput = (idx, text) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    setNumberInputs((arr) => arr.map((v, i) => (i === idx ? cleaned : v)));
  };

  const onPressFertig = () => {
    //User-Error handling: Keine Grundübung ausgewählt
    if (grunduebung === 0) {
      Alert.alert(
        "Achtung",
        "Bitte wähle eine Grundübung aus, um deine Eingaben speichern zu können.",
        [{ text: "OK" }]
      );
      return;
    } else if (singleLevel === 0) {
      //User-Error handling: Keine Level für die Arbeitssätze ausgewählt
      Alert.alert(
        "Achtung",
        "Bitte wähle ein Level für deine Arbeitssätze aus, um deine Eingaben speichern zu können.",
        [{ text: "OK" }]
      );
      return;
    }
    //console.log(groups);
    //console.log(numberInputs[1]);
    saveToDB();
    Alert.alert("Eintrag abgeschlossen", "Deine Eingaben wurden gespeichert.", [
      { text: "OK" },
    ]);
    navigation.navigate("TabHome");
  };

  async function saveToDB() {
    const fields = [];
    const placeholders = ["?", "?", "?"];
    const values = [date, grunduebung, singleLevel];

    Object.entries(numberInputs).forEach(([key, value], index) => {
      if (value) {
        fields.push(`work${index + 1}_rep`);
        //console.log("key: " + key + 1);
        //console.log("value: " + value);
        placeholders.push("?");
        values.push(value);
      }
    });

    //als nächstes mit warmups weiter

    const query = `INSERT INTO trainings (datestring, baseExercise, level, ${fields.join(
      ", "
    )}) VALUES (${placeholders.join(", ")})`;
    console.log(query);
    console.log(values);
    const db = await SQLite.openDatabaseAsync("training.db");
    const result = await db.runAsync(query, values);
    console.log(result);
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
          <Picker.Item label="Liegestütze" value={1} />
          <Picker.Item label="Kniebeuge" value={2} />
          <Picker.Item label="Klimmzüge" value={3} />
          <Picker.Item label="Beinheber" value={4} />
          <Picker.Item label="Brücken" value={5} />
          <Picker.Item label="Handstand Liegestütze" value={6} />
        </Picker>
      </View>
      <Text style={styles.heading}>Warm-up</Text>
      {groups.map((grp, i) => (
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
            selectedValue={singleLevel}
            onValueChange={(val) => setSingleLevel(val)}
          >
            <Picker.Item label="- Level wählen -" value={0} enabled={false} />
            {[...Array(10)].map((_, idx) => (
              <Picker.Item key={idx + 1} label={`${idx + 1}`} value={idx + 1} />
            ))}
          </Picker>
        </View>
      </View>
      {numberInputs.map((val, i) => (
        <TextInput
          key={i}
          style={[styles.input, styles.numberInput]}
          keyboardType="numeric"
          maxLength={4}
          value={val}
          onChangeText={(text) => updateNumberInput(i, text)}
          placeholder={`#${i + 1}`}
        />
      ))}
      <View style={styles.buttonsRow}>
        <Button title="Satz hinzufügen" onPress={addNumberInput} />
        <View style={styles.spacer} />
        <Button title="Satz entfernen" onPress={removeNumberInput} />
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
