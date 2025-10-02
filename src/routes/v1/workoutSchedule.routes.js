const express = require('express');
const router = express.Router();
const workoutScheduleController = require('../../controllers/workoutSchedule.controller');

// GET routes
router.get('/', workoutScheduleController.getAllWorkoutSchedules);
router.get('/user/:userId', workoutScheduleController.getUserWorkoutSchedule);
router.get('/date/:date', workoutScheduleController.getScheduleByDate);
router.get('/week/:week', workoutScheduleController.getScheduleByWeek);
router.get('/:id', workoutScheduleController.getWorkoutScheduleById);

// POST routes
router.post('/', workoutScheduleController.createWorkoutSchedule);

// PUT routes
router.put('/:id', workoutScheduleController.updateWorkoutSchedule);
router.put('/bulk/update', workoutScheduleController.bulkUpdateSchedule);

// PATCH routes
router.patch('/:id', workoutScheduleController.patchWorkoutSchedule);
router.patch('/:id/reschedule', workoutScheduleController.rescheduleWorkout);

// DELETE routes
router.delete('/:id', workoutScheduleController.deleteWorkoutSchedule);

module.exports = router;