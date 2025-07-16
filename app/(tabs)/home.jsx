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
import React, { useState, useRef, useEffect } from "react";
import colors from "../colors";
import ExerciseListModal from "../components/exerciseListModal";
import Storage from "expo-sqlite/kv-store";
import * as SQLite from "expo-sqlite";
import Ionicons from "react-native-vector-icons/Ionicons";
import LevelUpRequirements from "../data/exercises/levelUpRequirements";
import levelUpRequirements from "../data/exercises/levelUpRequirements";
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

  // Beim Mount den gespeicherten Plan und die gespeichtern Tage laden
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    //check if the exercises for this day have been done already
    async function exercisesDone() {
      if (!schedule) return;
      try {
        let finishedArray = [];
        let exerciseLevelArray = [];
        const displayedDay = findNextTraining(today).slice(0, 2);
        //console.log("displayedDay: " + displayedDay);
        const exercises = schedule[displayedDay];
        //console.log(schedule);
        //console.log(exercises);

        const db = await SQLite.openDatabaseAsync("training.db");
        for (let i = 0; i < exercises.length; i++) {
          const storedExerciseLevel = await Storage.getItemAsync(exercises[i]);
          if (storedExerciseLevel) exerciseLevelArray.push(storedExerciseLevel);
          const query = `SELECT id FROM trainings WHERE baseExercise=? AND datestring=?`;
          const values = [exercises[i], modalDay];
          //console.log(query);
          //console.log(values);
          const result = await db.getAllAsync(query, values);
          //console.log(result);
          if (result.length > 0) finishedArray.push(true);
          else finishedArray.push(false);
        }
        //console.log("final array of finished exercises: ", finishedArray);
        setExerciseLevels(exerciseLevelArray);
        setFinishedExercises(finishedArray);
      } catch (e) {
        console.warn("Fehler beim Laden (exercisesDone):", e);
      } finally {
        setLoading(false);
      }
    }
    exercisesDone();
  }, [schedule]);

  useEffect(() => {
    (async () => {
      console.log("hello");
      if (!schedule) return;
      console.log("hello2");
      const resultArray = [];
      const displayedDay = findNextTraining(today).slice(0, 2);
      const exercises = schedule[displayedDay];
      const db = await SQLite.openDatabaseAsync("training.db");
      const query = `SELECT id, baseExercise, level, work1_rep, work2_rep, work3_rep, work4_rep, work5_rep, work6_rep FROM trainings WHERE baseExercise=? ORDER BY id DESC LIMIT 3`;
      for (let i = 0; i < exercises.length; i++) {
        const values = [exercises[i]];
        console.log(query);
        console.log(values);
        const result = await db.getAllAsync(query, values);
        console.log(result);
        resultArray.push(result);
      }
      setRecommandationBasis(resultArray);
    })();
  }, [schedule]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Home focus event");
      setCount((c) => c + 1);
    });
    return unsubscribe;
  }, [navigation]);

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
        {firstSetLevel == secondSetLevel ? (
          <Text>
            Warm-up: Level {firstSetLevel} - 2x{firstSetReps}
          </Text>
        ) : (
          <View>
            <Text>
              Warm-up: Level {firstSetLevel} - 1x{firstSetReps}
            </Text>
            <Text>
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
      //TODO: Scenario A, B, D, E
      let totalWorkArray = [];
      for (let i = 0; i < recommandationBasis[order].length; i++) {
        totalWorkArray.push(0);
        for (let j = 1; j < 7; j++) {
          if (recommandationBasis[order][i][`work${j}_rep`])
            totalWorkArray[i] =
              totalWorkArray[i] +
              Number(recommandationBasis[order][i][`work${j}_rep`]);
        }
        console.log(totalWorkArray);
      }
    }
    return (
      <View>
        <Text>
          Work: Level - {currentLevel} {numOfSets}x{numOfReps}
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
        <Text style={styles.exercise}>Pullups</Text>
        {finishedExercises[0] && (
          <Ionicons name="checkmark-circle-outline" size={20} color="green" />
        )}
        <Text style={styles.textTabbedIn}>Warm-up: Incline Push Up 1x15</Text>
        <Text style={styles.textTabbedIn}>Warm-up: Wall Push Up 1x15</Text>
        <Text style={styles.textTabbedIn}>Work: Kneeling Push Ups 2x20</Text>
      </View>
      {generateWarmup(0)}
      {generateWork(0)}

      <View style={styles.exerciseContainer}>
        <Text style={styles.exercise}>Squats</Text>
        <Text style={styles.textTabbedIn}>
          Warm-up: Shoulderstand Squats 1x15
        </Text>
        <Text style={styles.textTabbedIn}>Warm-up: Jackknife Squats 1x15</Text>
        <Text style={styles.textTabbedIn}>Work: Supported Squats 2x20</Text>
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
      <Text>{count}</Text>

      <ExerciseListModal
        navigation={navigation}
        ref={childRef}
        day={modalDay}
      />
    </View>
  );
};

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
