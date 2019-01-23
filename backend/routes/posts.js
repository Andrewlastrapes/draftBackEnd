const express = require('express');
const router = express.Router();
const Register = require("../models/registerModel");
const Turn = require("../models/turnModel");




router.post("", (req, res) => {
    console.log("is this the culprit" + req.body["user"])
    Register.findOneAndUpdate({ username: req.body["user"]["username"] },
        { $push: { picks: req.body["golfer"] } },
        function (error) {
            if (error) {
                console.log("ERRRORRRR");
            } else {

                console.log(`success: ${req.body.golfer.Name}`);
            }
        });
})


router.post("/initate-turn", (req, res) => {
    var turn = new Turn({
        turn: true
    })
    turn.save()
})


router.post("/update-turn", (req, res) => {
    
    console.log(req.body["b"])

    if(req.body["b"] === true){
        console.log("in true block")
        Turn.findOneAndUpdate({ turn: false },
            { turn: true },
            function (error, data) {
                console.log(data)
            });
    } else {
        console.log("in false block")
        Turn.findOneAndUpdate({ turn: true },
            { turn: false },
            function (error, data) {
                console.log(data)
            });
    }  

});

router.get("/get-turn", (req, res) => {
    Turn.find().then(data => {
        res.status(200).json({
            data: data
        })
    })
})

router.post("/update-active", (req, res) => {

    Register.findOneAndUpdate({ active: true },
        { active: false },
        function (error) {
            if (error) {
                console.log(error + "Erroorororor");
            } else {
                console.log("Active user updated")
            }
        });

});


module.exports = router;