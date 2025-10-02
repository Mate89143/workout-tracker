const express = require('express');
const router = express.Router();
const workoutPlansController = require('../../controllers/workoutPlans.controller');

// GET routes
router.get('/', workoutPlansController.getAllWorkoutPlans);
router.get('/user/:userId', workoutPlansController.getUserWorkoutPlans);
router.get('/:id', workoutPlansController.getWorkoutPlanById);

// POST routes
router.post('/', workoutPlansController.createWorkoutPlan);
router.post('/:id/duplicate', workoutPlansController.duplicateWorkoutPlan);

// PUT routes
router.put('/:id', workoutPlansController.updateWorkoutPlan);

// PATCH routes
router.patch('/:id', workoutPlansController.patchWorkoutPlan);
router.patch('/:id/archive', workoutPlansController.archiveWorkoutPlan);

// DELETE routes
router.delete('/:id', workoutPlansController.deleteWorkoutPlan);

module.exports = router;