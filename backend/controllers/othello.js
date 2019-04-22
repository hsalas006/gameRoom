const Othello = require('../models/othello');
const logic = require('../gameLogic/othelloLogic');
const io = require('../socket');

exports.postGame = async(req, res, next)=>{

  const matrix = logic.createBoard(req.body.size);
  console.log('>>>>', matrix);
  const othello = new Othello({
    type: req.body.type,
    IDplayer1 : req.body.IDplayer1,
    IDplayer2 : req.body.IDplayer2,
    matrix : matrix,
    size: req.body.size,
    turn : 1,
    score : 0,
    level: req.body.level,
    auto: req.body.auto,
    IDsession : 0
  })
  console.log('----', othello)
  othello
    .save()
    .then(result =>{
        console.log(result);
        res.json({ 
            message: 'se realizo un post exitosamente',
            post: result
        });
    }).catch(err =>{
        console.log(err);
    });
};

exports.getGames = async(req, res, next) => {
  Othello.find()
    .then(games => {
      res
        .status(200)
        .json({ message: 'Juegos encontrados exitosamente.', games: games });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getGame = async(req, res, next) => {
  const othelloId = req.params.othelloId;
  Othello.findById(othelloId)
    .then(game => {
      if (!game) {
        const error = new Error('No se puede encontrar el juego.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Juego encontrado exitosamente!!...', game: game });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.playGame = async(req,res,next) =>{
  let idGame = req.body.idGame;
  let row = req.body.row;
  let col = req.body.col;
  let matrix = req.body.matrix;
  let player = req.body.turn;
  let size = req.body.size;
  let auto = req.body.auto;
  let level = req.body.level
  let valid;

  matrix, valid = logic.move(matrix,row, col, player, size, auto, level);

  if(valid){
    // calc the score
    let score = logic.score(matrix, size);
    // find and save the info in the db

    Othello.findByIdAndUpdate(idGame)
      .then(game => {
        if (!game) {
          const error = new Error('No se encontro el juego');
          error.statusCode = 404;
          throw error;
        }
        if(player === 1){
          game.turn = 2;
        }else game.turn = 1;

        game.score = score;
        game.matrix = matrix;
        return game.save();
      })
      .then(result => {
        io.getIO().emit(result._id.toString(), {action: 'move', game:result});
        res.status(200).json({ message: 'Movimiento exitoso!', game: result });   
      })
      .catch(err =>{
        console.log('error al encontrar el juego')
        next(err);
      })
  }
  else{
    let end= logic.winner(player, matrix, size);
    console.log('end: ', end)
    console.log('turn: ', req.body.turn)
    console.log('player: ', player)
    res.status(406).json({ message: 'Movimiento no aceptado!', valid: false, end: end.check});
    console.log('movimiento invalido.');    
  }


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

