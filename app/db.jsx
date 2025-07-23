import * as SQLite from "expo-sqlite";

function getRandomInt(min, max) {
  // liefert eine ganze Zahl zwischen min und max (beide inklusiv)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// SQLite.openDatabase cached intern immer dieselbe Instanz
const db = SQLite.openDatabaseSync("training.db");

export function initDb() {
  console.log("initDb starting");
  db.runSync(`CREATE TABLE IF NOT EXISTS trainings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    datestring TEXT,
    baseExercise INTEGER,
    level INTEGER,
    work1_rep TEXT,
    work2_rep TEXT,
    work3_rep TEXT,
    work4_rep TEXT,
    work5_rep TEXT,
    work6_rep TEXT,
    warmup1_level TEXT,
    warmup1_rep TEXT,
    warmup2_level TEXT,
    warmup2_rep TEXT,
    warmup3_level TEXT,
    warmup3_rep TEXT,
    warmup4_level TEXT,
    warmup4_rep TEXT,
    warmup5_level TEXT,
    warmup5_rep TEXT,
    warmup6_level TEXT,
    warmup6_rep TEXT
);`);

  const randomExerciseAdd = getRandomInt(1, 6);
  let baseExercise = "handstand_pushups";
  if (randomExerciseAdd == 1) baseExercise = "pushups";
  if (randomExerciseAdd == 2) baseExercise = "squats";
  if (randomExerciseAdd == 3) baseExercise = "pullups";
  if (randomExerciseAdd == 4) baseExercise = "leg_raises";
  if (randomExerciseAdd == 5) baseExercise = "bridges";

  const result = db.runSync(
    "INSERT INTO trainings (datestring, baseExercise, level, work1_rep, work2_rep, work3_rep) VALUES (?, ?, ?, ?, ?, ?)",
    new Date().toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    baseExercise,
    getRandomInt(1, 10),
    getRandomInt(5, 30),
    getRandomInt(5, 30),
    getRandomInt(5, 30)
  );
  console.log(result.lastInsertRowId, result.changes);
}

export default db;
