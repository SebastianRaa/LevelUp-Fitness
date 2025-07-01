import { View, Text, Switch } from "react-native";
import React, { useState } from "react";

//Switch with text in the same row
function TextSwitch({ text, value, onValueChange }) {
  const [isNew, setIsNew] = useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      <Text>{text}</Text>
      <Switch value={value} onValueChange={onValueChange}></Switch>
    </View>
  );
}

export default TextSwitch;
