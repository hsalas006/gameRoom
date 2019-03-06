const express = require('express');
const firebase = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users');

const port = 8080;
const app = express();
const serviceAccountKey = require('../gameroom-3127e-firebase-adminsdk-13fl3-e7d9af67b5.json');

// Database initialization  
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccountKey),
    databaseURL: 'https://gameroom-3127e.firebaseio.com'
});


// Middlewares
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);

// Start the server
app.listen(port);
console.log(`Server listening at port ${port}`);