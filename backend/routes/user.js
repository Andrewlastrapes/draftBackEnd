const express = require('express');
const router = express.Router();
const Model = require("../models/registerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SignedInModel = require("../models/activeUsersModel");
const socketIo = require('socket.io');




router.post("/register", (req, res) => {

    let errorData;

    if(!req.body.username){
        return res.status(200).json({
            err: "Type in a Username"
        });
    }
    Model.findOne({username: req.body.username})
    .then((data) => {
        console.log(data);
        if(data){
           return res.status(200).json({
              err: "Username already registered."
                })
        }
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const model = new Model({
                username: req.body.username,
                password: hash
            });
            model.save()
                .then(result => {
                    errorData = result;
                    res.status(201).json({
                        message: "Added",
                        data: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err,
                        errorData: errorData

                    });
                });
            });
          });
        });

router.post("/login", (req, res) => {
    let messageFailed = "User not found/Password incorrect"
    let fetchedUser;
    Model.findOne({ username: req.body.username })
        .then(un => {
            if (!un) {
                return res.status(200).json({
                    failed: messageFailed
                });
            }
            fetchedUser = un
            return bcrypt.compare(req.body.password, fetchedUser.password);

        })
        .then(result => {
            if (!result) {
                return res.status(200).json({
                    failed: messageFailed
                });
            }
            const token = jwt.sign({ username: fetchedUser.username, userId: fetchedUser._id },
                "secret-this-should-be-longer",
                { expiresIn: "1h" }
            );
            SignedInModel.findOne({ username: fetchedUser.username })
                .then(result => {
                    if (result) {
                        return res.status(200).json({
                            message: "Already signed in"
                        })
                    }
                    const signedIn = new SignedInModel({
                        username: fetchedUser.username,
                        picks: fetchedUser.picks
                    });

                    signedIn.save()
                        .then(result => {
                            res.status(200).json({
                                token: token,
                                message: "Succesful login/Succesful save",
                                user: fetchedUser,
                                result: result
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            });
                        });
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
