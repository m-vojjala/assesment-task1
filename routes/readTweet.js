const express = require('express');
const router = express.Router();
const initHelpers = require('../tweetHelpers');

module.exports = (db) => {
  const helpers = initHelpers(db);
  router.get(`/:tweetId/`, (req, res) => {
    const tweetId = req.params.tweetId;
    const userId = req.session.user_id;
    if (userId) {
      helpers.readTweet(tweetId, userId)
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