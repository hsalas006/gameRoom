const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Session = new Schema({
    
    name:{
        type: String,
        require: false
    },
    IDplayer1:{
        type: String,
        require: true
    },
    IDplayer2:{
        type: String,
        require: false
    },
    games:{
        type: [],
        require: false
    },
    currentGame: {
        type: String,
        require: false
    },
    boardSize:{
        type: Number,
        require: false
    },
    score:{
        type: {},
        require: false
    }
});

module.exports = mongoose.model('Session', Session);