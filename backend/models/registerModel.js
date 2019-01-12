const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");



const Schema = mongoose.Schema;

const registerSchema = new Schema({
    username: {type: String},
    password: {type: String},
    picks: [],
    active: {type: Boolean},
    signedIn: {type: Boolean}
});

registerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("register", registerSchema);



