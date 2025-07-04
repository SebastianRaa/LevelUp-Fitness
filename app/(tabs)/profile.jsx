import {
  View,
  Text,
  Switch,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  Alert,
  Animated,
  useAnimatedValue,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import TextSwitch from "../components/textSwitch";
import DayPicker from "../components/dayPicker";
import WorkoutPicker from "../components/workoutPicker";
import MyTextInput from "../components/myTextInput";
import MyButton from "../components/myButton";
import { MyTimePicker } from "../components/myTimePicker";
import colors from "../colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const createButtonAlert = () =>
  Alert.alert("Congratulations!", "You Leveled Up!", [
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);

//Tab 4
function Profile(props) {
  const [name, setName] = useState("Max Mustermann");
  const fadeAnim = useAnimatedValue(0);
  const [notification, setNotification] = useState(false);
  const [workoutPickerValue, setWorkoutPickerValue] = useState("New Blood");
  const [daysRequired, setDaysRequired] = useState(2);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const adjustDaysRequired = (newVal) => {
    console.log("this is adjustDaysRequired " + newVal);
    if (newVal == "New Blood") {
      setDaysRequired(2);
    } else if (newVal == "Good Behaviour") {
      setDaysRequired(3);
    } else if (newVal == "Veterano") {
      setDaysRequired(6);
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/*Upper part: Profile*/}
      <View style={styles.profileContainer}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-between",
            //backgroundColor: "lightgreen",
          }}
        >
          <Pressable onPress={() => toggleModal()}>
            <Text style={{}}>{name}</Text>
          </Pressable>
          <Pressable onPress={() => toggleModal()}>
            <View style={styles.avatar}>
              <Ionicons name="person-circle-outline" size={64} />
            </View>
          </Pressable>
        </View>
        <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
          <View
            style={{
              backgroundColor: "white",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ marginTop: 30, marginBottom: 30 }}>
              Namen ändern:
            </Text>
            <MyTextInput
              placeholder={"Name"}
              value={name}
              onChangeText={(newVal) => setName(newVal)}
            />
            <View style={{ marginTop: 30, marginBottom: 30 }}>
              <Button title="Fertig" onPress={toggleModal} />
            </View>
          </View>
        </Modal>
        <Text>Rang 1</Text>
        <Pressable onPress={() => props.navigation.navigate("AbzeichenScreen")}>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            <Text>Abzeichen</Text>
            <Ionicons
              name={"arrow-forward-outline"}
              size={20}
              color={"black"}
            />
          </View>
        </Pressable>
      </View>
      {/*Lower part: Einstellungen*/}
      <View style={styles.settingsContainer}>
        <Text style={styles.headline}>Einstellungen</Text>

        <TextSwitch
          text={"Trainingserinnerung"}
          value={notification}
          onValueChange={(newVal) => setNotification(newVal)}
        />

        {notification ? (
          <View style={styles.notificationBox}>
            <MyTimePicker />
          </View>
        ) : (
          ""
        )}

        <WorkoutPicker
          value={workoutPickerValue}
          onValueChange={(newVal) => {
            setWorkoutPickerValue(newVal);
            adjustDaysRequired(newVal);
          }}
          daysRequired={daysRequired}
        />
        <Text style={{ paddingLeft: 20 }}>Trainingstage:</Text>
        <DayPicker daysRequired={daysRequired} />
      </View>
      <Pressable onPress={() => props.navigation.navigate("TestingScreen")}>
        <Text style={{ marginTop: 100, fontSize: 10 }}>Zum Testbereich</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    //flex: 1,
    height: deviceHeight * 0.1,
    width: deviceWidth * 0.2,
    //backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBox: {},
  headline: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    backgroundColor: "lightblue",
    borderRadius: 10,
  },
  settingsContainer: { paddingTop: deviceHeight * 0.1 },
  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue",
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
});

export default Profile;
/**/
/*<MyButton /><Button
        title="GO TO TRAINING"
        onPress={() => navigation.navigate("Training")}
      ></Button>
      <Button title={"Alert Button"} onPress={createButtonAlert} />

      <Animated.View
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.fadingText}>Fading View!</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="Fade In View" onPress={fadeIn} />
        <Button title="Fade Out View" onPress={fadeOut} />
      </View>*/
/*{fadeAnim === useAnimatedValue(0) ? (
        <View>
          <Text>Hi</Text>
        </View>
      ) : (
        <View>
          <Text>Hello There</Text>
        </View>
      )}*/
