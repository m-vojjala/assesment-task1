const express = require('express');
const router = express.Router();
const initHelpers = require('../tweetHelpers');

module.exports = (db) => {
  const helpers = initHelpers(db);
  router.put("/:tweetId/", (req, res) => {
    const userId = req.session.user_id;
    const { tweet } = req.body;
    const tweetId = req.params.tweetId;
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    if (userId) {
      if (tweet.length < 140) {
        helpers.updateTweet(tweet, tweetId, userId, today)
          .then(response => {
            res.send(response);
          })
      } else {
        res.send("Tweet is too long!")
      }
    };
  });
  return router;
};