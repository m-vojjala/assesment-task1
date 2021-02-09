const express = require('express');
const router = express.Router();
const initHelpers = require('../tweetHelpers');

module.exports = (db) => {
  const helpers = initHelpers(db);
  router.post("/", (req, res) => {
    const user_id = req.session.user_id;
    const { tweet } = req.body;
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    if (user_id) {
      if (tweet.length < 140) {
        helpers.createTweet(tweet, user_id, today)
          .then(response => {
            res.send(response)
          })
      } else {
        res.send("Tweet is too long!")
      }
    };
  });
  return router;
}