const express = require('express');
const router = express.Router();
const workoutReportsController = require('../../controllers/workoutReports.controller');

// GET routes
router.get('/', workoutReportsController.getAllWorkoutReports);
router.get('/user/:userId', workoutReportsController.getUserWorkoutReports);
router.get('/date/:date', workoutReportsController.getWorkoutReportByDate);
router.get('/date-range/:startDate/:endDate', workoutReportsController.getWorkoutReportsByDateRange);
router.get('/:id', workoutReportsController.getWorkoutReportById);

// POST routes
router.post('/', workoutReportsController.createWorkoutReport);

// PUT routes
router.put('/:id', workoutReportsController.updateWorkoutReport);

// PATCH routes
router.patch('/:id', workoutReportsController.patchWorkoutReport);

// DELETE routes
router.delete('/:id', workoutReportsController.deleteWorkoutReport);
router.delete('/', workoutReportsController.bulkDeleteWorkoutReports);

module.exports = router;