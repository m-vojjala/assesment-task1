const express = require('express');
const router = express.Router();
const moment = require('moment');
const initHelpers = require('../dbHelpers/helpers');

module.exports = (db) => {
  const helpers = initHelpers(db);

  router.post("/", (req, res) => {

    const { receiver_username, content } = req.body;
    const senderId = req.session.user_id;

    // if user exists, able to send messages to other users
    if (senderId) {
      if (content.length < 25) {
        helpers.getUsernameById(senderId)
          .then(senderUsername => {
            if (receiver_username) {
              helpers.addNewMessage(senderUsername, senderId, content, receiver_username, moment().format('h:mm a'))
                .then(message => res.send("Message: " + message.content))
                .catch(err => console.log(err));
            } else {
              res.send("receiver_username should not be empty!")
            }
          });
      } else {
        res.send("message is too long")
      }
    } else {
      res.send("Please login!")
    }
  });
  return router;
};