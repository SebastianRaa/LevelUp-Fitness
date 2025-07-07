import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Pressable,
  Button,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import colors from "../colors";
import { TextInput } from "react-native-gesture-handler";
import ExerciseListModal from "../components/exerciseListModal";

//erstmal nur Montag Mittwoch Freitag Trainingstage
//erweitern für die Auswahl aus Settings
const today = new Date().getDay();
function findNextTraining(today) {
  if (today == 1 || today >= 6) {
    return "Montag";
  } else if (today == 2 || today == 3) {
    return "Mittwoch";
  } else {
    return "Freitag";
  }
}

//Tab 1
const Home = ({ navigation }) => {
  const [modalDay, setModalDay] = useState(
    new Date().toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
  );
  const childRef = useRef(null);
  var nextTraining = findNextTraining(today);

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
