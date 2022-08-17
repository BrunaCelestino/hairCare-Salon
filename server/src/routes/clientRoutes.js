const express = require('express');

const router = express.Router();

const controller = require('../controllers/clientController');
const { validateCPF, validateEmailPasswordUsername, hashPassword } = require('../helpers/validationHelpers');

router.post('/new', validateCPF, validateEmailPasswordUsername, hashPassword, controller.createClient);
router.put('/update/:id', validateCPF, validateEmailPasswordUsername, hashPassword, controller.updateClient);
router.delete('/delete/:id', controller.deleteClient);
router.get('/all', controller.getClients);
router.get('/:id', controller.getClientById);

module.exports = router;
