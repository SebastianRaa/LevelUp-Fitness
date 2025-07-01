import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import colors from "../colors";

//TextInput with custom styling
export default function MyTextInput({ placeholder, value, onChangeText }) {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      onChange={console.log(value)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
    backgroundColor: "white",
    width: "50%",
  },
});
