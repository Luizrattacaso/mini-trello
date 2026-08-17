import express from 'express'
import db from '../db.js'

const router = express.Router();

router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos')
    res.json(getTodos.all());
});

router.post('/', (req, res) => {
    const { name, status } = req.body;
    const statusStr = String(status || "0");

    const insertTodo = db.prepare('INSERT INTO todos (name, status) VALUES (?, ?)');
    const result = insertTodo.run(name, statusStr);

    const newTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newTodo);
});

router.delete('/', (req, res) => {
    const { id } = req.body
    const deleteTodo = db.prepare('DELETE FROM todos WHERE id = ?')
    const result = deleteTodo.run(id)
    if (result.changes === 0) {
        return res.status(404).json({ error: 'Todo not found' })
    }
    res.status(204).send()
});

export default router