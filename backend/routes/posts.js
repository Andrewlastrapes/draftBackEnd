const express = require('express');
const router = express.Router();
const Model = require("../models/postModel");


router.post("", (req, res) => {

    const model = new Model({
        name: req.body.user,
        picks: req.body.golfer
    });
    model.save()
    res.status(201).json({
        message: "Added"
    })

})

module.exports = router;