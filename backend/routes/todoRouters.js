import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos');
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

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const updateTodo = db.prepare('UPDATE todos SET status = ? WHERE id = ?');
    const result = updateTodo.run(String(status), id);

    if (result.changes === 0) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    const updatedTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
    res.json(updatedTodo);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    const deleteTodo = db.prepare('DELETE FROM todos WHERE id = ?');
    const result = deleteTodo.run(id);
    
    if (result.changes === 0) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.status(204).send();
});

export default router;