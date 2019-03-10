const express = require('express');
const router = require('express-promise-router')();

const { validateBody, schemas } = require('../')

router.route('/signup')
    .post(UsersController.signUp);

router.route('/signin')
    .post(passportSignIn, UsersController.signIn);

router.route('/oauth/google')
    .post(UsersController.googleOAuth);
  
router.route('/secret')
    .get(UsersController.secret);

module.exports = router;