import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Pressable,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import colors from "../colors";
import ExerciseListModal from "../components/exerciseListModal";
import Storage from "expo-sqlite/kv-store";
import * as SQLite from "expo-sqlite";
import Ionicons from "react-native-vector-icons/Ionicons";
import LevelUpRequirements from "../data/exercises/levelUpRequirements";
import levelUpRequirements from "../data/exercises/levelUpRequirements";
import { useFocusEffect } from "@react-navigation/native";
import db from "../db";
//Tab 1
const Home = ({ navigation }) => {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(true);
  const [modalDay, setModalDay] = useState(
    new Date().toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );
  const [trainingDays, setTrainingDays] = useState([]);
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [schedule, setSchedule] = useState();
  const [finishedExercises, setFinishedExercises] = useState([]);
  const [exerciseLevels, setExerciseLevels] = useState([]);
  const [recommandationBasis, setRecommandationBasis] = useState([]);
  const childRef = useRef(null);
  const today = new Date().getDay();

  const displayedDay = findNextTraining(today).slice(0, 2);

  useEffect(() => {
    (async () => {
      if (!schedule) return;
      try {
        let resultArray = [];
        let finishedArray = [];
        let exerciseLevelArray = [];
        const displayedDay = findNextTraining(today).slice(0, 2);
        const exercises = schedule[displayedDay];

        const query1 = `SELECT id FROM trainings WHERE baseExercise=? AND datestring=?`;
        //get exercise levels and check if exercises have been done today already
        for (let i = 0; i < exercises.length; i++) {
          const storedExerciseLevel = await Storage.getItemAsync(exercises[i]);
          if (storedExerciseLevel) exerciseLevelArray.push(storedExerciseLevel);
          const values = [exercises[i], modalDay];
          //console.log(query);
          //console.log(values);
          const result = await db.getAllAsync(query1, values);
          //console.log(result);
          if (result.length > 0) finishedArray.push(true);
          else finishedArray.push(false);
        }
        //console.log("final array of finished exercises: ", finishedArray);
        setExerciseLevels(exerciseLevelArray);
        setFinishedExercises(finishedArray);
        //const db = await SQLite.openDatabaseAsync("training.db");
        const query2 = `SELECT id, baseExercise, level, work1_rep, work2_rep, work3_rep, work4_rep, work5_rep, work6_rep FROM trainings WHERE baseExercise=? AND level=? ORDER BY id DESC LIMIT 3`;
        for (let i = 0; i < exercises.length; i++) {
          const values = [
            exercises[i],
            Number(exerciseLevelArray[i].slice(0, 1)),
          ];
          console.log("query2: ", query2);
          console.log("values: ", values);
          const result = await db.getAllAsync(query2, values);
          console.log(result);
          resultArray.push(result);
        }
        setRecommandationBasis(resultArray);
      } catch (e) {
        console.warn("Fehler beim Laden (useEffect):", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [schedule]);

  useFocusEffect(
    useCallback(() => {
      // läuft immer, wenn der Screen "focused" wird
      (async () => {
        try {
          const storedPlan = await Storage.getItemAsync("Trainingsplan");
          const storedDays = await Storage.getItemAsync("Trainingstage");
          const storedSchedule = await Storage.getItemAsync("schedule");
          const storedName = await Storage.getItemAsync("name");
          if (storedPlan) {
            setWorkoutPlan(storedPlan);
          }

          if (storedDays) {
            const parsed = JSON.parse(storedDays);
            //console.log("log: ", parsed);
            setTrainingDays(parsed);
          }

          if (storedSchedule) {
            const parsed = JSON.parse(storedSchedule);
            console.log("log: ", parsed);
            setSchedule(parsed);
          }

          if (storedName) {
            setName(storedName);
          }
        } catch (e) {
          console.warn("Fehler beim Laden:", e);
        } /*finally {
        setLoading(false);
      }*/
      })();
    }, [])
  );

  function findNextTraining(today) {
    //convert trainingDays to array with 0-6 (So - Sa)
    let intDays = [];
    for (let i = 0; i < trainingDays.length; i++) {
      if (trainingDays[i] == "So") intDays.push(0);
      if (trainingDays[i] == "Mo") intDays.push(1);
      if (trainingDays[i] == "Di") intDays.push(2);
      if (trainingDays[i] == "Mi") intDays.push(3);
      if (trainingDays[i] == "Do") intDays.push(4);
      if (trainingDays[i] == "Fr") intDays.push(5);
      if (trainingDays[i] == "Sa") intDays.push(6);
    }
    for (let i = 0; i < 8; i++) {
      if (intDays.includes(today)) {
        break;
      } else {
        today = today + 1;
        if (today == 7) today = 0;
      }
    }
    if (today == 0) return "Sonntag";
    if (today == 1) return "Montag";
    if (today == 2) return "Dienstag";
    if (today == 3) return "Mittwoch";
    if (today == 4) return "Donnerstag";
    if (today == 5) return "Freitag";
    if (today == 6) return "Samstag";
  }

  //pass order of exercises
  function generateWarmup(order) {
    /*console.log(
      "rec: ",
      recommandationBasis[order] ? recommandationBasis[order][0].level : "no"
    );*/
    if (!recommandationBasis[order]) return;
    if (!exerciseLevels[order]) return;
    const currentLevel = Number(exerciseLevels[order].slice(0, 1));
    let firstSetLevel = 0;
    let secondSetLevel = 0;
    //console.log(currentLevel);
    if (currentLevel == 1) {
      firstSetLevel = currentLevel;
      secondSetLevel = currentLevel;
    } else if (currentLevel == 2) {
      firstSetLevel = currentLevel - 1;
      secondSetLevel = currentLevel - 1;
    } else if (currentLevel == 3) {
      firstSetLevel = currentLevel - 2;
      secondSetLevel = currentLevel - 1;
    } else if (currentLevel == 4) {
      firstSetLevel = currentLevel - 3;
      secondSetLevel = currentLevel - 2;
    } else {
      firstSetLevel = currentLevel - 4;
      secondSetLevel = currentLevel - 3;
    }
    const exercise = schedule[displayedDay][order];
    let firstSetReps =
      LevelUpRequirements[exercise][`level${firstSetLevel}`]["Anfänger"][
        "reps"
      ];
    let secondSetReps =
      LevelUpRequirements[exercise][`level${secondSetLevel}`]["Anfänger"][
        "reps"
      ];
    //console.log(firstSetReps);
    //console.log(secondSetReps);
    return (
      <View>
        <Text style={styles.exercise}>{exercise}</Text>
        {firstSetLevel == secondSetLevel ? (
          <Text style={styles.textTabbedIn}>
            Warm-up: Level {firstSetLevel} - 2x{firstSetReps}
          </Text>
        ) : (
          <View>
            <Text style={styles.textTabbedIn}>
              Warm-up: Level {firstSetLevel} - 1x{firstSetReps}
            </Text>
            <Text style={styles.textTabbedIn}>
              Warm-up: Level {secondSetLevel} - 1x{secondSetReps}
            </Text>
          </View>
        )}
      </View>
    );
  }

  function generateWork(order) {
    if (!recommandationBasis[order]) return;
    if (!exerciseLevels[order]) return;
    const currentLevel = Number(exerciseLevels[order].slice(0, 1));
    const exercise = schedule[displayedDay][order];
    //checken ob Level "ganz neu", also gerade erst aufgestiegen und noch keine Übung auf dem Level gemacht, dann auf Trainingsziel Fortgeschritten setzen
    let trainedOnCurrentLevel = false;
    for (let i = 0; i < recommandationBasis[order].length; i++) {
      if (recommandationBasis[order][i]["level"] >= currentLevel)
        trainedOnCurrentLevel = true;
    }
    let numOfSets = 0;
    let numOfReps = 0;
    if (!trainedOnCurrentLevel) {
      //Scenario C
      numOfReps =
        levelUpRequirements[exercise][`level${currentLevel}`][
          "Fortgeschritten"
        ]["reps"];
      numOfSets =
        levelUpRequirements[exercise][`level${currentLevel}`][
          "Fortgeschritten"
        ]["sets"];
    } else {
      //Scenario A, B, D, E, F, G
      let totalWorkArray = [];
      let totalWorkSetsArray = [];
      let highestValueArray = [];
      for (let i = 0; i < recommandationBasis[order].length; i++) {
        totalWorkArray.push(0);
        totalWorkSetsArray.push(0);
        highestValueArray.push(0);
        for (let j = 1; j < 7; j++) {
          if (recommandationBasis[order][i][`work${j}_rep`]) {
            totalWorkSetsArray[i] = totalWorkSetsArray[i] + 1;
            totalWorkArray[i] =
              totalWorkArray[i] +
              Number(recommandationBasis[order][i][`work${j}_rep`]);
            if (
              Number(recommandationBasis[order][i][`work${j}_rep`]) >
              highestValueArray[i]
            )
              highestValueArray[i] = Number(
                recommandationBasis[order][i][`work${j}_rep`]
              );
          }
        }
        //console.log("totalWorkArray: ", totalWorkArray);
        //console.log("totalWorkSetsArray: ", totalWorkSetsArray);
        //console.log("highestValueArray: ", highestValueArray);
      }
      let len = totalWorkArray.length;
      let newTotalReps = 0;
      let diff = 0;

      //leider nicht viele Daten zur Verfügung
      //Sätze Anzahl bleibt gleich
      //numOfSets = totalWorkSetsArray[len - 1];
      //ansonsten minimal mehr reps
      //numOfReps = Math.floor(totalWorkArray[len - 1] / numOfSets) + 2;
      if (len == 1) diff = 2; //* totalWorkSetsArray.length;
      //pro Satz 2 Wiederholungen mehr machen
      else {
        //diff = totalWorkArray[len - 1] - totalWorkArray[len - 2];
        //TODO hier irgendwas ändern damit ein wechsel von 2 auf 3 Sätzen z.B. nicht alles zerstört
        diff = highestValueArray[0] - highestValueArray[1];
      }
      if (diff == 0) diff = 2; //* totalWorkSetsArray.length; //pro Satz 2 Wiederholungen mehr machen
      if (diff < 0) diff = diff * -1;
      if (diff > 0) {
        //Verbesserung
        //newTotalReps = totalWorkArray[len - 1] + diff;
        //hier +diff?
        let averageReps = Math.ceil(totalWorkArray[0] / totalWorkSetsArray[0]);
        averageReps = averageReps + diff;
        console.log("diff ", diff);
        console.log("avg ", averageReps);
        if (
          averageReps >=
          levelUpRequirements[exercise][`level${currentLevel}`]["levelup"][
            "reps"
          ]
        ) {
          //Vorschlag würde über levelUpRequirements hinausgehen, deshalb stellen wir das Maximum ein
          numOfReps =
            levelUpRequirements[exercise][`level${currentLevel}`]["levelup"][
              "reps"
            ];
          numOfSets =
            levelUpRequirements[exercise][`level${currentLevel}`]["levelup"][
              "sets"
            ];
        } else {
          //Absoluter Normalfall: Steigerung aber kein Levelup
          //evtl. müssen die reps und sets angepasst werden, weil man z.B. in die Fortgeschritten (Trainingsziel) Reichweite fällt
          //mehr Sätze als beim letzes Mal nur wenn threshold erreicht
          //ansonsten mehr reps

          if (
            averageReps <
            levelUpRequirements[exercise][`level${currentLevel}`]["Anfänger"][
              "reps"
            ]
          ) {
            //wenn Nutzer 1 Satz macht dann macht er 1 Satz weiter, wenn er macht dann soll er ruhig weiter mehr machen
            //Alternativ einfach auf 1 Satz setzen?
            numOfSets =
              levelUpRequirements[exercise][`level${currentLevel}`]["Anfänger"][
                "sets"
              ]; //totalWorkSetsArray[len - 1];
            numOfReps = averageReps; //+ Math.ceil(diff / numOfSets);
            //numOfReps = totalWorkArray[len - 1] + diff;
            // numOfReps = Math.ceil(numOfReps / numOfSets);
            //durch dieses Vorgehen mit floor kann durch Randfälle evtl. keine Steigerung in der Empfehlung zu sehen sein
          } else if (
            averageReps <
            levelUpRequirements[exercise][`level${currentLevel}`][
              "Fortgeschritten"
            ]["reps"]
          ) {
            numOfSets =
              levelUpRequirements[exercise][`level${currentLevel}`][
                "Fortgeschritten"
              ]["sets"];
            numOfReps = averageReps; //+ Math.ceil(diff / numOfSets);
          } else if (
            averageReps <
            levelUpRequirements[exercise][`level${currentLevel}`]["levelup"][
              "reps"
            ]
          ) {
            numOfSets =
              levelUpRequirements[exercise][`level${currentLevel}`]["levelup"][
                "sets"
              ];
            numOfReps = averageReps; //+ Math.ceil(diff / numOfSets);
          } else {
            numOfReps =
              levelUpRequirements[exercise][`level${currentLevel}`]["levelup"][
                "reps"
              ];
            numOfSets =
              levelUpRequirements[exercise][`level${currentLevel}`]["levelup"][
                "sets"
              ];
          }
        }
        //} else if (diff == 0) {
        //Leistung gleichgeblieben
        //Sätze Anzahl bleibt gleich
        //numOfSets = totalWorkSetsArray[len - 1];
        //ansonsten minimal mehr reps
        //numOfReps = Math.floor(totalWorkArray[len - 1] / numOfSets) + 2;
      } //else {
      //F
      //Verschlechterung
      //numOfReps = totalWorkArray[len - 2];
      //numOfSets = totalWorkSetsArray[len - 2];
      //numOfReps = Math.floor(numOfReps / numOfSets);
      //}
    }
    return (
      <View>
        <Text style={styles.textTabbedIn}>
          Work: Level {currentLevel} - {numOfSets}x{numOfReps}
        </Text>
      </View>
    );
  }

  // Solange geladen wird → Spinner
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        margin: 10,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 20, paddingBottom: 30 }}>
        Hi{name ? " " + name : ""}!
      </Text>
      <Text style={{ fontSize: 20 }}>
        Dein nächstes Training am {findNextTraining(today)}
      </Text>
      <View style={styles.exerciseContainer}>
        {finishedExercises[0] && (
          <Ionicons name="checkmark-circle-outline" size={20} color="green" />
        )}
        {generateWarmup(0)}
        {generateWork(0)}
      </View>
      <View style={styles.exerciseContainer}>
        {finishedExercises[1] && (
          <Ionicons name="checkmark-circle-outline" size={20} color="green" />
        )}
        {schedule[findNextTraining(today).slice(0, 2)].length >= 2
          ? generateWarmup(1)
          : ""}
        {schedule[findNextTraining(today).slice(0, 2)].length >= 2
          ? generateWork(1)
          : ""}
      </View>
      <View style={styles.button}>
        <Button
          color={colors.primary}
          //onPress={() => childRef.current.toggleModal()}
          onPress={() => navigation.navigate("ExerciseEntryScreen")}
          title="Übung eintragen"
        ></Button>
      </View>
      <View style={styles.button}>
        <Button
          color={colors.primary}
          onPress={() => childRef.current.toggleModal()}
          title="Heutiges Training verwalten"
        ></Button>
      </View>

      <ExerciseListModal
        navigation={navigation}
        ref={childRef}
        day={modalDay}
      />
    </View>
  );
};

/*<View style={styles.exerciseContainer}>
        <Text style={styles.exercise}>Pullups</Text>
        {finishedExercises[0] && (
          <Ionicons name="checkmark-circle-outline" size={20} color="green" />
        )}
        <Text style={styles.textTabbedIn}>Warm-up: Incline Push Up 1x15</Text>
        <Text style={styles.textTabbedIn}>Warm-up: Wall Push Up 1x15</Text>
        <Text style={styles.textTabbedIn}>Work: Kneeling Push Ups 2x20</Text>
      </View>
      
      <View style={styles.exerciseContainer}>
        <Text style={styles.exercise}>Squats</Text>
        <Text style={styles.textTabbedIn}>
          Warm-up: Shoulderstand Squats 1x15
        </Text>
        <Text style={styles.textTabbedIn}>Warm-up: Jackknife Squats 1x15</Text>
        <Text style={styles.textTabbedIn}>Work: Supported Squats 2x20</Text>
      </View>*/

const styles = StyleSheet.create({
  exerciseContainer: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    padding: 10,
    marginTop: 30,
  },
  exercise: {
    fontSize: 17,
  },
  textTabbedIn: {
    fontSize: 15,
    marginLeft: 30,
  },
  button: {
    marginTop: 20,
  },
  modalBackground: {
    backgroundColor: "white",
  },
});

export default Home;
