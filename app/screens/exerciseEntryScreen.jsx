import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "../colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import Storage from "expo-sqlite/kv-store";
import levelUpRequirements from "../data/exercises/levelUpRequirements";
import db from "../db";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  getRandomPositiveMessage,
  getGermanName,
  getRandomLevelUpEmoji,
} from "../components/messages";

export default function ExerciseEntryScreen({ route, navigation }) {
  const [grunduebung, setGrunduebung] = useState(0);
  // BEREICH 1: Array von Warm-Up Gruppen { level, value }
  const [warmupGroups, setWarmupGroups] = useState([{ level: 0, value: "" }]);

  // BEREICH 2: ein einzelner Level-Picker + Array von Zahl-Inputs
  const [workLevel, setWorkLevel] = useState(0);
  const [workReps, setWorkReps] = useState([""]);
  var totalWorkReps = 0;
  var totalWorkSets = 0;

  const [date, setDate] = useState(
    new Date().toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );

  const [levelUpFlag, setLevelUpFlag] = useState(false);

  //Es gibt 3 Arten zu diesem Screen zu kommen:
  // 1. Über den Button Übung eintragen (kann einfach heutiges date verwendet werden, recommendations kommen mit)
  // 2. Über die Trainingsverwaltung auf eine Übung klicken (training ist mindestens teilweise ausgefüllt)
  // 3. Über die Trainingsverwaltung auf ein beliebiges Datum klicken und neue Übung hinzufügen (date kommt rein, keine recommendations)
  const { item } = route.params ? route.params : "";
  const { mode } = route.params ? route.params : "";
  const { day } = route.params ? route.params : "";
  console.log("item", item);
  //console.log("mode", mode);
  //console.log("day", day);

  useEffect(() => {
    if (item) {
      setGrunduebung(item.baseExercise);
      setDate(item.datestring);

      setWorkLevel(item.level);
      let tmpWorkArray = [];
      let tmpWarmupArray = [];
      for (let i = 1; i < 7; i++) {
        if (item[`warmup${i}_level`] && item[`warmup${i}_rep`])
          tmpWarmupArray.push({
            level: Number(item[`warmup${i}_level`]),
            value: item[`warmup${i}_rep`],
          });

        if (item[`work${i}_rep`]) tmpWorkArray.push(item[`work${i}_rep`]);
      }
      setWarmupGroups(tmpWarmupArray);
      setWorkReps(tmpWorkArray);
    }
    if (mode == "createOnOldDate") {
      setDate(day);
    }
  }, []);

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

  function parseGermanDate(str) {
    console.log("parseGermanDate", str);
    if (typeof str !== "string") return null;
    const parts = str.trim().split(".");
    if (parts.length !== 3) return null;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (
      isNaN(day) ||
      isNaN(month) ||
      isNaN(year) ||
      day < 1 ||
      day > 31 ||
      month < 0 ||
      month > 11
    )
      return null;
    return new Date(Date.UTC(year, month, day));
  }

  async function isMostRecentDate() {
    console.log("isMostRecentDate");
    const query = `SELECT datestring, id
                  FROM trainings
                  WHERE baseExercise = ?
                  ORDER BY
                    substr(datestring, 7, 4) || '-' ||  
                    substr(datestring, 4, 2) || '-' ||  
                    substr(datestring, 1, 2) DESC,
                    id DESC
                  LIMIT 1;`;
    const result = await db.getAllAsync(query, grunduebung);
    console.log("query:", query, grunduebung, "→", result);
    if (!result || result.length == 0) return true;
    const d1 = parseGermanDate(result[0].datestring);
    const d2 = parseGermanDate(date);
    if (d1.valueOf() === d2.valueOf()) {
      //passt, kein Problem
      console.log("==");

      //nur wenn update gemacht wird kann es sein, das ein id check nötig ist, um zu bestimmen, welches training das aktuellste ist
      if (mode == "update") {
        const id1 = result[0].id;
        const id2 = item.id;
        console.log("ru");
        console.log("id1", id1);
        console.log("id2", id2);
        if (id2 >= id1) {
          console.log("ruri");
          return true;
        } else {
          console.log("ruriru");
          return false;
        }
      }
      return true;
    } else if (d1.valueOf() > d2.valueOf()) {
      console.log("d1 ist später als d2");
      return false;
    } else {
      console.log("d2 später als d1");
      return true;
    }
  }

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
    let storageUpdateRequired = true;
    if (!(await isMostRecentDate())) {
      console.log("no storage level update req.");
      storageUpdateRequired = false;
    }
    let levelflag = false;
    if (workLevel > (await Storage.getItemAsync(grunduebung))) levelflag = true;
    //Warten auf Ergebnis des DB-Inserts
    let result = 0;
    if (mode == "update") result = await updateDB();
    else result = await saveToDB();
    //erfolg
    if (result === 1) {
      let secondarylevelflag = false;
      if (storageUpdateRequired) {
        secondarylevelflag = await saveToStorage();
      }
      await calculateAbzeichen();
      console.log("levelflag", levelflag);
      console.log("secondarylevelflag", secondarylevelflag);
      console.log("worklevel", workLevel);
      let levelupscreen = levelflag || secondarylevelflag;
      //if(await Storage.getItemAsync(grunduebung) > workLevel) ->LU
      Alert.alert(
        getRandomPositiveMessage(),
        "Deine Eingaben wurden gespeichert.",
        [
          {
            text: "OK",
            onPress: () => {
              {
                levelupscreen &&
                  Alert.alert(
                    `Level Up! ${getRandomLevelUpEmoji()}`,
                    `Glückwunsch! 🎉\nDu bist bei den ${getGermanName(
                      grunduebung
                    )} nun auf Level ${levelflag ? workLevel : workLevel + 1}.`,
                    [{ text: "OK" }]
                  );
              }
            },
          },
        ]
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

  async function updateDB() {
    try {
      const fields = [`baseExercise=?`, `level=?`];
      const values = [grunduebung, workLevel];

      //iterate over every work set
      Object.entries(workReps).forEach(([key, value], index) => {
        if (value) {
          fields.push(`work${index + 1}_rep=?`);
          values.push(value);
          totalWorkReps = totalWorkReps + Number(value);
        }
      });

      Object.entries(warmupGroups).forEach(([key, value], index) => {
        if (value.level && value.value) {
          fields.push(`warmup${index + 1}_level=?`);
          fields.push(`warmup${index + 1}_rep=?`);
          values.push(value.level);
          values.push(value.value);
        }
      });

      const query = `UPDATE trainings SET ${fields.join(", ")} WHERE id=${
        item.id
      }`;
      //console.log(query);
      //console.log(values);
      const result = await db.runAsync(query, values);
      //console.log(result);
      if (result.changes === 1) {
        console.log("UPDATE war erfolgreich.");
        return 1;
      } else {
        console.log("Keine Zeile gespeichert.");
        return 0;
      }
    } catch (error) {
      console.error("❌ Fehler beim UPDATE", error);
      return 0;
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
          //totalWorkSets = totalWorkSets + 1;
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
      const result = await db.runAsync(query, values);
      if (result.changes === 1) {
        console.log("INSERT war erfolgreich.");
        return 1;
      } else {
        console.log("Keine Zeile gespeichert.");
        return 0;
      }
    } catch (error) {
      console.error("❌ Fehler beim INSERT", error);
      return 0;
    }
  }

  //save level of base exercise to key value storage
  async function saveToStorage() {
    console.log("worklevel", workLevel);
    if (workLevel == 10) {
      await Storage.setItem(`${grunduebung}`, `${workLevel}`);
      return false;
    }
    //console.log("totalWorkReps: " + totalWorkReps);
    let reqTotalReps = levelUpRequirements[grunduebung][workLevel];
    //console.log("reqTotalReps: " + reqTotalReps);
    let reqRepsPerSet =
      levelUpRequirements[grunduebung][`level${workLevel}`]["levelup"]["reps"];
    //console.log("reqRepsPerSet: " + reqRepsPerSet);
    let reqSets =
      levelUpRequirements[grunduebung][`level${workLevel}`]["levelup"]["sets"];
    //console.log("reqSets: " + reqSets);
    //console.log("req: " + req);
    //let averageReps = Math.floor(totalWorkReps/totalWorkSets)
    let setGoalAchievedCounter = 0;
    let max = 0;
    if (totalWorkReps >= reqTotalReps) {
      Object.entries(workReps).forEach(([key, value], index) => {
        if (value) {
          //totalWorkSets = totalWorkSets + 1;
          if (value >= reqRepsPerSet)
            setGoalAchievedCounter = setGoalAchievedCounter + 1;
          //console.log(setGoalAchievedCounter);
          if (value > max) max = value;
        }
      });
      //case 1: its legit -> levelUp!
      if (setGoalAchievedCounter >= reqSets) {
        console.log("case 1");
        const levelUp = workLevel + 1;
        await Storage.setItem(`${grunduebung}`, `${levelUp}`);
        return true;
      } else {
        //case 2: its not legit (e.g. too many sets)
        //we are most likely still very close to the level up
        //console.log("case 2");
        var progress = max / reqRepsPerSet;
        progress = progress.toFixed(1).slice(1); //should round to one decimal and get rid of 0 at the front
        await Storage.setItem(`${grunduebung}`, `${workLevel + progress}`);
      }
    } else {
      //console.log("default case");
      var progress = totalWorkReps / reqTotalReps;
      progress = progress.toFixed(1).slice(1); //should round to one decimal and get rid of 0 at the front
      await Storage.setItem(`${grunduebung}`, `${workLevel + progress}`);
      //console.log(progress);
    }
    return false;
  }

  async function calculateAbzeichen() {
    const rank = Number(await Storage.getItemAsync("rank"));
    if (rank >= 10) {
      console.log("Neuling");
      await Storage.setItemAsync("abzeichen0", "1");
    } else if (rank >= 30) {
      console.log("Adept");
      await Storage.setItemAsync("abzeichen1", "1");
    } else if (rank >= 50) {
      console.log("Meister");
      await Storage.setItemAsync("abzeichen2", "1");
    }
    const exerciseNamesArray = [
      "pushups",
      "squats",
      "pullups",
      "leg_raises",
      "bridges",
      "handstand_pushups",
    ];
    let counter3 = 0;
    let counter6 = 0;
    let counter10 = 0;
    let tmpLevel = 0;
    for (let i = 0; i < 6; i++) {
      try {
        tmpLevel = Number(await Storage.getItemAsync(exerciseNamesArray[i]));
        console.log("tmplevel: ", exerciseNamesArray[i], tmpLevel);
      } catch (e) {
        console.warn(e);
      }
      if (tmpLevel >= 3) {
        counter3 = counter3 + 1;
      }
      if (tmpLevel >= 6) {
        counter6 = counter6 + 1;
      }
      if (tmpLevel >= 10) {
        counter10 = counter10 + 1;
      }
    }
    if (counter3 >= 1) {
      console.log("Hungrig auf mehr");
      await Storage.setItemAsync("abzeichen3", "1");
    }
    if (counter6 >= 1) {
      console.log("Akrobat");
      await Storage.setItemAsync("abzeichen4", "1");
    }
    if (counter10 >= 1) {
      console.log("Eroberer");
      await Storage.setItemAsync("abzeichen5", "1");
    }

    if (counter3 >= 6) {
      console.log("Drachenzähmer");
      await Storage.setItemAsync("abzeichen6", "1");
    }
    if (counter6 >= 6) {
      console.log("Drachenfreund");
      await Storage.setItemAsync("abzeichen7", "1");
    }
    if (counter10 >= 6) {
      console.log("Drachenmeister");
      await Storage.setItemAsync("abzeichen8", "1");
    }
    try {
      const result = await db.getAllAsync("SELECT id FROM trainings LIMIT 100");
      console.log("result length", result.length);
      if (result.length >= 10) {
        console.log("Immer weiter");
        await Storage.setItemAsync("abzeichen9", "1");
      }
      if (result.length >= 50) {
        console.log("Ausdauer");
        await Storage.setItemAsync("abzeichen10", "1");
      }
      if (result.length >= 100) {
        console.log("Training ist alles");
        await Storage.setItemAsync("abzeichen11", "1");
      }
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      //extraScrollHeight={20} // Platz über dem aktiven Input
      keyboardShouldPersistTaps="handled"
    >
      <Pressable onPress={() => navigation.navigate("TabHome")}>
        <Ionicons name="close-outline" />
      </Pressable>
      {/* === BEREICH 1: dynamische Gruppen === */}
      <Text style={styles.headingBig}>Übungseintragung</Text>
      <Text style={{ alignSelf: "center", marginTop: 5, marginBottom: 5 }}>
        {date}
      </Text>
      <Text style={styles.heading}>Grundübung</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={grunduebung}
          onValueChange={(newVal, itemIndex) => setGrunduebung(newVal)}
          mode="dialog"
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
      <Text style={[styles.heading, { marginTop: 10 }]}>Aufwärmen</Text>
      {warmupGroups.map((grp, i) => (
        <View key={i} style={styles.group}>
          <View style={styles.picker}>
            <Picker
              selectedValue={grp.level}
              onValueChange={(val) => updateGroup(i, "level", val)}
              mode="dialog"
            >
              <Picker.Item label="- Level wählen -" value={0} enabled={false} />
              {[...Array(10)].map((_, idx) => (
                <Picker.Item
                  key={idx + 1}
                  label={
                    grunduebung
                      ? `L${idx + 1}: ` +
                        levelUpRequirements[grunduebung][`level${idx + 1}`][
                          "name"
                        ]
                      : `L${idx + 1}`
                  }
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
            placeholder={"Wiederholungen"}
          />
        </View>
      ))}
      <View style={styles.buttonsRow}>
        <Button
          title="Satz hinzufügen"
          onPress={addGroup}
          color={colors.primary}
        />
        <View style={styles.spacer} />
        <Button
          title="Satz entfernen"
          onPress={removeGroup}
          color={colors.primary}
        />
      </View>

      {/* === BEREICH 2: Single Picker + flexible Zahl-Inputs === */}
      <Text style={[styles.heading, { marginTop: 24 }]}>Arbeitssätze</Text>
      <View style={[styles.group, { marginBottom: 8 }]}>
        <View style={styles.picker}>
          <Picker
            selectedValue={workLevel}
            onValueChange={(val) => setWorkLevel(val)}
            mode="dialog"
          >
            <Picker.Item label="- Level wählen -" value={0} enabled={false} />
            {[...Array(10)].map((_, idx) => (
              <Picker.Item
                key={idx + 1}
                label={
                  grunduebung
                    ? `L${idx + 1}: ` +
                      levelUpRequirements[grunduebung][`level${idx + 1}`][
                        "name"
                      ]
                    : `L${idx + 1}`
                }
                value={idx + 1}
              />
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
          placeholder={"Wiederholungen"}
        />
      ))}
      <View style={styles.buttonsRow}>
        <Button
          title="Satz hinzufügen"
          onPress={addWorkReps}
          color={colors.primary}
        />
        <View style={styles.spacer} />
        <Button
          title="Satz entfernen"
          onPress={removeWorkReps}
          color={colors.primary}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Fertig"
          onPress={() => onPressFertig()}
          color={colors.primary}
        />
      </View>
    </KeyboardAwareScrollView>
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
    width: 120,
    height: 55,
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
