const express = require('express');

const othelloController = require('../controllers/othello');
const isAuth = require('../controllers/auth');

const router = express.Router();

router.post('/othelloGames', isAuth, othelloController.postGame);

router.get('/othelloGames', isAuth, othelloController.getGames);

router.get('/othelloGames/:othelloId', isAuth, othelloController.getGame);

router.put('othelloGames/:othelloId', isAuth, othelloController.updateGame);


module.exports = router;