const express = require('express');
const router = express.Router();
const initHelpers = require('../helpers');

module.exports = (db) => {
  const helpers = initHelpers(db);
  router.get("/", (req, res) => {
    const receiver_id = req.session.user_id;
    // if receiver_id exists, getting all the messages of a that particular user.
    if (receiver_id) {
      helpers.receivedMessages(receiver_id)
        .then(message => res.send(message));
    };
  });
  return router;
};