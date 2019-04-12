const Session = require('../models/session');
const io = require('../socket');

exports.postSession = async(req, res, next)=>{
    const name = req.body.name;
    const IDplayer1 = req.body.IdPlayer1;
    const IDplayer2 = null;
    const games = req.body.games;
    const currentGame = 2;
    const boardSize = req.body.boardSize;
    const score = {player1: 0, player2: 0};
    
    const session = new Session({
        name: name,
        IDplayer1: IDplayer1,
        IDplayer2: null,
        games: games,
        currentGame: currentGame,
        boardSize: boardSize,
        score: score
    })
    session.save().then(result =>{
        res.status(201).json({
            message: 'sesion creada correctamente.',
            post: result
        });
        io.getIO().emit('new_session', result)
    }).catch(err =>{
        console.log(err);
    });
};

exports.getSessions = async(req, res, next)=>{
    Session.find()
        .then(sessions => {
            res.status(200).json({
                message: 'Sesiones encontradas exitosamente', sessions:sessions
            });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getSession = async(req, res, next)=>{
    const idsession = req.params.idsession;
    Session.findById(idsession)
        .then(session =>{
            if(!session){
                console.log('la sesion no existe');
            }
            res.status(200).json({ message: 'Sesion encontrada', session: session});
            io.getIO().emit('user', 'Jugador conectado a sesion: '+ session.name);
        })
        .catch(err =>{
            console.log('error al encontrar una sesion');
        })
};
exports.addGame = (req, res, next) => {
    let idGames = req.body.idGames;
    Session.findByIdAndUpdate(req.body.idSession) 
        .then(session =>{
            if(!session){
                const error = new Error('No existe la sesion buscada.')
                error.statusCode = 404;
                throw error;
            }
            session.games = idGames;  
            session.currentGame = 2;
            return session.save();
        })
        .then(result =>{
            res.status(200).json({ message: 'El juego se a almacenado en la session!', session: result});
        })
        .catch(err =>{
            console.log(err);
        })
};

exports.addPlayer = (req, res, next) =>{
    const sessionId = req.params.sessionId;
    const player2 = req.body.player2;
    Session.findById(sessionId)
        .then(session =>{
            if(!session){
                const error = new Error('No existe la sesion buscada.')
                error.statusCode = 404;
                throw error;
            }
            session.IDplayer2 = player2;
            return session.save()
        })
        .then(result =>{
            res.status(200).json({ message: 'Jugador 2 agregado exitosamente!', session: result});
            io.getIO().emit('addPlayer', result);
        })
        .catch(err =>{
            console.log(err);
            next();
        })
};

exports.updateSession = (req, res, next)=>{
    const sessionId = req.params.sessionId;
    const name = req.body.name;
    const IDplayer1 = req.body.IDplayer1;
    const IDplayer2 = req.body.IDplayer2;
    const games = req.body.games;
    const currentGame = req.body.currentGame;
    const boardSize = req.body.boardSize;
    const score = req.body.score;
    Session.findById(sessionId)
        .then(session =>{
            if(!session){
                const error = new Error('No existe la sesion buscada.')
                error.statusCode = 404;
                throw error;
            }
            session.name = name;
            session.IDplayer1 = IDplayer1;
            session.IDplayer2 = IDplayer2;
            session.games = games;
            session.currentGame = currentGame;
            session.boardSize = boardSize;
            session.score = score;
            return session.save();
        })
        .then(result =>{
            res.status(200).json({ message: 'Sesion modificada!', session: result});
        })
        .catch(err =>{
            console.log(err);
            next();
        })
   
}