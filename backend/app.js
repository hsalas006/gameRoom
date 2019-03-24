const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const memoryRoutes = require('./routes/Memory');
const othelloRoutes = require('./routes/Othello');
const sessionRoutes = require('./routes/session');

const app = express();

// Settings 
app.set('port', process.env.PORT || 8080)

// Middlewares
app.use(bodyParser.json());
app.use(cors());
//app.use(authVerification.isAuthorized);

// Routes
app.use('/memory',memoryRoutes);
app.use('/othello',othelloRoutes);
app.use('/session',sessionRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Archivos no encontrados');
    err.status = 404;
    next(err);
});
  
// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

// Database initialization, Server listener and socket init
mongoose
    .connect(
        'mongodb+srv://harold:hsalas006@cluster0-yxsfo.mongodb.net/gameRoom?retryWrites=true'
    )
    .then(result =>{
        console.log('Conexion exitosa a la base de datos...');
        
        // Start the server
        const server = app.listen(app.get('port'), () => {
            console.log(`Servidor en el puerto ${app.get('port')}...`);
        });
        // webSockets start
        const io = require('./socket').init(server);

        /*
        // client side code
        var socket = io.connect();
        socket.emit("create", "room1");
        */
        io.on('connection', socket =>{
            socket.on('create', room=>{
                socket.join(room);
            })
            console.log('Client connected!!');
        });
    })
    .catch(err => console.log('>>>>', err));