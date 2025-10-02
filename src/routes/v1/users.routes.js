const express = require('express');
const router = express.Router();

// GET - Estado en memoria
let users = [
  {
    id: "1",
    name: "Carlos Navia",
    email: "carlos@example.com",
    role: "user",
    createdAt: "2025-09-12T12:00:00Z"
  }
];

// ✅ UNA SOLA declaración de usersController
const usersController = {
  // GET - All users with advanced filtering
  getAllUsers: (req, res) => {
    const { role, search, limit, offset, sort } = req.query;
    let result = [...users];

    // Filtro por rol
    if (role) {
      const roles = role.split(',');
      result = result.filter(u => roles.includes(u.role));
    }

    // Búsqueda por nombre o email
    if (search) {
      result = result.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Ordenamiento
    if (sort) {
      const [field, order] = sort.split(':');
      result.sort((a, b) => {
        if (order === 'desc') {
          return b[field]?.localeCompare(a[field]);
        }
        return a[field]?.localeCompare(b[field]);
      });
    }

    // Paginación
    const startIndex = parseInt(offset) || 0;
    const endIndex = startIndex + (parseInt(limit) || result.length);
    const paginatedResult = result.slice(startIndex, endIndex);

    res.status(200).json({
      method: 'GET',
      data: paginatedResult,
      pagination: {
        total: result.length,
        limit: parseInt(limit) || result.length,
        offset: startIndex,
        hasMore: endIndex < result.length
      },
      filters: { role, search, sort }
    });
  },

  // GET - User by ID
  getUserById: (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);
    
    if (!user) {
      return res.status(404).json({ 
        method: 'GET',
        error: 'User not found' 
      });
    }
    
    res.status(200).json({
      method: 'GET',
      data: user
    });
  },

  // POST - Create new user
  createUser: (req, res) => {
    const { name, email, role } = req.body;

    // Validación básica
    if (!name || !email) {
      return res.status(400).json({ 
        method: 'POST',
        error: 'Name and email are required' 
      });
    }

    // Crear nuevo usuario
    const newUser = {
      id: `${Date.now()}`,
      name,
      email,
      role: role || 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    
    res.status(201).json({
      method: 'POST',
      message: 'User created successfully',
      data: newUser
    });
  },

  // PUT - Update entire user
  updateUser: (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    // Buscar usuario
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ 
        method: 'PUT',
        error: 'User not found' 
      });
    }

    // Validación
    if (!name || !email) {
      return res.status(400).json({ 
        method: 'PUT',
        error: 'Name and email are required for full update' 
      });
    }

    // Actualización completa
    users[userIndex] = {
      ...users[userIndex],
      name,
      email,
      role: role || users[userIndex].role,
      updatedAt: new Date().toISOString()
    };

    res.status(200).json({
      method: 'PUT',
      message: 'User fully updated successfully',
      data: users[userIndex]
    });
  },

  // PATCH - Partial user update
  patchUser: (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    // Buscar usuario
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ 
        method: 'PATCH',
        error: 'User not found' 
      });
    }

    // Actualización parcial (solo campos proporcionados)
    const updatedUser = {
      ...users[userIndex],
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role }),
      updatedAt: new Date().toISOString()
    };

    users[userIndex] = updatedUser;

    res.status(200).json({
      method: 'PATCH',
      message: 'User partially updated successfully',
      data: updatedUser
    });
  },

  // DELETE - Remove user
  deleteUser: (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ 
        method: 'DELETE',
        error: 'User not found' 
      });
    }

    const deletedUser = users.splice(userIndex, 1);
    
    res.status(200).json({
      method: 'DELETE',
      message: 'User deleted successfully',
      deletedUserId: deletedUser[0].id,
      timestamp: new Date().toISOString()
    });
  }
};

// ✅ Rutas correctamente definidas
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.patch('/:id', usersController.patchUser); // ✅ Agregué PATCH
router.delete('/:id', usersController.deleteUser);

module.exports = router;
