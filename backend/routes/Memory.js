const express = require('express');

const memoryController = require('../controllers/memory');
const isAuth = require('../controllers/auth');

const router = express.Router();

router.post('/memoryGame',  memoryController.postGame);

router.get('/memoryGame',  memoryController.getGames);

router.get('/memoryGame/:memoryId',  memoryController.getGame);

router.put('memoryGame/:memoryId',  memoryController.updateGame);


module.exports = router;