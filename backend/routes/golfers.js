const express = require('express');
const router = express.Router();
const Golfers = require("../models/golfersModel");


router.post("/post", (req, res) => {

 for(let i = 0; i < req.body.length; i++){
    var golfers = new Golfers({
        Name: req.body[i].Name,
        Events: req.body[i].Events,
        WorldGolfRank: req.body[i].WorldGolfRank
        });

    golfers.save()
    
    }
    
})

router.get("/post", (req, res) => {

    Golfers.find().then(data => {
        res.status(200).json({
            message: "Successful",
            data: data
        });
    });
})



router.post("/remove-drafted", (req, res) => {
    Golfers.deleteOne({Name: req.body.Name})
    .then((user) => {
        res.status(200).json({
            message: "Golfer deleted",
            data: user
        });
    });
});


module.exports = router;