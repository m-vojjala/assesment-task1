const express = require('express');
const router = express.Router();
const initHelpers = require('../helpers');

module.exports = (db) => {
  const helpers = initHelpers(db);
  router.post("/", (req, res) => {
    const { userName, password } = req.body;
    helpers.checkUserAuthentication(userName, password)
      .then(user => {
        if (!user) {
          res.send("User does not exist. Please register!")
        } else {
          helpers.getUserbyUserName(userName)
            .then(user => {
              req.session["user_id"] = user.id;
              res.send("Login success");
            })
            .catch(err => console.log(err));
        }
      });
  });
  return router;
};