import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import React, {
  useState,
  useImperativeHandle,
  useEffect,
  forwardRef,
} from "react";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import colors from "../colors";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

//Besteht aus: Grundübungsauswahl, Warm-up 1 (Anzahl + Level) + Warm-up 2 (Anzahl + Level), Work-out 1-3 (Anzahl 3x, Level 1x)
// Muss erweiterbar oder löschbar sein: Man kann Sätze hinzufügen oder rausnehmen, alles optional

//Bereich 1 Grundübung
//Bereich 2 Warm-up
//Bereich 3 Work

//->ScrollView im Modal?

const exerciseModal = (props, ref) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [grunduebung, setGrunduebung] = useState(1);
  const [level, setLevel] = useState(1);
  const [value, setValue] = useState("");

  const onChangeText = (text) => {
    // Nur Ziffern erlauben
    const digitsOnly = text.replace(/[^0-9]/g, "");
    // Maximal 4 Ziffern
    setValue(digitsOnly.slice(0, 4));
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useImperativeHandle(ref, () => ({
    toggleModal,
  }));

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
      <View style={styles.modalBackground}>
        <Text>Übungseintragung</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={grunduebung}
            onValueChange={(newVal, itemIndex) => setGrunduebung(newVal)}
          >
            <Picker.Item
              label="Wähle eine Grundübung aus"
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
        <Text>Warm-up</Text>
        <View style={styles.group}>
          <View style={styles.picker}>
            <Picker
              selectedValue={level}
              onValueChange={(newVal, itemIndex) => setLevel(newVal)}
            >
              <Picker.Item
                label="Wähle ein Level aus"
                value={0}
                enabled={false}
              />
              <Picker.Item label="1" value={1} />
              <Picker.Item label="2" value={2} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="4" value={4} />
              <Picker.Item label="5" value={5} />
              <Picker.Item label="6" value={6} />
              <Picker.Item label="7" value={7} />
              <Picker.Item label="8" value={8} />
              <Picker.Item label="9" value={9} />
              <Picker.Item label="10" value={10} />
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            keyboardType="numeric"
            maxLength={4}
            //placeholder="0000"
          />
        </View>
        <Text>Arbeitssätze</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 0.8,
  },
  group: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  picker: {
    //backgroundColor: "blue",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.third,
    marginBottom: 20,
    marginLeft: "10%",
    width: "60%",
  },
  input: {
    height: 40,
    width: 80, // schmales Feld
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    textAlign: "center",
    fontSize: 18,
  },
});

export default forwardRef(exerciseModal);
