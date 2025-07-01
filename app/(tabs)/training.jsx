import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import Ansicht1 from "../components/ansicht1";
import Ansicht2 from "../components/ansicht2";
import Ansicht3 from "../components/ansicht3";

//Tab 2 mit 3 verschiedenen Ansichten
const Training = (props) => {
  const [selectedAnsicht, setSelectedAnsicht] = useState(1);

  //render content based on selected "Ansicht"
  const renderSwitch = () => {
    if (selectedAnsicht == 1) {
      return <Ansicht1 />;
    } else if (selectedAnsicht == 2) {
      return <Ansicht2 />;
    } else {
      return <Ansicht3 />;
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.blabliblu}>{renderSwitch()}</View>

      <View style={styles.ansichtwechsel}>
        <View>
          <Pressable onPress={() => setSelectedAnsicht(1)}>
            <View
              style={
                selectedAnsicht == 1 ? styles.activated : styles.notactivated
              }
            >
              <Text>1</Text>
            </View>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => setSelectedAnsicht(2)}>
            <View
              style={
                selectedAnsicht == 2 ? styles.activated : styles.notactivated
              }
            >
              <Text>2</Text>
            </View>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => setSelectedAnsicht(3)}>
            <View
              style={
                selectedAnsicht == 3 ? styles.activated : styles.notactivated
              }
            >
              <Text>3</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    marginTop: 10,
    //backgroundColor: "pink",
    flex: 1,
    //flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "space-between",
  },
  blabliblu: {
    alignItems: "center",
  },
  ansichtwechsel: {
    //flex: 0.1,
    position: "absolute",
    //left: 130,
    bottom: 10,
    left: 0,
    right: 0,
    //display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    //backgroundColor: "lightblue",
    //alignItems: "center",
  },

  notactivated: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  activated: {
    padding: 10,
    backgroundColor: "lightgrey",
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Training;
