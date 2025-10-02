const express = require('express');
const router = express.Router();
const workoutExercisesController = require('../../controllers/workoutExercises.controller');

// GET routes
router.get('/', workoutExercisesController.getAllWorkoutExercises);
router.get('/workout/:workoutId', workoutExercisesController.getExercisesByWorkout);
router.get('/:id', workoutExercisesController.getWorkoutExerciseById);

// POST routes
router.post('/', workoutExercisesController.createWorkoutExercise);
router.post('/bulk', workoutExercisesController.bulkCreateWorkoutExercises);

// PUT routes
router.put('/:id', workoutExercisesController.updateWorkoutExercise);
router.put('/reorder/:workoutId', workoutExercisesController.reorderWorkoutExercises);

// PATCH routes
router.patch('/:id', workoutExercisesController.patchWorkoutExercise);

// DELETE routes
router.delete('/:id', workoutExercisesController.deleteWorkoutExercise);

module.exports = router;