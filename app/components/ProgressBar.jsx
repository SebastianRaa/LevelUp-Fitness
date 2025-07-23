import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import colors from "../colors";

//component used to display the level of the 6 basic exercises
//props: fillWidth, label
const ProgressBar = (props) => {
  const deviceWidth = Dimensions.get("window").width;
  const maxBarWidth = 250;
  const containerPaddingHorizontal = 20; // optional padding for container
  const barWidth = deviceWidth < maxBarWidth ? deviceWidth * 0.9 : maxBarWidth;
  const fillWidth = (props.fillWidth / 10) * barWidth;

  const stripesCount = 9; // stripes at 10%, 20%, ..., 90%
  const allStripesPositions = Array.from(
    { length: stripesCount },
    (_, i) => (i + 1) * 0.1 * barWidth
  );

  // Filter stripes only in unfilled area (right side after fillWidth)
  const stripesVisible = allStripesPositions.filter((pos) => pos > fillWidth);

  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <View
        style={[
          styles.container,
          { paddingHorizontal: containerPaddingHorizontal },
        ]}
      >
        <View style={[styles.progressBar, { width: barWidth }]}>
          <View style={[styles.progressBarFill, { width: fillWidth }]} />
          <View style={[styles.stripesContainer, { width: barWidth }]}>
            {stripesVisible.map((leftPos, index) => (
              <View
                key={index}
                style={[styles.stripe, { left: leftPos - 0.5 }]}
              />
            ))}
          </View>
        </View>
        <Text style={styles.percentageText}>{props.fillWidth}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Horizontal layout for bar + text
    alignItems: "center", // Vertically center items
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
  },
  progressBar: {
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    //borderTopLeftRadius: 10,
    //borderBottomLeftRadius: 10,
  },
  stripesContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    pointerEvents: "none",
  },
  stripe: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: 1,
    backgroundColor: "#000",
  },
  percentageText: {
    marginLeft: 10, // space between bar and text
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    minWidth: 40, // fixed/min width to avoid layout jitter
    textAlign: "left",
  },
});

export default ProgressBar;
