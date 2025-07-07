import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import React from "react";
import ExerciseCard from "../components/exerciseCard";
import ConceptCard from "../components/conceptCard";
import pushups from "../data/exercises/pushups.js";
import pullups from "../data/exercises/pullups.js";
import bridges from "../data/exercises/bridges.js";
import legraises from "../data/exercises/legraises.js";
import squats from "../data/exercises/squats.js";
import handstandpushups from "../data/exercises/handstandpushups.js";
import trainingsconcept from "../data/concepts/trainingsconcept.js";
import warmup from "../data/concepts/warmup.js";
import trainingsplaene from "../data/concepts/trainingsplaene.js";
import trainingsempfehlung from "../data/concepts/trainingsempfehlung.js";
import colors from "../colors";

//Tab 3
function Knowledge({ navigation }) {
  console.log(pushups.level1);
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={styles.headline}>Trainingskonzept</Text>
        <ConceptCard
          title="Trainingskonzept"
          navigation={navigation}
          navigationTarget={"TrainingsconceptScreen"}
          concept={trainingsconcept}
        />
        <ConceptCard
          title="Trainingspläne"
          navigation={navigation}
          navigationTarget={"TrainingsplaeneScreen"}
          concept={trainingsplaene}
        />
        <ConceptCard
          title="Trainingsempfehlungen"
          navigation={navigation}
          navigationTarget={"TrainingsempfehlungScreen"}
          concept={trainingsempfehlung}
        />
        <ConceptCard
          title="Warm-up"
          navigation={navigation}
          navigationTarget={"WarmupScreen"}
          concept={warmup}
        />
      </View>

      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={styles.headline}>Übungen</Text>
        <ExerciseCard
          title="Liegestütze"
          navigation={navigation}
          navigationTarget={"PushupScreen"}
          exercise={pushups}
        ></ExerciseCard>
        <ExerciseCard
          title="Kniebeuge"
          navigation={navigation}
          navigationTarget={"SquatScreen"}
          exercise={squats}
        ></ExerciseCard>
        <ExerciseCard
          title="Klimmzüge"
          navigation={navigation}
          navigationTarget={"PullupScreen"}
          exercise={pullups}
        ></ExerciseCard>
        <ExerciseCard
          title="Beinheber"
          navigation={navigation}
          navigationTarget={"LegraiseScreen"}
          exercise={legraises}
        ></ExerciseCard>
        <ExerciseCard
          title="Brücken"
          navigation={navigation}
          navigationTarget={"BridgeScreen"}
          exercise={bridges}
        ></ExerciseCard>
        <ExerciseCard
          title="Handstand Liegestütze"
          navigation={navigation}
          navigationTarget={"HandstandpushupScreen"}
          exercise={handstandpushups}
        ></ExerciseCard>
      </View>
      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headline: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Knowledge;

/*

<ExerciseCard title="Convict Conditioning" navigation={navigation}></ExerciseCard>
      
      <ExerciseCard title="Übung 4" navigation={navigation}></ExerciseCard>
      <ExerciseCard title="Übung 5" navigation={navigation}></ExerciseCard>
      <ExerciseCard title="Übung 6" navigation={navigation}></ExerciseCard>
      <ExerciseCard title="Übung 6" navigation={navigation}></ExerciseCard>
      <ExerciseCard title="Übung 6" navigation={navigation}></ExerciseCard>
      <ExerciseCard title="Übung 6" navigation={navigation}></ExerciseCard>
      <ExerciseCard title="Übung 6" navigation={navigation}></ExerciseCard>

      */
