const express = require('express');
const router = require('express-promise-router')();
const othelloController = require('../controllers/othello');


router.route('/gameOthello')
    .post(othelloController);

router.route('/gameOthello')
    .get(othelloController);

module.exports = router;