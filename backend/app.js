const express = require('express');
const firebase = require('firebase-admin');

const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/users');

const app = express();
const serviceAccountKey = require('../gameroom-3127e-firebase-adminsdk-13fl3-e7d9af67b5.json');

// Database initialization  
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccountKey),
    databaseURL: 'https://gameroom-3127e.firebaseio.com'
});

// Settings 
app.set('port', process.env.PORT || 8080)

// Middlewares
app.use(morgan());
app.use(express.json());
app.use(cors);

// Routes
app.use('/users', userRoutes);

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
