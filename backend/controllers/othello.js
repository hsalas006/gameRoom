const Othello = require('../models/othello');

exports.postGame = async(req, res, next)=>{

    const othello = new Othello({
        IDgame : req.body.IDgame,
        IDplayer1 : req.body.IDplayer1,
        IDplayer2 : req.body.IDplayer2,
        matrix : req.body.matrix,
        turn : req.body.turn,
        score : req.body.score,
        IDsession : req.body.IDsession 
    })
    othello
        .save()
        .then(result =>{
            console.log(result);
            res.status(201).json({ 
                message: 'se realizo un post exitosamente',
                post: result
            });
        }).catch(err =>{
            console.log(err);
        });
    
};

exports.getGames = (req, res, next) => {
    Memory.find()
      .then(games => {
        res
          .status(200)
          .json({ message: 'Fetched games successfully.', games: games });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

exports.getGame = (req, res, next) => {
    const othelloId = req.params.othelloId;
    Othello.findById(othelloId)
      .then(game => {
        if (!game) {
          const error = new Error('Could not find game.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ message: 'game fetched.', game: game });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.updateGame = (req, res, next) => {
    const othelloId = req.params.othelloId;
    
    const IDplayer1 = req.body.IDplayer1;
    const IDplayer2 = req.body.IDplayer2;
    const matrix = req.body.matrix;
    const turn = req.body.turn;
    const score = req.body.score;
    const IDsession = req.body.IDsession; 
    
    Othello.findById(othelloId)
      .then(game => {
        if (!game) {
          const error = new Error('Could not find game.');
          error.statusCode = 404;
          throw error;
        }
       
        game.IDplayer1 = IDplayer1;
        game.IDplayer2 = IDplayer2;
        game.matrix = matrix;
        game.turn = turn;
        game.score = score;
        game.IDsession = IDsession;
        return game.save();
      })
      .then(result => {
        res.status(200).json({ message: 'Game updated!', game: result });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

