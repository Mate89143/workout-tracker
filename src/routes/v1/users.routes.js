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
