const express = require('express');
const bodyParser = require("body-parser");
const app = express();
 const { Pool } = require('pg');
 require('dotenv').config();

 const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
})
db.connect().then(() => console.log('db conected'));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/register",(req,res)=>{
  res.send("Hello")
})

app.listen(8990,()=>{
  console.log(`server is running on port 8990`);
});