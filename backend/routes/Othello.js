const express = require('express');

const othelloController = require('../controllers/othello');
const isAuth = require('../controllers/auth');

const router = express.Router();

router.post('/othelloGames', othelloController.postGame);

router.get('/othelloGames', othelloController.getGames);

router.get('/othelloGames/:othelloId', othelloController.getGame);

router.put('othelloGames/:othelloId', othelloController.updateGame);


module.exports = router;