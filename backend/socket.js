let io;

module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer);
        console.log('Socket creado y escuchando...')
        return io;   
    },
    getIO: () =>{
        if(!io){
            throw new Error('WebSocket no se inicializo.');
        }
        return io;
    }
};
