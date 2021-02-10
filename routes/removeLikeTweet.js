const express = require('express');
const router = express.Router();
const initHelpers = require('../dbHelpers/likeHelpers');

module.exports = (db) => {
  const likeHelpers = initHelpers(db);
  router.delete(`/:tweetId/`, (req, res) => {
    const tweetId = req.params.tweetId;
    const userId = req.session.user_id;
    if(userId){
   likeHelpers.unLikeTweet(tweetId,userId)
   .then(result=>res.sendStatus(204))
   .catch(err=>console.log(err))
    };
  });
  return router;
};