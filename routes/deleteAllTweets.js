const express = require('express');
const router = express.Router();
const initHelpers = require('../tweetHelpers');

module.exports = (db) => {
  const helpers = initHelpers(db);
  router.delete(`/`, (req, res) => {
    const userId = req.session.user_id;
    helpers.deleteAllTweets(userId)
      .then((result) => res.sendStatus(204))
  });
  return router;
};