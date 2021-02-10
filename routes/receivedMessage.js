const express = require('express');
const router = express.Router();
const initHelpers = require('../dbHelpers/helpers');

module.exports = (db) => {
  const helpers = initHelpers(db);
  router.get("/", (req, res) => {
    const receiverId = req.session.user_id;
    // if receiver_id exists, getting all the messages of a that particular user.
    if (receiverId) {
      helpers.receivedMessages(receiverId)
        .then(message => res.send(message));
    };
  });
  return router;
};