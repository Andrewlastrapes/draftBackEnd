const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activeUserSchema = new Schema({
        
    Name: {type: String},
    Events: {type: Number},
    WorldGolfRank: {type: Number}
    
});

module.exports = mongoose.model("golfers", activeUserSchema);

