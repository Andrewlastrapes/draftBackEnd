const express = require('express');
const router = express.Router();
const Model = require("../models/postModel");
const Post = require("../models/registerModel");


router.post("", (req, res) => {
  Post.findOneAndUpdate({username: req.body.user},
  {$push: {picks: req.body.golfer}},
  function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    });
})


router.post("", (req, res) => {
    
    Post.findOne({username: req.body.user}, function (err, Post) {
        console.log(req.body.user)
        if (err) return handleError(err);
      
        Post.set({ picks: req.body.golfer});
        Post.save(function (err, updatedPost) {
          if (err) return handleError(err);
          res.send(updatedPost);
        });
      });
})

module.exports = router;