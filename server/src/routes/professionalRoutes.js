const express = require('express');

const router = express.Router();

const controller = require('../controllers/professionalController');
const { validateCPF, validateEmailPasswordUsername, hashPassword } = require('../helpers/validationHelpers');

router.post('/new', validateCPF, validateEmailPasswordUsername, hashPassword, controller.createProfessional);
router.put('/update/:id', validateCPF, validateEmailPasswordUsername, hashPassword, controller.updateProfessional);
router.delete('/delete/:id', controller.deleteProfessional);
router.get('/all', controller.getProfessionals);
router.get('/:id', controller.getProfessionalById);

module.exports = router;
