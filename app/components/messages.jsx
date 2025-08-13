const positiveMessages = [
  "Weiter so!",
  "Super gemacht!",
  "Tolle Leistung!",
  "Hervorragend!",
  "Starkes Workout!",
  "Jede Wiederholung zählt!",
  "Gute Arbeit!",
  "Spitze, dranbleiben!",
  "Starkes Training!",
  "Immer so weitermachen!",
];

const emojis = ["😀", "😁", "💯", "💪", "🏋", "🤸", "🌟", "🔥", "🆒", "👑"];

const levelUpEmojis = ["🚀", "🚀", "🏆", "🥇", "🏅"];

function getRandomInt(min, max) {
  // liefert eine ganze Zahl zwischen min und max (beide inklusiv)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomPositiveMessage() {
  return (
    positiveMessages[getRandomInt(0, 9)] + " " + emojis[getRandomInt(0, 9)]
  );
}

export function getRandomLevelUpEmoji() {
  return levelUpEmojis[getRandomInt(0, 4)];
}

//hier mit "n" hinten
export function getGermanName(exercise) {
  if (exercise == "pushups") {
    return "Liegestützen";
  } else if (exercise == "squats") {
    return "Kniebeugen";
  } else if (exercise == "pullups") {
    return "Klimmzügen";
  } else if (exercise == "leg_raises") {
    return "Beinhebern";
  } else if (exercise == "bridges") {
    return "Brücken";
  } else if (exercise == "handstand_pushups") {
    return "Handstand Liegestützen";
  } else {
    return "Fehler";
  }
}
