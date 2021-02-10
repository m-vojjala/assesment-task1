const express = require('express');
const router = express.Router();
const initHelpers = require('../dbHelpers/tweetHelpers');

module.exports = (db) => {
  const tweetHelpers = initHelpers(db);
  router.get(`/:tweetId/`, (req, res) => {
    const tweetId = req.params.tweetId;
    const userId = req.session.user_id;
    if (userId) {
      tweetHelpers.readTweet(tweetId, userId)
        .then((tweet) => {
          if (tweet) {
            res.send(tweet.tweet)
          } else {
            res.sendStatus(404);
          }
        })
        .catch(err => console.log(err));
    }
  });
  return router;
};