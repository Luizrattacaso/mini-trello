import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("database.sqlite");

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    );

    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        status TEXT,
        user_id INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
`);

export default db;