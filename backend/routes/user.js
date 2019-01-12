const express = require('express');
const router = express.Router();
const Model = require("../models/registerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



router.post("/register", (req, res) => {

    let errorData;

    if (!req.body.username) {
        return res.status(200).json({
            err: "Enter a username"
        });
    }
    Model.findOne({ username: req.body.username })
        .then((data) => {
            if (data) {
                return res.status(200).json({
                    err: "Username already registered."
                })
            }
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const model = new Model({
                        username: req.body.username,
                        password: hash,
                        active: false,
                        signedIn: false

                    });
                    model.save()
                        .then(result => {
                            errorData = result;
                            res.status(200).json({
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



            Model.findOneAndUpdate({ username: req.body.username },
                { signedIn: true },
                function (error) {
                    if (error) {
                        console.log(error + "Erroorororor");
                    } else {
                        res.status(200).json({
                            token: token,
                            message: "succesul login",
                            user: req.body.username,
                            result: result
                        });
                    }

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

router.get("/get-users", (req, res) => {
    let signedInUsers = []
    Model.find().then(data => {
        console.log("Model find" + data)
        data.filter((user) => {
            if (user["signedIn"] === true) {
                signedInUsers.push(user)
            }
            console.log("signed in users" + signedInUsers)
        })
        res.status(200).json({
            data: signedInUsers
        })
    })
})

router.post("/set-active-user", (req, res) => {

    Model.findOneAndUpdate(
        { active: true },
        { active: false }
    ),
        (error) => {
            if (error) {
                console.log(error)
            } else {
                Model.findOneAndUpdate(
                    { username: req.body.username },
                    { active: true },
                    (data, error) => {
                        if (error) {
                            console.log("error")
                        } else {
                            res.status(200).json({
                                data: data
                            });
                            console.log("activated user")
                        }
                    });
            }
        }


});

    router.get("/get-active-user", (req, res) => {
        Model.findOne({
            active:true
        }).then(data => {
            res.status(200).json({
                data: data
            })
        })
    })







module.exports = router;
