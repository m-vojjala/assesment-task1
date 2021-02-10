const express = require('express');
const router = express.Router();
const initHelpers = require('../dbHelpers/likeHelpers');

module.exports = (db) => {
  const likeHelpers = initHelpers(db);

  router.get(`/`, (req, res) => {

    const userId = req.session.user_id;

    // if user exists, can fetch all the likes of a  user
    if (userId) {
      likeHelpers.getUserLikes(userId)
        .then(tweets => {
          tweets.map(tweet => res.status(200).send((`${tweet.username}: ${tweet.tweet}`).toString()));
        })
        .catch(err=>console.log(err));
    }
  });
  return router;
};