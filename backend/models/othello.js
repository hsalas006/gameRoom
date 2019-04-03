const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const othelloSchema = new Schema({
    
    type:{
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
    matrix:{
        type: [[]],
        require: true
    },
    turn:{
        type: Object,
        require: false
    },
    size:{
        type: Number,
        require: true
    },
    score:{
        type: Number,
        require: false
    },
    sessionID:{
        type: String,
        require: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Othello', othelloSchema);