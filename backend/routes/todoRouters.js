import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
    const { userId } = req.query;
    
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
    const todos = getTodos.all(userId);
    res.json(todos);
});

router.post('/', (req, res) => {
    const { name, status, userId } = req.body;
    
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const statusStr = String(status || "0");
    const insertTodo = db.prepare('INSERT INTO todos (name, status, user_id) VALUES (?, ?, ?)');
    const result = insertTodo.run(name, statusStr, userId);

    const newTodo = db.prepare('SELECT * FROM todos WHERE id = ? AND user_id = ?').get(result.lastInsertRowid, userId);
    res.status(201).json(newTodo);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { status, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const updateTodo = db.prepare('UPDATE todos SET status = ? WHERE id = ? AND user_id = ?');
    const result = updateTodo.run(String(status), id, userId);

    if (result.changes === 0) {
        return res.status(404).json({ error: 'Todo not found or unauthorized' });
    }

    const updatedTodo = db.prepare('SELECT * FROM todos WHERE id = ? AND user_id = ?').get(id, userId);
    res.json(updatedTodo);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const deleteTodo = db.prepare('DELETE FROM todos WHERE id = ? AND user_id = ?');
    const result = deleteTodo.run(id, userId);
    
    if (result.changes === 0) {
        return res.status(404).json({ error: 'Todo not found or unauthorized' });
    }
    
    res.status(204).send();
});

export default router;