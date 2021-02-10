const express = require('express');
const router = express.Router();
const initHelpers = require('../dbHelpers/tweetHelpers');
const currentDate = require('./date');


module.exports = (db) => {
  const tweetHelpers = initHelpers(db);

  router.put("/:tweetId/", (req, res) => {

    const userId = req.session.user_id;
    const { tweet } = req.body;
    const tweetId = req.params.tweetId;

    const today = currentDate();

    // if user exists, able to update the tweet
    if (userId) {
      if (tweet.length < 140) {
        tweetHelpers.updateTweet(tweet, tweetId, userId, today)
          .then(response => {
            res.send(response);
          })
          .catch(err=>console.log(err));
      } else {
        res.send("Tweet is too long!")
      }
    };
  });
  return router;
};