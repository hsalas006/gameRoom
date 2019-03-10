const express = require('express');

const sessionController = require('../controllers/session');

const router = express.Router();

router.post('/sessions', sessionController.postSession);

router.get('/sessions', sessionController.getSessions);

module.exports = router;