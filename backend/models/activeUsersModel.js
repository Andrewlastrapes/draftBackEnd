const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activeUserSchema = new Schema({
        
        username: String,
        picks: []
    
});

module.exports = mongoose.model("signed-in", activeUserSchema);


