const express = require('express');
const router = express.Router();
const initTweetHelpers = require('../dbHelpers/tweetHelpers');
const initHelpers = require('../dbHelpers/helpers');

module.exports = (db) => {
  const tweetHelpers = initTweetHelpers(db);
  const helpers = initHelpers(db);
  router.get("/", (req, res) => {
    tweetHelpers.readAllTweets()
      .then((tweets) => {
        tweets.map(tweet => {
          helpers.getUsernameById(tweet.created_by)
            .then((userName) => res.status(200).send((`${userName}: ${tweet.tweet}`).toString()));
        });
      });
  });
  return router;
};