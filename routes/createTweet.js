const express = require('express');
const router = express.Router();
const initHelpers = require('../dbHelpers/tweetHelpers');
const currentDate = require('./date');


module.exports = (db) => {
  const tweetHelpers = initHelpers(db);

  router.post("/", (req, res) => {

    const userId = req.session.user_id;
    const { tweet } = req.body;

    // fetch current date
    const today = currentDate();

    // if user exists and tweet size is leess than 140 characters then neww tweet is  added to database
    if (userId) {
      if (tweet.length < 140) {
        tweetHelpers.createTweet(tweet, userId, today)
          .then(response => {
            res.send(response)
          })
          .catch(err=>console.log(err));
      } else {
        res.send("Tweet is too long!")
      }
    };
  });
  return router;
}