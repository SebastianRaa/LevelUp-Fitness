import React, { useState, useImperativeHandle, forwardRef } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";

const AbzeichenModal = (props, ref) => {
  const [isModalVisible, setModalVisible] = useState(false);

  // die Imperative-Handle-API auf den echten `ref` anwenden
  useImperativeHandle(ref, () => ({
    toggleModal: () => setModalVisible((v) => !v),
  }));

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={styles.modal}>
        <Pressable onPress={() => setModalVisible(false)}>
          <Ionicons name="close-outline" />
        </Pressable>
        <Text style={styles.heading}>{props.title}</Text>
        <Text style={{ marginBottom: 10, alignSelf: "center" }}>
          {props.description}
        </Text>
      </View>
    </Modal>
  );
};

// forwardRef umschließt deine Komponente und gibt dir `ref` als 2. Parameter
export default forwardRef(AbzeichenModal);

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    margin: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
});
