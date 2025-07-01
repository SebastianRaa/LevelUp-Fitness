import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import colors from "../colors";

//Button with styling fitting to app
export default function MyButton() {
  return (
    <View style={styles.container}>
      <Button
        title="Button"
        onPress={() => console.log("Simple Button pressed")}
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
