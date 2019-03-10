const express = require('express');
const router = require('express-promise-router')();
const othelloCOntroller = require('../controllers/othello');

router.route('/gameMemory')
    .post(othelloCOntroller);

router.route('/gameMemory')
    .get(othelloCOntroller);

module.exports = router;