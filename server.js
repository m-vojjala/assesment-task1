const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
  res.send("Hello")
})

app.listen(8080,()=>{
  console.log(`server is running on port 8080`);
});