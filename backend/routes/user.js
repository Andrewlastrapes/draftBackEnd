const express = require('express');
const router = express.Router();
const Model = require("../models/registerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



router.post("/register", (req, res) => {



    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            
            
            const model = new Model({
                username: req.body.username,
                password: hash
            });

            model.save()
                .then(result => {
                    res.status(201).json({
                        message: "Added",
                        data: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })

        });
})

router.post("/login", (req, res) => {
    let messageFailed = "User not found/Password incorrect"
    let fetchedUser;
    Model.findOne({ username: req.body.username })
        .then(un => {
            if (!un) {
                return res.status(401).json({
                    failed: messageFailed
                });
            }
       
            fetchedUser = un
            return bcrypt.compare(req.body.password, fetchedUser.password);
            
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    failed: messageFailed
                });
            }
            const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 
                "secret-this-should-be-longer",
                { expiresIn: "1h" }
            );
            console.log("token " +token);
           return res.status(200).json({
                token: token,
                message: "Succesful login"
            })
        })
        .catch(err => {
            return res.status(401).json({
                failed: messageFailed
            });
        });
});



router.get("/register", (req, res) => {

    Model.find().then(data => {
        res.status(200).json({
            message: "Successful",
            data: data
        });
    });
})

module.exports = router;