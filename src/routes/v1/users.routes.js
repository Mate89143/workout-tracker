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

    users.push(newUser); 

    res.status(201).json(newUser); 
});

// PUT /users/:id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (!name || !email) {
        return res.status(400).json({ error: 'Name y email son requeridos' });
    }

    users[index] = {
        ...users[index],
        name,
        email,
        role
    };

    res.status(200).json(users[index]);
});

module.exports = router;

// DELETE /users/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const deletedUser = users.splice(index, 1);
    res.status(200).json({ deleted: deletedUser[0].id });
});

module.exports = router;

// GET /users?role=user&search=Carlos
router.get('/', (req, res) => {
  const { role, search } = req.query;  // 1
  let result = users;                  // 2

  // Aplicar filtros de manera que se combinen correctamente
  if (role && search) {
    // Si hay ambos filtros, aplicar AND lógico
    result = result.filter(u => 
      u.role === role && 
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  } else if (role) {
    // Solo filtro por rol
    result = result.filter(u => u.role === role);
  } else if (search) {
    // Solo filtro por búsqueda
    result = result.filter(u => 
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  // Si no hay filtros, result mantiene todos los usuarios

  res.status(200).json(result);        // 5
});

module.exports = router;

