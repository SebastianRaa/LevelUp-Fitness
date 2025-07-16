import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import colors from "../colors";
import { Picker } from "@react-native-picker/picker";
import Storage from "expo-sqlite/kv-store";
import DayPickerVariant from "../components/dayPickerVariant";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({ onDone }) {
  const [idx, setIdx] = useState(0);
  const listRef = useRef(null);
  const [workoutPickerValue, setWorkoutPickerValue] =
    useState("keinPlanAusgewählt");
  const [daysRequired, setDaysRequired] = useState(2);
  const [trainingDays, setTrainingDays] = useState([]);

  // Async speichern
  const onWorkoutChange = async (newVal) => {
    setWorkoutPickerValue(newVal);
    adjustDaysRequired(newVal);
    try {
      await Storage.setItemAsync("Trainingsplan", newVal);
    } catch (e) {
      console.warn("Fehler beim Speichern: ", e);
    }
  };

  // prüft, ob der Next-Button enabled sein soll
  const canGoNext = () => {
    // auf Slide 3 (idx===2) muss ein Plan gewählt sein:
    if (idx === 2 && workoutPickerValue === "keinPlanAusgewählt") {
      return false;
    }
    // auf Slide 4 (idx===3) müssen genau daysRequired Tage bestehen:
    if (idx === 3 && trainingDays.length !== daysRequired) {
      return false;
    }
    return true;
  };

  // Helper: Anzahl Trainingstage anpassen
  const adjustDaysRequired = (val) => {
    if (val === "Anfänger") setDaysRequired(2);
    else if (val === "Fortgeschritten") setDaysRequired(3);
    else if (val === "Profi") setDaysRequired(6);
  };

  const goToIndex = (newIndex) => {
    if (!listRef.current) return;
    listRef.current.scrollToIndex({ index: newIndex, animated: true });
    setIdx(newIndex);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      {/*<Image source={item.image} style={styles.image} />*/}
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.textBox}>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      {item.bonus && item.bonus}
    </View>
  );

  const SLIDES = [
    {
      key: "1",
      title: "LevelUp Fitness",
      image: require("../../assets/images/react-logo.png"),
      description: `Hi! Diese App nutzt ein algorithmisches Konzept zum Trainieren. Dabei gibt es 6 Grundübungen, die auf 10 verschiedenen Levels durchgeführt werden:
      
  Pushups
  Squats
  Pullups
  Leg Raises
  Bridges
  Handstand Pushups
  
Umso höher das Level der Übung, desto schwieriger wird diese. Wir empfehlen dir, bei jeder Übung auf Level 1 anzufangen und dich dann hochzuarbeiten.`,
    },
    {
      key: "2",
      title: "LevelUp Fitness",
      image: require("../../assets/images/react-logo.png"),
      description: `Wir geben dir immer Empfehlungen für dein nächstes Training, aber letztendlich kannst du selbst entscheiden wie du trainierst.
  
Wenn du mit dem Training fertig bist, kannst du es im Home Bildschirm eintragen.

Weitere Informationen, z.B. wie die Übungen durchzuführen sind oder wie das Trainingskonzept genau funktioniert, findest du in der App.`,
    },
    {
      key: "3",
      title: "LevelUp Fitness",
      image: require("../../assets/images/react-logo.png"),
      description:
        "Die Übungsauswahl ist für alle Trainingspläne gleich, außer dass beim Anfänger Plan erstmal nur 4 der 6 Grundübungen trainiert werden.",
      bonus: (
        <View style={styles.picker}>
          <Picker
            selectedValue={workoutPickerValue}
            onValueChange={onWorkoutChange}
          >
            <Picker.Item
              label="Wähle dein Workout aus"
              value="keinPlanAusgewählt"
              enabled={false}
            />
            <Picker.Item label="Anfänger" value="Anfänger" />
            <Picker.Item label="Fortgeschritten" value="Fortgeschritten" />
            <Picker.Item label="Profi" value="Profi" />
          </Picker>
        </View>
      ),
    },
    {
      key: "4",
      title: "LevelUp Fitness",
      image: require("../../assets/images/react-logo.png"),
      description: "Wähle deine Trainingstage: ",
      bonus: (
        <DayPickerVariant
          workoutPickerValue={workoutPickerValue}
          daysRequired={daysRequired}
          selectedDays={trainingDays}
          onChangeSelectedDays={setTrainingDays}
        />
      ),
    },
    {
      key: "5",
      title: "LevelUp Fitness",
      image: require("../../assets/images/react-logo.png"),
      description: "Na dann mal los!",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onMomentumScrollEnd={(ev) => {
          const page = Math.round(ev.nativeEvent.contentOffset.x / width);
          setIdx(page);
        }}
      />

      {/* Zurück-Button */}
      {idx > 0 && (
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => goToIndex(idx - 1)}
        >
          <Text style={styles.buttonText}>Zurück</Text>
        </TouchableOpacity>
      )}

      {/* Weiter / Fertig */}
      <TouchableOpacity
        style={[
          styles.button,
          styles.nextButton,
          { opacity: canGoNext() ? 1 : 0.5 },
        ]}
        disabled={!canGoNext()}
        onPress={() => {
          if (idx === SLIDES.length - 1) onDone();
          else goToIndex(idx + 1);
        }}
      >
        <Text style={styles.buttonText}>
          {idx === SLIDES.length - 1 ? "Fertig" : "Weiter"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slide: {
    width: width,
    padding: 20,
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: "contain",
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  textBox: { alignContent: "center", justifyContent: "center" },
  description: {
    fontSize: 16,
    lineHeight: 24,
    alignSelf: "center",
  },
  button: {
    position: "absolute",
    bottom: 40,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  backButton: {
    left: 20,
  },
  nextButton: {
    right: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.third,
    marginBottom: 20,
    marginTop: 30,
  },
});
