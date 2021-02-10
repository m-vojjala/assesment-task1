const express = require('express');
const router = express.Router();
const initHelpers = require('../tweetHelpers');

module.exports = (db) => {
  const helpers = initHelpers(db);
  router.get(`/:tweetId/`, (req, res) => {
    const tweet_id = req.params.tweetId;
    const user_id = req.session.user_id;
    if (user_id) {
      helpers.readTweet(tweet_id, user_id)
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