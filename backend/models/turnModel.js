const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const turn = new Schema({
        
    turn: {type: Boolean}
    
});

module.exports = mongoose.model("turn", turn);
