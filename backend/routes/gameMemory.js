const express = require('express');
const router = require('express-promise-router')();

router.route('/gameMemory')
    .post(UsersController.signUp);

router.route('/gameMemory')
    .get(UsersController.secret);

module.exports = router;