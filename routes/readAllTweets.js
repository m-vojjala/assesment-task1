const express = require('express');
const router = express.Router();
const initHelpers1 = require('../tweetHelpers');
const initHelpers2 = require('../helpers');

module.exports = (db) => {
  const helpers1 = initHelpers1(db);
  const helpers2 = initHelpers2(db);
  router.get("/", (req, res) => {
    helpers1.readAllTweets()
      .then((tweets) => {
        tweets.map(tweet => {
          helpers2.getUsernameById(tweet.created_by)
            .then((userName) => console.log(tweet.tweet, userName));
        });
      });
  });
  return router;
};