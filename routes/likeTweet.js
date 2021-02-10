const express = require('express');
const router = express.Router();
const initHelpers = require('../dbHelpers/likeHelpers');

module.exports = (db) => {
  const likeHelpers = initHelpers(db);

  router.post(`/:tweetId/`, (req, res) => {

    const tweetId = req.params.tweetId;
    const userId = req.session.user_id;

    //  if user exists,user can like tweet and liked tweet is added to database
    if (userId) {
      likeHelpers.userLikes(tweetId, userId)
        .then(result => res.send(result))
        .catch(err=>console.log(err));
    }
  });
  return router;
};