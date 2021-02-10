const express = require('express');
const router = express.Router();
const initTweetHelpers = require('../dbHelpers/tweetHelpers');


module.exports = (db) => {
  const tweetHelpers = initTweetHelpers(db);

  router.get("/", (req, res) => {

    // able to read all tweets of all users
    tweetHelpers.readAllTweets()
      .then((tweets) => {
        res.send(tweets);
      })
      .catch(err => console.log(err))

  });
  return router;
};