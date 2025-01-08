import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

// Resolve the absolute path to the database file
const dbPath = path.resolve("/tmp/inventory.db");

// Ensure the directory for the database file exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
    process.exit(1);
  }
  console.log("Connected to the SQLite database.");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      quantity INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT,
      password TEXT,
      role TEXT
    )
  `);

  db.run(`
    INSERT INTO users (id, name, email, password, role)
    VALUES (?, ?, ?, ?, ?)
  `, [
    1,
    "admin",
    "admin@mail.com",
    "$2b$10$lkOu03GOh2bSTVZpnKeutu84M7p0CrSrnCaG2108H/VKbdUlJf9KW",
    "admin"
  ]);
});

db.close(() => {
  console.log("Database initialized and seeded!");
});
