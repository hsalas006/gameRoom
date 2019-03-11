const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Session = new Schema({
    IDsession:{
        type: String,
        require: true
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
        type: String,
        require: false
    },
    score:{
        type: Number,
        require: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Session', Session);