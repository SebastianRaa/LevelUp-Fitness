import {
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Pressable,
  Button,
  ActivityIndicator,
  Dimensions,
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

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
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

  let item = {
    baseExercise: null,
    datestring: modalDay,
    id: null,
    level: null,
    warmup1_level: 0,
    warmup1_rep: "",
    warmup2_level: null,
    warmup2_rep: null,
    warmup3_level: null,
    warmup3_rep: null,
    warmup4_level: null,
    warmup4_rep: null,
    warmup5_level: null,
    warmup5_rep: null,
    warmup6_level: null,
    warmup6_rep: null,
    work1_rep: "",
    work2_rep: null,
    work3_rep: null,
    work4_rep: null,
    work5_rep: null,
    work6_rep: null,
  };

  let exerciseOneWarmupArray = [];
  let exerciseTwoWarmupArray = [];
  let exerciseOneWorkArray = [];
  let exerciseTwoWorkArray = [];

  async function adjustItem(order) {
    item.baseExercise = schedule[displayedDay][order];
    if (order == 0) {
      item.warmup1_level = exerciseOneWarmupArray[0];
      item.warmup1_rep = exerciseOneWarmupArray[1].toString();
      item.warmup2_level = exerciseOneWarmupArray[2];
      item.warmup2_rep = exerciseOneWarmupArray[3].toString();
      item.level = exerciseOneWorkArray[0];
      for (let i = 1; i < exerciseOneWorkArray[1] + 1; i++) {
        item[`work${i}_rep`] = exerciseOneWorkArray[2].toString();
      }
    } else {
      item.warmup1_level = exerciseTwoWarmupArray[0];
      item.warmup1_rep = exerciseTwoWarmupArray[1].toString();
      item.warmup2_level = exerciseTwoWarmupArray[2];
      item.warmup2_rep = exerciseTwoWarmupArray[3].toString();
      item.level = exerciseTwoWorkArray[0];
      for (let i = 1; i < exerciseTwoWorkArray[1] + 1; i++) {
        item[`work${i}_rep`] = exerciseTwoWorkArray[2].toString();
      }
    }
  }

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
          //console.log("query2: ", query2);
          //console.log("values: ", values);
          const result = await db.getAllAsync(query2, values);
          //console.log(result);
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
            //console.log("log: ", parsed);
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

  function getScreenName(exercise) {
    if (exercise == "pushups") {
      return "PushupScreen";
    } else if (exercise == "squats") {
      return "SquatScreen";
    } else if (exercise == "pullups") {
      return "PullupScreen";
    } else if (exercise == "leg_raises") {
      return "LegraiseScreen";
    } else if (exercise == "bridges") {
      return "BridgeScreen";
    } else if (exercise == "handstand_pushups") {
      return "HandstandpushupScreen";
    } else {
      return "PushupScreen";
    }
  }

  //pass order of exercises
  function generateWarmup(order) {
    /*console.log(
      "rec: ",
      recommandationBasis[order] ? recommandationBasis[order][0].level : "no"
    );*/
    if (!recommandationBasis[order]) return;
    if (!exerciseLevels[order]) return;
    let currentLevel = 0;

    if (exerciseLevels[order].length == 3) {
      currentLevel = Number(exerciseLevels[order].slice(0, 1));
    } else {
      currentLevel = Number(exerciseLevels[order]);
    }
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
    if (order == 0) {
      exerciseOneWarmupArray.push(firstSetLevel);
      exerciseOneWarmupArray.push(firstSetReps);
      exerciseOneWarmupArray.push(secondSetLevel);
      exerciseOneWarmupArray.push(secondSetReps);
    } else {
      exerciseTwoWarmupArray.push(firstSetLevel);
      exerciseTwoWarmupArray.push(firstSetReps);
      exerciseTwoWarmupArray.push(secondSetLevel);
      exerciseTwoWarmupArray.push(secondSetReps);
    }
    return (
      <View>
        <View style={styles.exerciseHeader}>
          <Text style={styles.exercise}>
            {getGermanName(exercise)} (L{currentLevel})
          </Text>
          {finishedExercises[order] && (
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color="green"
              style={{ alignSelf: "center", marginLeft: 10 }}
            />
          )}
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.textTabbedIn}>Aufwärmen</Text>
          <Pressable
            onPress={() =>
              navigation.navigate(getScreenName(exercise), {
                anchor: `level${firstSetLevel}`,
              })
            }
          >
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.primary}
              style={{ alignSelf: "center", marginLeft: 10 }}
            />
          </Pressable>
        </View>

        {firstSetLevel == secondSetLevel ? (
          <View style={styles.exerciseHeader}>
            <Text style={styles.textWarmup}>
              {levelUpRequirements[exercise][`level${firstSetLevel}`]["name"]}{" "}
              (L
              {firstSetLevel})
            </Text>
            <Text> 2x{firstSetReps}</Text>
          </View>
        ) : (
          <View>
            <View style={styles.exerciseHeader}>
              <Text style={styles.textWarmup}>
                {levelUpRequirements[exercise][`level${firstSetLevel}`]["name"]}{" "}
                (L
                {firstSetLevel})
              </Text>
              <Text> 1x{firstSetReps}</Text>
            </View>
            <View style={styles.exerciseHeader}>
              <Text style={styles.textWarmup}>
                {
                  levelUpRequirements[exercise][`level${secondSetLevel}`][
                    "name"
                  ]
                }{" "}
                (L
                {secondSetLevel})
              </Text>
              <Text> 1x{secondSetReps}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  function generateWork(order) {
    if (!recommandationBasis[order]) return;
    if (!exerciseLevels[order]) return;
    let currentLevel = 0;
    if (exerciseLevels[order].length == 3) {
      currentLevel = Number(exerciseLevels[order].slice(0, 1));
    } else {
      currentLevel = Number(exerciseLevels[order]);
    }
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
      if (len == 1)
        diff = Math.ceil(
          levelUpRequirements[exercise][`level${currentLevel}`]["levelup"][
            "reps"
          ] * 0.1
        );
      else {
        diff = highestValueArray[0] - highestValueArray[1];
      }
      if (diff == 0)
        diff = Math.ceil(
          levelUpRequirements[exercise][`level${currentLevel}`]["levelup"][
            "reps"
          ] * 0.1
        );
      if (diff < 0) diff = diff * -1;
      if (diff > 0) {
        //Verbesserung
        let averageReps = Math.ceil(totalWorkArray[0] / totalWorkSetsArray[0]);
        averageReps = averageReps + diff;
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
              ];
            numOfReps = averageReps;
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
            numOfReps = averageReps;
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
            numOfReps = averageReps;
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
      }
    }
    if (order == 0) {
      exerciseOneWorkArray.push(currentLevel);
      exerciseOneWorkArray.push(numOfSets);
      exerciseOneWorkArray.push(numOfReps);
    } else {
      exerciseTwoWorkArray.push(currentLevel);
      exerciseTwoWorkArray.push(numOfSets);
      exerciseTwoWorkArray.push(numOfReps);
    }
    return (
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.textTabbedIn}>Arbeitssätze</Text>
          <Pressable
            onPress={() =>
              navigation.navigate(getScreenName(exercise), {
                anchor: `level${currentLevel}`,
              })
            }
          >
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.primary}
              style={{ alignSelf: "center", marginLeft: 10 }}
            />
          </Pressable>
        </View>
        <View style={styles.exerciseHeader}>
          <Text style={styles.textWarmup}>
            {levelUpRequirements[exercise][`level${currentLevel}`]["name"]} (L
            {currentLevel})
          </Text>
          <Text>
            {numOfSets}x{numOfReps}
          </Text>
        </View>
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
    <ScrollView
      contentContainerStyle={{
        alignItems: "flex-start",
        margin: 10,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 20, paddingBottom: 10 }}>
        Hi{name ? " " + name : ""}!
      </Text>
      <Text style={{ fontSize: 20 }}>
        Dein nächstes Training am {findNextTraining(today)}
      </Text>
      <View style={styles.exerciseContainer}>
        {generateWarmup(0)}
        {generateWork(0)}
        <View style={styles.bottomRow}>
          <Pressable
            onPress={() => {
              adjustItem(0);
              navigation.navigate("ExerciseEntryScreen", { item });
            }}
          >
            <View style={styles.exerciseCheckedButton}>
              <Text style={{ color: "white" }}> Fertig?</Text>
              <Ionicons
                name="checkmark-done-outline"
                size={20}
                color={"white"}
              />
            </View>
          </Pressable>
        </View>
      </View>
      {schedule[findNextTraining(today).slice(0, 2)].length >= 2 && (
        <View style={styles.exerciseContainer}>
          {generateWarmup(1)}
          {generateWork(1)}
          <View style={styles.bottomRow}>
            <Pressable
              onPress={() => {
                adjustItem(1);
                navigation.navigate("ExerciseEntryScreen", { item });
              }}
            >
              <View style={styles.exerciseCheckedButton}>
                <Text style={{ color: "white" }}> Fertig?</Text>
                <Ionicons
                  name="checkmark-done-outline"
                  size={20}
                  color={"white"}
                />
              </View>
            </Pressable>
          </View>
        </View>
      )}
      <View style={styles.button}>
        <Button
          color={colors.primary}
          //onPress={() => childRef.current.toggleModal()}
          onPress={() => navigation.navigate("ExerciseEntryScreen")}
          title="Weitere Übung eintragen"
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
    </ScrollView>
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
    borderColor: colors.primary,
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
    width: "100%",
  },
  exercise: {
    fontSize: 17,
    fontWeight: "700",
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionHeader: {
    flexDirection: "row",
    marginTop: 10,
  },
  textTabbedIn: {
    fontSize: 15,
    marginLeft: 5,
  },
  textWarmup: {
    fontSize: 15,
    marginLeft: 10,
  },
  button: {
    marginTop: 15,
    borderRadius: 5,
  },
  modalBackground: {
    backgroundColor: "white",
  },
  exerciseCheckedButton: {
    marginTop: 10,
    padding: 5,
    width: deviceWidth * 0.25,
    height: deviceWidth * 0.08,
    backgroundColor: colors.primary,
    //position: "relative",
    //right: deviceWidth * -0.6,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5,
  },
  bottomRow: { alignSelf: "flex-end" },
});

export default Home;
