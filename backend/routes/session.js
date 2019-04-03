const express = require('express');

const sessionController = require('../controllers/session');
const isAuth = require('../controllers/auth');

const router = express.Router();

router.post('/newsession', sessionController.postSession);

router.get('/sessions', sessionController.getSessions);

router.get('/:idsession', sessionController.getSession);

router.put('/:sessionId', sessionController.updateSession);

router.put('/addPlayer/:sessionId', sessionController.addPlayer);

module.exports = router;