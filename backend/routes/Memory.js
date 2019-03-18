const express = require('express');

const memoryController = require('../controllers/memory');
const isAuth = require('../controllers/auth');

const router = express.Router();

router.post('/memoryGame', isAuth, memoryController.postGame);

router.get('/memoryGame', isAuth, memoryController.getGames);

router.get('/memoryGame/:memoryId', isAuth, memoryController.getGame);

router.put('memoryGame/:memoryId', isAuth, memoryController.updateGame);


module.exports = router;