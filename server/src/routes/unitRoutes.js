const express = require('express');

const router = express.Router();

const controller = require('../controllers/unitController');

router.post('/new', controller.createUnit);
router.put('/update/:id', controller.updateUnit);
router.delete('/delete/:id', controller.deleteUnit);
router.get('/all', controller.getUnits);
router.get('/:id', controller.getUnitById);

module.exports = router;
