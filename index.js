const express = require('express');
const app = express();
const mongo = require('mongoose');
const getData = require('./middlewares/getData');

mongo.connect(process.env.dbUrl,
{useNewUrlParser: true, useUnifiedTopology: true},
(err, database)=>{
    if(err) throw err;
    console.log("Database connected.!!!");
});

app.use(express.json())

app.get("/v1/josaa-data", (req, res)=>getData(req, res));

// ?institute=iiitr&category=gen&year=2019&branch=Computer Science and Engineering


app.listen(process.env.PORT|| 80, ()=>console.log("Server Up and good!!"));