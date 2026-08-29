import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("database.sqlite");

db.exec(`
    CREATE TABLE IF NOT EXISTS todos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        status TEXT
    )
`);

export default db;