import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "User and password are required." });
  }

  try {
    const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    const result = stmt.run(username, password);

    res.status(201).json({ message: "User registered successfully!", userId: result.lastInsertRowid });
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return res.status(400).json({ message: "This username is already in use." });
    }
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "User and password are required." });
  }

  try {
    const stmt = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    const user = stmt.get(username, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    res.json({ 
      message: "Login successful!", 
      user: { id: user.id, username: user.username } 
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;