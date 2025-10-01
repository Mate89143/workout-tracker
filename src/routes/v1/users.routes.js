const express = require('express');
const router = express.Router();

// Estado de memoria (simulación)
let users = [
    {
        id: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    name: "Carlos Navia",
    email: "carlos@example.com",
    role: "user",
    createdAt: "2025-09-12T12:00:00Z"
    }
];

// GET /api/v1/users
router.get('/', (req, res) => {
    res.status(200).json(users);
});

module.exports = router;

// GET /users/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
});

module.exports = router;

// POST /users
router.post('/', (req, res) => {
    const { name, email, role } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name y email son requeridos' });
    }

    const newUser = {
        id: `${Date.now()}`, // identificador temporal
        name,
        email,
        role: role || 'user', // valor por defecto si no envian rol
        createdAt: new Date().toISOString()
    };

    users.push(newUser); // 4

    res.status(201).json(newUser); // 5
});
