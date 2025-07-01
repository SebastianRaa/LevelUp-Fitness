import { View, Text } from "react-native";
import React, { useState } from "react";

// each abzeichen has a title, an icon, an description, and a state, whether it has been achieved or not
// popup opens on click on icon and shows name and description

const Abzeichen = (props) => {
  const [isAchieved, setIsAchieved] = useState(false);
  return (
    <View>
      <Text>{props.title ? props.title : "Abzeichen"}</Text>
    </View>
  );
};

export default Abzeichen;
