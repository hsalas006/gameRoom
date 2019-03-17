const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/auth/:idToken', authController.getToken);

router.put('/auth/:idToken', authController.updateUser);

module.exports = router;;
  