const express = require('express');

const memoryController = require('../controllers/memory');

const router = express.Router();

router.post('/memoryGames', memoryController.postGame);

router.get('/memoryGames', memoryController.getGames);

module.exports = router;