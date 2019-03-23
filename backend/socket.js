let io;

exports.init = (httpServer) => {

        io = require('socket.io')(httpServer);
        return io;

    
};

exports.getIO = ()=>  {
    getIO: () =>{
        if(!io){
            throw new Error('Socket io no se inicializo.');
        }
    }
};