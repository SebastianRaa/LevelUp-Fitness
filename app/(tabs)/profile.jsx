import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Button,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import Storage from "expo-sqlite/kv-store";
import TextSwitch from "../components/textSwitch";
import DayPicker from "../components/dayPicker";
import { MyTimePicker } from "../components/myTimePicker";
import MyTextInput from "../components/myTextInput";
import colors from "../colors";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function Profile(props) {
  // Laden-Status
  const [loading, setLoading] = useState(true);

  // States
  const [name, setName] = useState("Max Mustermann");
  const [notification, setNotification] = useState(false);
  const [workoutPickerValue, setWorkoutPickerValue] = useState("Anfänger");
  const [daysRequired, setDaysRequired] = useState(2);
  const [isModalVisible, setModalVisible] = useState(false);
  const [trainingDays, setTrainingDays] = useState([]);
  const [rank, setRank] = useState(1);

  // Helper: Anzahl Trainingstage anpassen
  const adjustDaysRequired = (val) => {
    if (val === "Anfänger") setDaysRequired(2);
    else if (val === "Fortgeschritten") setDaysRequired(3);
    else if (val === "Profi") setDaysRequired(6);
  };

  // Beim Mount den gespeicherten Plan und die gespeichtern Tage laden
  useEffect(() => {
    (async () => {
      try {
        const storedPlan = await Storage.getItemAsync("Trainingsplan");
        const storedDays = await Storage.getItemAsync("Trainingstage");
        const storedName = await Storage.getItemAsync("name");
        let pushups = JSON.parse(await Storage.getItemAsync("pushups"));
        let squats = JSON.parse(await Storage.getItemAsync("squats"));
        let pullups = JSON.parse(await Storage.getItemAsync("pullups"));
        let leg_raises = JSON.parse(await Storage.getItemAsync("leg_raises"));
        let bridges = JSON.parse(await Storage.getItemAsync("bridges"));
        let handstand_pushups = JSON.parse(
          await Storage.getItemAsync("handstand_pushups")
        );
        if (storedPlan) {
          setWorkoutPickerValue(storedPlan);
          adjustDaysRequired(storedPlan);
        }

        if (storedDays) {
          const parsed = JSON.parse(storedDays);
          //console.log("log: " + parsed);
          setTrainingDays(parsed);
        }

        if (storedName) setName(storedName);

        if (!pushups) pushups = 1;
        if (!squats) squats = 1;
        if (!pullups) pullups = 1;
        if (!leg_raises) leg_raises = 1;
        if (!bridges) bridges = 1;
        if (!handstand_pushups) handstand_pushups = 1;

        const sum =
          1 +
          Math.floor(pushups) +
          Math.floor(squats) +
          Math.floor(pullups) +
          Math.floor(leg_raises) +
          Math.floor(bridges) +
          Math.floor(handstand_pushups) -
          6;
        //console.log(sum);
        await Storage.setItem("rank", `${sum}`);
        setRank(sum);
      } catch (e) {
        console.warn("Fehler beim Laden:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Async speichern
  const onWorkoutChange = async (newVal) => {
    setWorkoutPickerValue(newVal);
    adjustDaysRequired(newVal);
    try {
      await Storage.setItemAsync("Trainingsplan", newVal);
    } catch (e) {
      console.warn("Fehler beim Speichern: ", e);
    }
  };

  // Modal umschalten
  const toggleModal = () => setModalVisible(!isModalVisible);

  async function saveNameToStorage() {
    try {
      await Storage.setItemAsync("name", name);
    } catch (e) {
      console.warn("Fehler beim Speichern: ", e);
    }
  }

  // Solange geladen wird → Spinner
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Sobald geladen → ganzer Screen
  return (
    <View style={styles.container}>
      {/* Oberer Bereich: Profil */}
      <View style={styles.profileContainer}>
        <View style={styles.rowSpace}>
          <Text style={{ marginRight: 15, color: "white", fontSize: 16 }}>
            {name}
          </Text>
          <Pressable onPress={toggleModal}>
            <Ionicons name="create-outline" size={18} color="white" />
          </Pressable>
        </View>

        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Namen ändern:</Text>
            <MyTextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <View style={{ marginTop: 30 }}>
              <Button
                title="Fertig"
                onPress={() => {
                  toggleModal();
                  saveNameToStorage();
                }}
                color={colors.primary}
              />
            </View>
          </View>
        </Modal>

        <Text
          style={{
            marginTop: 20,
            marginBottom: 20,
            color: "white",
            fontSize: 16,
          }}
        >
          Gesamt-Level{" "}
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{rank}</Text>
        </Text>
        <Pressable onPress={() => props.navigation.navigate("AbzeichenScreen")}>
          <View style={styles.rowSpace2}>
            <Text style={{ color: "white", fontSize: 16 }}>Abzeichen 🏅</Text>
            <Ionicons name="arrow-forward-outline" size={20} color="white" />
          </View>
        </Pressable>
      </View>

      {/* Unterer Bereich: Einstellungen */}
      <View style={styles.settingsContainer}>
        <Text style={styles.headline}>Einstellungen</Text>

        {/*<TextSwitch
          text="Trainingserinnerung"
          value={notification}
          onValueChange={setNotification}
        />

        {notification && (
          <View style={styles.notificationBox}>
            <MyTimePicker />
          </View>
        )}*/}
        <Text style={{ fontSize: 16, marginBottom: 15 }}>Trainingsplan:</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={workoutPickerValue}
            onValueChange={onWorkoutChange}
            mode="dialog"
          >
            <Picker.Item
              label="Wähle dein Workout aus"
              value="keinPlanAusgewählt"
              enabled={false}
              //color={colors.primary}//leider buggy
            />
            <Picker.Item label="Anfänger" value="Anfänger" />
            <Picker.Item label="Fortgeschritten" value="Fortgeschritten" />
            <Picker.Item label="Profi" value="Profi" />
          </Picker>
        </View>

        <Text style={{ fontSize: 16 }}>Trainingstage:</Text>
        <DayPicker
          workoutPickerValue={workoutPickerValue}
          daysRequired={daysRequired}
          trainingDays={trainingDays}
        />
      </View>

      <Pressable onPress={() => props.navigation.navigate("TestingScreen")}>
        <Text style={styles.smallLink}>Zum Testbereich</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  rowSpace: {
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
  },
  rowSpace2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    height: deviceHeight * 0.1,
    width: deviceWidth * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
  },
  modal: {
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  headline: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
  },
  settingsContainer: {
    marginTop: deviceHeight * 0.1,
  },
  notificationBox: {
    marginBottom: 20,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.third,
    marginBottom: 20,
  },
  smallLink: {
    marginTop: 50,
    fontSize: 10,
    color: "gray",
  },
});

/*<Pressable onPress={toggleModal}>
            <View style={styles.avatar}>
              <Ionicons name="person-circle-outline" size={64} />
            </View>
          </Pressable>*/
