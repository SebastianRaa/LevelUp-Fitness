import React, {
  useState,
  useImperativeHandle,
  useEffect,
  forwardRef,
} from "react";
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
import colors from "../colors";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";

const ExerciseListModal = ({ navigation, day }, ref) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useImperativeHandle(ref, () => ({
    toggleModal,
  }));
  /*Übungen vom {day.day.toString().length == 2 ? day.day : "0" + day.day}
          .{day.month.toString().length == 2 ? day.month : "0" + day.month}.
          {day.year}*/
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          padding: 16,
        }}
      >
        <Pressable onPress={() => toggleModal()}>
          <Ionicons name="close-outline" />
        </Pressable>
        <Text style={styles.heading}>
          Übungen vom {day}
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
        <View style={styles.group}>
          <Pressable onPress={() => navigation.navigate("ExerciseEntryScreen")}>
            <Text>Liegestütze</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              Alert.alert("Eintrag löschen", "Diese Übung wird gelöscht.", [
                { text: "Abbruch" },
                { text: "Löschen" },
              ])
            }
          >
            <Ionicons name="trash-outline" />
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            borderRadius: 10,
            width: "50%",
            alignSelf: "center",
          }}
        >
          <Button
            title="Hinzufügen"
            onPress={() => navigation.navigate("ExerciseEntryScreen")}
          />
        </View>
      </View>
    </Modal>
  );
};

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

export default forwardRef(ExerciseListModal);
