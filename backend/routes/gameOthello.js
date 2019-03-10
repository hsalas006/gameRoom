const express = require('express');
const router = require('express-promise-router')();

router.route('/gameOthello')
    .post(UsersController.signUp);

router.route('/gameOthello')
    .get(UsersController.secret);

module.exports = router;