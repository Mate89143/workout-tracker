const express = require('express');
const router = express.Router();
const exercisesController = require('../../controllers/exercises.controller');

// GET routes
router.get('/', exercisesController.getAllExercises);
router.get('/search', exercisesController.searchExercises);
router.get('/category/:category', exercisesController.getExercisesByCategory);
router.get('/:id', exercisesController.getExerciseById);

// POST routes
router.post('/', exercisesController.createExercise);

// PUT routes
router.put('/:id', exercisesController.updateExercise);

// PATCH routes
router.patch('/:id', exercisesController.patchExercise);

// DELETE routes
router.delete('/:id', exercisesController.deleteExercise);

module.exports = router;