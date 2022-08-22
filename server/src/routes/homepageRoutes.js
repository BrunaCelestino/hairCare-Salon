const express = require('express');

const router = express.Router();

const controller = require('../controllers/homepageController');

router.get('/home', controller.getHomepage);
router.get('/client/profile', controller.getProfilePage);
router.get('/client/profile/settings', controller.getProfileSettingsPage);
router.get('/client/signup', controller.getSignupPage);
router.get('/client/login', controller.getLoginPage);
router.get('/client/update/password', controller.getRedefinePasswordPage);
router.get('/admin', controller.getAdminPage);

module.exports = router;
