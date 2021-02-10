const express = require('express');
const bodyParser = require("body-parser");

const morgan = require('morgan');
const { Pool } = require('pg');
require('dotenv').config();
const cookieSession = require('cookie-session');

const app = express();

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
const loginRoutes = require("./routes/login");
const sendMessageRoutes = require("./routes/sendMessage");
const receivedMessageRoutes = require("./routes/receivedMessage");
const createTweet = require("./routes/createTweet");
const readTweets = require("./routes/readAllTweets");
const readSingleTweet = require("./routes/readTweet");
const updateTweet = require("./routes/updateTweet");
const deleteAllTweets = require("./routes/deleteAllTweets");
const deleteSingleTweet = require("./routes/deleteSingleTweet");
const likeTweet = require("./routes/likeTweet");
const getAllLikeTweets = require("./routes/getAllLikeTweets");
const removeLikedTweet = require("./routes/removeLikeTweet")


app.use("/register", registerRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/message", sendMessageRoutes(db));
app.use("/receivedMessage", receivedMessageRoutes(db));
app.use("/user/tweet", createTweet(db));
app.use("/tweets", readTweets(db));
app.use("/tweet", readSingleTweet(db));
app.use("/user/tweet", updateTweet(db));
app.use("/user/tweets/delete", deleteAllTweets(db));
app.use("/user/tweet/delete", deleteSingleTweet(db));
app.use("/user/tweet/like",likeTweet(db));
app.use("/user/tweets/likes",getAllLikeTweets(db));
app.use("/user/tweet/unlike",removeLikedTweet(db));




app.listen(8990, () => {
  console.log(`server is running on port 8990`);
});

module.exports = app;