const express = require('express');
const router = express.Router();
const moment = require('moment');
const initHelpers = require('../helpers');

module.exports = (db) => {
  const helpers = initHelpers(db);

  router.post("/", (req, res) => {
    const { receiver_username, content } = req.body;
    const sender_id = req.session.user_id;
    // checking if sender_id exists
    if (sender_id) {
      if (content.length < 25) {
        // if sender exists, getting username using id and adding the new message to the database.
        helpers.getUsernameById(sender_id)
          .then(sender_username => {
            if (receiver_username) {
              helpers.addNewMessage(sender_username, sender_id, content, receiver_username, moment().format('h:mm a'))
                .then(message => res.send("Message :" + message.content))
                .catch(err => console.log(err));
            } else {
              res.send("Receiver_username is")
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