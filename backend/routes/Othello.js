const express = require('express');

const othelloController = require('../controllers/othello');
const isAuth = require('../controllers/auth');

const router = express.Router();

router.post('/newgame', isAuth, othelloController.postGame);

router.get('/games', isAuth, othelloController.getGames);

router.get('/game/:othelloId', isAuth, othelloController.getGame);

router.put('/game/:othelloId', isAuth, othelloController.updateGame);

router.put('/gamePlay/:othelloId', isAuth, othelloController.playGame);

module.exports = router;