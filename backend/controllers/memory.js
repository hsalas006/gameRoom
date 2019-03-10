exports.postGame = async(req, res, next)=>{
    const IDgame = req.body.IDgame;
    const IDplayer1 = req.body.IDplayer1;
    const IDplayer2 = req.body.IDplayer2;
    const matrix = req.body.matrix;
    const turn = req.body.turn;
    const score = req.body.score;
    const IDsession = req.body.IDsession;
    // if the response is positive and created
    res.status(201).json({ 
        message: 'se realizo un post exitosamente',
        post: {
            IDgame: IDgame,
            IDplayer1: IDplayer1,
            IDplayer2: IDplayer2,
            matrix: matrix,
            turn: turn,
            score: score,
            IDsession: IDsession
        } 
    });
};

exports.getGames = async(req, res, next)=>{
    // if the response is positive
    res.status(200).json({ 
        posts:[{
            IDgame : '00001',
            IDplayer1 : 'jugador1',
            IDplayer2 : 'jugador2',
            matrix : [],
            turn : 'jugador1',
            score : '10/12',
            IDsession : '000001'                
        }]
        
     });
};