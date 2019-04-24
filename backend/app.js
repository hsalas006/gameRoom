const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');

const memoryRoutes = require('./routes/Memory');
const othelloRoutes = require('./routes/Othello');
const sessionRoutes = require('./routes/session');

const app = express();

// Settings 
app.set('port', process.env.PORT || 8000)

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(compression());
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
    console.log(err);
});
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@tec-2019-yxsfo.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true`
// Database initialization, Server listener and socket init
mongoose
    .connect(
        MONGODB_URI, { useNewUrlParser: true }
    )
    .then(result =>{
        console.log('Conexion exitosa a la base de datos...');

        // Start the server
        const server = app.listen(process.env.PORT || app.get('port'), () => {
            console.log(`Servidor en el puerto ${app.get('port')}...`);
        });
        
        // webSockets start
        const io = require('./socket').init(server);

        io.on("connection", socket => {
            
            console.log('prueba de socket ID: ', socket.id);    
        });
        
    })
    .catch(err => console.log('>>>>', err));