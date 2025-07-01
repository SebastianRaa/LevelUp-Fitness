import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../colors";

//unused
const MyCardHistory = () => {
  return (
    <View style={styles.container}>
      {/* First Row */}
      <Text style={styles.text}>KW31</Text>
      <Text style={styles.text}>KW32</Text>
      <Text style={styles.text}>KW33</Text>
      <Text style={styles.text}>KW34</Text>
      <Text style={styles.text}>KW35</Text>

      <Text style={styles.text2}>1</Text>
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />

      {/* Second Row */}
      <Text style={styles.text2}>2</Text>
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />

      {/* Third Row */}
      <Text style={styles.text2}>3</Text>
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    margin: 5,
  },
  text: {
    width: 60,
    height: 20,
    margin: 5,
    paddingLeft: 10,
    //backgroundColor: "red",
  },
  textLastInRow: {
    width: 60,
    height: 20,
    margin: 5,
    paddingLeft: 10,
    marginRight: 100,
    //backgroundColor: "red",
  },
  text2: {
    width: 20,
    height: 20,
    marginLeft: 50,
    //backgroundColor: "red",
  },
});

export default MyCardHistory;
