const express = require('express');
const router = express.Router();
const initHelpers = require('../dbHelpers/helpers');

module.exports = (db) => {
  const helpers = initHelpers(db);

  router.get("/", (req, res) => {

    const receiverId = req.session.user_id;

    //  user able to read all the receiveed messages from different users
    if (receiverId) {
      helpers.receivedMessages(receiverId)
        .then(message => res.send(message))
        .catch(err=>console.log(err));
    };
  });
  return router;
};