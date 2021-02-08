const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const { Pool } = require('pg');
require('dotenv').config();
const initHelpers = require('./helpers.js');

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
})
db.connect().then(() => console.log('db conected'));


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
            res.redirect("/")
          })
      } else {
        res.send("user already exists!")
      }
    });
});

app.listen(8990, () => {
  console.log(`server is running on port 8990`);
});