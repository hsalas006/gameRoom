const express = require('express');

const othelloController = require('../controllers/othello');
const isAuth = require('../controllers/auth');

const router = express.Router();

router.post('/newgame', othelloController.postGame);

router.get('/games', othelloController.getGames);

router.get('/game/:othelloId', othelloController.getGame);

router.put('/game/:othelloId', othelloController.updateGame);

router.put('/gamePlay/:othelloId', othelloController.playGame);

module.exports = router;