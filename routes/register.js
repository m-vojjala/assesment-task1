const express = require('express');
const router = express.Router();
const initHelpers = require('../helpers');

module.exports = (db) => {
  const helpers = initHelpers(db);
  router.post("/", (req, res) => {
    const { userName, password } = req.body;
    if(userName){
    helpers.getUserbyUserName(userName)
      .then(user => {
        if (!user) {
          helpers.addNewUser(userName, password)
            .then(newUser => {
              console.log(newUser);
              res.send("registration success")
            })
            .catch(err => console.log(err))
        } else {
          res.send("user already exists!")
        }
      });
    }else{
      res.send("Email should not be empty!")
    }
  });
  return router;
};
