const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase-admin');

const morgan = require('morgan');
const cors = require('cors');
const memoryRoutes = require('./routes/Memory');
const othelloRoutes = require('./routes/Othello');
const sessionRoutes = require('./routes/session');

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
app.use(morgan);
app.use(bodyParser.json());
app.use(cors);

// Routes
//app.use('/users', userRoutes);
app.use('/memory', memoryRoutes);
app.use('/othello', othelloRoutes);
app.use('/session', sessionRoutes);

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
