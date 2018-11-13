
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

module.exports = router;