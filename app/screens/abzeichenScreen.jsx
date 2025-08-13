import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useRef, useState, useEffect } from "react";
import AbzeichenModal from "../components/abzeichenModal";
import colors from "../colors";
import Storage from "expo-sqlite/kv-store";
import Ionicons from "react-native-vector-icons/Ionicons";
const GAP = 15;
const COLUMNS = 3;
const TOTAL_CHILDREN = 12;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Gesamt-Lücken in der Breite: links + rechts + zwischen den Spalten
const totalGapWidth = GAP * (COLUMNS + 1);

// Breite einer Zelle
const cellWidth = (SCREEN_WIDTH - totalGapWidth) / COLUMNS;

// Quadratische Zellen
const cellHeight = cellWidth;

//Screen für die Abzeichen
const images = {
  ClarityAirplaneLine: require("../../assets/images/abzeichen/ClarityAirplaneLine.png"),
  LineiconsRocket5: require("../../assets/images/abzeichen/LineiconsRocket5.png"),
  SolarUfo3Linear: require("../../assets/images/abzeichen/SolarUfo3Linear.png"),
  FluentFood16Regular: require("../../assets/images/abzeichen/FluentFood16Regular.png"),
  GameIconsAcrobatic: require("../../assets/images/abzeichen/GameIconsAcrobatic.png"),
  GameIconsConqueror: require("../../assets/images/abzeichen/GameIconsConqueror.png"),
  ArcticonsDragonTamer: require("../../assets/images/abzeichen/ArcticonsDragonTamer.png"),
  GameIconsSpikedDragonHead: require("../../assets/images/abzeichen/GameIconsSpikedDragonHead.png"),
  SimpleIconsRedragon: require("../../assets/images/abzeichen/SimpleIconsRedragon.png"),
  HugeiconsGymnastic: require("../../assets/images/abzeichen/HugeiconsGymnastic.png"),
  IconParkOutlineSport: require("../../assets/images/abzeichen/IconParkOutlineSport.png"),
  IonFitnessOutline: require("../../assets/images/abzeichen/IonFitnessOutline.png"),
};
const pngNamesArray = [
  "ClarityAirplaneLine.png",
  "LineiconsRocket5.png",
  "SolarUfo3Linear.png",
  "FluentFood16Regular.png",
  "GameIconsAcrobatic.png",
  "GameIconsConqueror.png",
  "ArcticonsDragonTamer.png",
  "GameIconsSpikedDragonHead.png",
  "SimpleIconsRedragon.png",
  "HugeiconsGymnastic.png",
  "IconParkOutlineSport.png",
  "IonFitnessOutline.png",
];

const abzeichenNamesArray = [
  "Neuling",
  "Adept",
  "Meister",
  "Hungrig auf mehr",
  "Akrobat",
  "Eroberer",
  "Drachenzähmer",
  "Drachenfreund",
  "Drachenmeister",
  "Immer weiter",
  "Ausdauer",
  "Training ist alles",
];

const abzeichenTextArray = [
  "Erreiche ein Gesamt-Level von 10.",
  "Erreiche ein Gesamt-Level von 30.",
  "Erreiche ein Gesamt-Level von 50.",
  "Erreiche Level 3 bei mindestens einer Grundübung.",
  "Erreiche Level 6 bei mindestens einer Grundübung.",
  "Erreiche Level 10 bei mindestens einer Grundübung.",
  "Erreiche Level 3 bei allen Grundübungen.",
  "Erreiche Level 6 bei allen Grundübungen.",
  "Erreiche Level 10 bei allen Grundübungen.",
  "Absolviere 10 Übungen.",
  "Absolviere 50 Übungen.",
  "Absolviere 100 Übungen.",
];

const colorsArray = [
  "#b3b3ff",
  "#80ffff",
  "#80ff80",
  "#ffad5bff",
  "#fdfd81ff",
  "#ff8080",
  "#668cff",
  "#00b300",
  "#a06decff",
  "#ec2323ff",
  "#fbeaff",
  "#ff66b3",
];

const AbzeichenScreen = ({ navigation }) => {
  const childRef = useRef(null);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let tmpDataArray = [];
        for (let i = 0; i < 12; i++) {
          tmpDataArray.push(await Storage.getItemAsync(`abzeichen${i}`));
        }
        setData(tmpDataArray);
      } catch (e) {
        console.warn("Fehler beim Laden:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onPressHandler = (idx) => {
    setModalData({
      title: abzeichenNamesArray[idx],
      description: abzeichenTextArray[idx],
    });
    childRef.current.toggleModal();
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ alignSelf: "flex-start", marginLeft: 10 }}
      >
        <Ionicons name="arrow-back" size={16} />
      </Pressable>
      <AbzeichenModal
        ref={childRef}
        title={modalData.title}
        description={modalData.description}
      />
      <Text style={styles.headline}>Abzeichen 🏅</Text>
      <View style={styles.container}>
        {pngNamesArray.map((fileName, idx) => {
          const key = fileName.replace(".png", "");
          const isLastInRow = (idx + 1) % COLUMNS === 0;
          return (
            <Pressable key={key} onPress={() => onPressHandler(idx)}>
              <View
                style={[
                  styles.cellcontainer,
                  { marginRight: isLastInRow ? 0 : GAP },
                ]}
              >
                <View
                  style={[
                    styles.cell,
                    {
                      //colorsArray[idx],
                      backgroundColor:
                        data[idx] == "1" ? colorsArray[idx] : colors.third,
                    },
                  ]}
                >
                  <Image
                    source={images[key]}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={{ marginBottom: GAP }}>
                  {abzeichenNamesArray[idx]}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    marginTop: 10,
  },
  headline: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  parent: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    // Außenabstand (Rundum)
    padding: GAP,
    // sorgt dafür, dass bei Zeilenumbrüchen der Abstand erhalten bleibt
    alignContent: "flex-start",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: GAP, // Außenabstand
    alignContent: "flex-start",
    //backgroundColor: "#fff",
  },
  cellcontainer: {
    width: cellWidth,
    height: cellHeight,
    marginBottom: GAP,
    alignItems: "center",
    //borderWidth: 1,
  },
  cell: {
    // Abstand nach unten
    borderRadius: 100,
    width: "80%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    //borderColor: "#FFD700",
  },
  icon: {
    // Bild skaliert auf 70 % der Zelle
    width: "80%",
    height: "80%",
  },
});

export default AbzeichenScreen;
