const express = require('express');

const sessionController = require('../controllers/session');

const router = express.Router();

router.post('/newsession', sessionController.postSession);

router.get('/sessions', sessionController.getSessions);

router.get('/session/:idsession', sessionController.getSession);

router.put('/session/:sessionId', sessionController.updateSession);

module.exports = router;