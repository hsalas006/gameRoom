const express = require('express');

const sessionController = require('../controllers/session');
const isAuth = require('../controllers/auth');

const router = express.Router();

router.post('/newsession', isAuth, sessionController.postSession);

router.get('/sessions', isAuth, sessionController.getSessions);

router.get('/session/:idsession', isAuth, sessionController.getSession);

router.put('/session/:sessionId', isAuth, sessionController.updateSession);

module.exports = router;