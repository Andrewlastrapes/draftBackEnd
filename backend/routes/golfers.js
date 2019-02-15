const express = require('express');
const router = express.Router();
const Golfers = require("../models/golfersModel");


router.post("/post", (req, res) => {
 
    for (let i = 0; i < req.body.length; i++) {

        var golfers = new Golfers({
            AveragePoints: req.body[i].AveragePoints,
            Events: req.body[i].Events,
            Name: req.body[i].Name,
            PlayerID: req.body[i].PlayerID,
            PlayerSeasonID: req.body[i].PlayerSeasonID,
            PointsGained: req.body[i].PointsGained,
            PointsLost: req.body[i].PointsLost,
            Season: req.body[i].Season,
            TotalPoints: req.body[i].TotalPoints,
            WorldGolfRank: req.body[i].WorldGolfRank,
            WorldGolfRankLastWeek: req.body[i].WorldGolfRankLastWeek
        });
        golfers.save().then(() => {
            if(i === req.body.length - 1){
                Golfers.find().then(data => {
                    res.status(200).json({
                        data: data
                    })
                })
            }
        })
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
    Golfers.deleteOne({ Name: req.body.Name })
        .then((user) => {
            res.status(200).json({
                message: "Golfer deleted",
                data: user
            });
        });
});


module.exports = router;