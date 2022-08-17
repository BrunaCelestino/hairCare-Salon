const express = require('express');

const router = express.Router();

const controller = require('../controllers/scheduleController');

router.post('/new', controller.createSchedule);
router.put('/update/:id', controller.updateSchedule);
router.delete('/delete/:id', controller.deleteSchedule);
router.get('/all', controller.getSchedules);
router.get('/available', controller.getAvailableSchedules);
router.get('/:id', controller.getScheduleById);

module.exports = router;
