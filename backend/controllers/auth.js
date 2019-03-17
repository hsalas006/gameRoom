const admin = require('firebase-admin');
const express = require('express');

const User = require('../models/user');

const router = express.Router();

var serviceAccount = require('../../gameroom-3127e-firebase-adminsdk-13fl3-e7d9af67b5.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://gameroom-3127e.firebaseio.com'
});
  

exports.getToken = (req, res, next) =>{
    const idToken = req.body.idToken;

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            var uid = decodedToken.uid;
            console.log(uid);
            res.status(200).json({user: uid});
            // ...
        }).catch(error => {
            // Handle error
            console.log(error);
        });
};