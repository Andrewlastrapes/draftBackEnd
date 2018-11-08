const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");



const Schema = mongoose.Schema;

const registerSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    picks: []
});

registerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("register", registerSchema);



