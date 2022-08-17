const express = require('express');

const router = express.Router();

const controller = require('../controllers/serviceController');

router.post('/new', controller.createService);
router.put('/update/:id', controller.updateService);
router.delete('/delete/:id', controller.deleteService);
router.get('/all', controller.getServices);
router.get('/:id', controller.getServiceById);

module.exports = router;
