const express = require('express');
const router = express.Router();
const initHelpers = require('../dbHelpers/likeHelpers');

module.exports = (db) => {
  const likeHelpers = initHelpers(db);
  router.post(`/:tweetId/`, (req, res) => {
    const tweetId = req.params.tweetId;
    const userId = req.session.user_id;
    if(userId){
     likeHelpers.userLikes(tweetId,userId)
     .then(result=>console.log(result))
    }
  });
  return router;
};