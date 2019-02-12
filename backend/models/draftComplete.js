const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const draftCompleteSchema = new Schema({
        
    complete: {type: Boolean}
    
});

module.exports = mongoose.model("complete", draftCompleteSchema);

