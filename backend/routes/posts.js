const express = require('express');
const router = express.Router();
const Register = require("../models/registerModel");




router.post("", (req, res) => {
  Register.findOneAndUpdate({username: req.body["user"]["username"]},
  {$push: {picks: req.body["golfer"]}},
  function (error) {
        if (error) {
            console.log("ERRRORRRR");
        } else {
        
            console.log(`success: ${req.body.golfer.Name}`);
        }
    });
})

router.post("/update-active", (req, res) => {

    Register.findOneAndUpdate({active: true},
        {active: false},
        function (error) {
            if(error){
                console.log(error + "Erroorororor");
            } else {
                console.log("Active user updated")
            }
        });

    console.log(req.body["user"]["username"])
    // Register.findOneAndUpdate({username: req.body["user"]["username"]},
    // {active: true},
    // function (error) {
    //     if(error){
    //         console.log(error + "Erroorororor");
    //     } else {
    //         console.log("Active user updated")
    //     }
    // });
});


module.exports = router;