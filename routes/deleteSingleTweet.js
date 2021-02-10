const express = require('express');
const router = express.Router();
const initHelpers = require('../dbHelpers/tweetHelpers');

module.exports = (db) => {
  const tweetHelpers = initHelpers(db);
  router.delete(`/:tweetId/`, (req, res) => {
    const tweetId = req.params.tweetId;
    const userId = req.session.user_id;
    if (userId) {
      tweetHelpers.deleteSingleTweet(tweetId, userId)
        .then(result => res.sendStatus(204))
        .catch(err => console.log(err));
    } else {
      res.sendStatus(404);
    }
  });
  return router;
};