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

//Tab 1
const Home = ({ navigation }) => {
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
  const childRef = useRef(null);
  const today = new Date().getDay();
  var nextTraining = findNextTraining(today);

  // Beim Mount den gespeicherten Plan und die gespeichtern Tage laden
  useEffect(() => {
    (async () => {
      try {
        const storedPlan = await Storage.getItemAsync("Trainingsplan");
        const storedDays = await Storage.getItemAsync("Trainingstage");
        if (storedPlan) {
          setWorkoutPlan(storedPlan);
        }

        if (storedDays) {
          const parsed = JSON.parse(storedDays);
          //console.log("log: " + parsed);
          setTrainingDays(parsed);
        }
      } catch (e) {
        console.warn("Fehler beim Laden:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
        if (today > 6) today = 0;
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
        Hi!
      </Text>
      <Text style={{ fontSize: 20 }}>
        Dein nächstes Training am {nextTraining}
      </Text>
      <View style={styles.exerciseContainer}>
        <Text style={styles.exercise}>Pullups</Text>
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
/*<View>
        <TextInput keyboardType="number-pad"></TextInput>
      </View>
      
<Pressable onPress={() => console.log("Image pressed")}>
          <Image
            source={{
              width: 400,
              height: 400,
              uri: "https://picsum.photos/400/400",
            }}
          />
        </Pressable>
        <Button
        title="GO TO TRAINING"
        onPress={() => navigation.navigate("Training")}
      ></Button>*/

export default Home;
