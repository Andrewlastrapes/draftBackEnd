const express = require('express');
const router = express.Router();
const Register = require("../models/registerModel");
const Turn = require("../models/turnModel");
const Complete = require("../models/draftComplete");




router.post("", (req, res) => {
    Register.findOneAndUpdate({ username: req.body["user"]["username"] },
        { $push: { picks: req.body["golfer"]["Name"] } },
        function (error) {
            if (error) {
                console.log("ERRRORRRR");
            } else {
                res.status(200).json({
                    message: "Post golfer"
                });
                console.log(`success: ${req.body.golfer.Name}`);
            }
        });
})


router.post("/initate-turn", (req, res) => {
    var turn = new Turn({
        turn: true
    })
    turn.save()
    res.status(200).json({
        message: "Initiate turn"
    })
})


router.post("/update-turn", (req, res) => {
    
    console.log(req.body["b"])

    if(req.body["b"] === true){
        console.log("in true block")
        Turn.findOneAndUpdate({ turn: false },
            { turn: true },
            function (error, data) {
                res.status(200).json({
                    data: "a"
                })
            });
    } else {
        console.log("in false block")
        Turn.findOneAndUpdate({ turn: true },
            { turn: false },
            function (error, data) {
                res.status(200).json({
                    message: "Update turn"
                })
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
                res.status(200).json({
                    message: "Find one and update"
                })
                console.log("Active user updated")
            }
        });

});

router.post("/draft-started", (req, res) => {
    const draft = new Complete({
        complete: false
    })
    draft.save()
    res.status(200).json({
        data: "success"
    })
})




router.post("/draft-completed", (req, res) => {
    Complete.findOneAndUpdate({complete: false},
        {complete: true}).then(data => {
            res.status(200).json({
                data: data
            })
        })
})

router.get("/draft-completed", (req, res) => {
    Complete.find().then(data => {
        res.status(200).json({
            status: data
        })
    })
})



module.exports = router;