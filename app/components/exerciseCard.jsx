import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  Dimensions,
} from "react-native";
import React from "react";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

//Card for displaying the 6 basic exercises, will lead to new screen on press
function ExerciseCard(props) {
  return (
    <View>
      <Pressable
        onPress={() =>
          props.navigation.navigate(props.navigationTarget, props.exercise)
        }
        style={styles.pressable}
      >
        <View style={styles.card}>
          <Text style={styles.cardText}>{props.title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderColor: "black",
    //borderWidth: 1,
    backgroundColor: "white",
    marginBottom: 20,
    boxShadow: "5px 5px 10px 1px #000000",
    width: deviceWidth * 0.8,
    height: deviceHeight * 0.05,
    //alignItems: "flex-start",
    //justifyContent: "center",
  },
  cardText: {
    fontWeight: "medium",
    fontSize: 18,
    paddingTop: deviceHeight * 0.01,
    paddingLeft: deviceWidth * 0.01,
  },
  pressable: {},
});

export default ExerciseCard;
