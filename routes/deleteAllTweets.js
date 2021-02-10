const express = require('express');
const router = express.Router();
const initHelpers = require('../dbHelpers/tweetHelpers');

module.exports = (db) => {
  const tweetHelpers = initHelpers(db);

  router.delete(`/`, (req, res) => {

    const userId = req.session.user_id;

    //delete all the tweets of a user
    tweetHelpers.deleteAllTweets(userId)
      .then((result) => res.sendStatus(204))
      .catch(err=>console.log(err));
  });
  return router;
};