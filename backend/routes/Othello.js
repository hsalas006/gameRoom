const express = require('express');

const othelloController = require('../controllers/othello');

const router = express.Router();

router.post('/othelloGames', othelloController.postGame);

router.get('/othelloGames', othelloController.getGames);

module.exports = router;