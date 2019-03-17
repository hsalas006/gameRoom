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
        ĺevel,
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
    // if the response is positive
    res.status(200).json({ 
        sessions: [{
            IDsession,
            name,
            IDplayer1,
            IDplayer2,
            games,
            level,
            score
        }] 
    });

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