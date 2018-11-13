const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const activeUserRoutes = require("./routes/active-users")

app.use((req, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

mongoose.connect('mongodb+srv://andrewlastrapes:hD0AmoqhP8ZN8VLN@cluster0-pl1u8.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
.then(() => {
    console.log("connected")
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/post", postRoutes);
app.use("/user", userRoutes);
app.use("/active-users", activeUserRoutes);



module.exports = app