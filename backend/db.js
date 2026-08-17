import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("database.sqlite");

db.exec(`
    CREATE TABLE todos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        status TEXT
    )
`);

export default db;
