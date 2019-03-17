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
    level:{
        type: Number,
        require: false
    },
    score:{
        type: Number,
        require: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Session', Session);