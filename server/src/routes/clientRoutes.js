const express = require('express');

const router = express.Router();

const controller = require('../controllers/clientController');
const { validateCPF, validateEmailPasswordUsername, hashPassword } = require('../helpers/validationHelpers');

router.post('/signup', validateCPF, validateEmailPasswordUsername, hashPassword, controller.createClient);
router.post('/update/password', validateCPF, validateEmailPasswordUsername, hashPassword, controller.updatePassword);
router.put('/update/:id', validateCPF, validateEmailPasswordUsername, hashPassword, controller.updateClient);
router.delete('/delete/:id', controller.deleteClient);
router.get('/all', controller.getClients);
router.get('/:id', controller.getClientById);

module.exports = router;
