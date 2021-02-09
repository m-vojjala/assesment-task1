const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const { Pool } = require('pg');
require('dotenv').config();
const initHelpers = require('./helpers.js');
const cookieSession = require('cookie-session');

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
})
db.connect().then(() => console.log('db conected'));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const helpers = initHelpers(db);

app.post("/register", (req, res) => {
  const { userName, password } = req.body;
  helpers.getUserbyUserName(userName)
    .then(user => {
      if (!user) {
        helpers.addNewUser(userName, password)
          .then(newUser => {
            console.log(newUser);
            res.send("registration success")
          });
      } else {
        res.send("user already exists!")
      }
    });
});

app.post("/login", (req, res) => {
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
          });
      }
    });
});
if (!module.parent) {
  app.listen(6667, () => {
    console.log(`server is running on port 6667`);
  });
}


module.exports = app;