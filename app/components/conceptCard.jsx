import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  Dimensions,
} from "react-native";
import React from "react";
import colors from "../colors";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

//Card for displaying the 4 concepts, will lead to new screen on press
function ConceptCard(props) {
  return (
    <View>
      <Pressable
        onPress={() => props.navigation.navigate(props.navigationTarget)}
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
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: "white",
    marginBottom: 20,
    elevation: 2,
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

export default ConceptCard;
