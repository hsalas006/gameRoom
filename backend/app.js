const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const memoryRoutes = require('./routes/Memory');
const othelloRoutes = require('./routes/Othello');
const sessionRoutes = require('./routes/session');

const app = express();

// Database initialization  
mongoose
    .connect(
        'mongodb+srv://harold:hsalas006@cluster0-yxsfo.mongodb.net/gameRoom?retryWrites=true'
    )
    .then(result =>{
        console.log('Conexion exitosa a la base de datos');
    })
    .catch(err => console.log('>>>>', err));

// Settings 
app.set('port', process.env.PORT || 8080)

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
//app.use('/users', userRoutes);
app.use('/memory', memoryRoutes);
app.use('/othello', othelloRoutes);
app.use('/session', sessionRoutes);


// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
