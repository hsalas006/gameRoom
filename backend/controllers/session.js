const Session = require('../models/session');

exports.postSession = async(req, res, next)=>{
    const name = req.body.name;
    const IDplayer1 = req.body.IDplayer1;
    const IDplayer2 = null;
    const games = req.body.games;
    const level = req.body.level;
    const score = 0;

    const session = new Session({
        name,
        IDplayer1,
        IDplayer2,
        games,
        level,
        score
    })
    session.save().then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'sesion creada correctamente.',
            post: result
        });
    }).catch(err =>{
        console.log(err);
    });
    // if the response is positive and created
    res.status(201).json({ 
        message: 'se realizo un post exitosamente',
        post: {content: content} 
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
        })
        .catch(err =>{
            console.log('error al encontrar una sesion');
        })
};

exports.updateSession = (req, res, next)=>{
    const sessionId = req.params.sessionId;
    const name = req.body.name;
    const IDplayer1 = req.body.IDplayer1;
    const IDplayer2 = req.body.IDplayer2;
    const games = req.body.games;
    const level = req.body.level;
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
            session.level = level;
            session.score = score;
            return session.save();
        })
        .then(result =>{
            res.status(200).json({ message: 'Sesion modificada!', session: result});
        })
        .catch(err =>{
            console.log(err);
        })
   
}