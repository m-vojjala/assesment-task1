const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');
const { Pool } = require('pg');
require('dotenv').config();
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
}));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login")

app.use("/register", registerRoutes(db));
app.use("/login", loginRoutes(db));



app.listen(6667, () => {
  console.log(`server is running on port 6667`);
});

module.exports = app;