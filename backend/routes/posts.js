const express = require('express');
const router = express.Router();
const Register = require("../models/registerModel");




router.post("", (req, res) => {

  Register.findOneAndUpdate({username: req.body.user.username},
  {$push: {picks: req.body.golfer}},
  function (error, success) {
        if (error) {
            console.log("ERRRORRRR");
        } else {
            console.log("Succcsersrse");
        }
    });
})


module.exports = router;