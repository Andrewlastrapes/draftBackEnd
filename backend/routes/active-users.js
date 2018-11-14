
const express = require("express");
const router = express.Router();
const signedInModel = require("../models/activeUsersModel");

router.get("", (req, res) => {
    signedInModel.find().then((data) => {
        res.status(200).json({
           message: "Succesful",
           users: data 
        });
    });
});

router.post("/logout", (req, res) => {
    console.log(req.body.username)
    signedInModel.deleteOne({username: req.body.username})
    .then((user) => {
        console.log(user)
        res.status(200).json({
            message: "Logged out",
            data: user
        });
    });
});

module.exports = router;