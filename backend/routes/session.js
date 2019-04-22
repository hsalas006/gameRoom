const express = require('express');

const sessionController = require('../controllers/session');
const isAuth = require('../controllers/auth');

const router = express.Router();

router.post('/newsession', isAuth, sessionController.postSession);

router.get('/sessions', isAuth, sessionController.getSessions);

router.get('/:idsession', isAuth, sessionController.getSession);

router.put('/newgameInsession/:sessionId', isAuth, sessionController.addGame);

router.put('/:sessionId', isAuth, sessionController.updateSession);

router.put('/addPlayer/:sessionId', isAuth, sessionController.addPlayer);

module.exports = router;