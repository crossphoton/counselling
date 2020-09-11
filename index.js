const express = require('express');
const app = express();
const mongo = require('mongoose');
const cors = require("cors");
const getData = require('./middlewares/getData');

app.use(cors());

mongo.connect(process.env.dbUrl,
{useNewUrlParser: true, useUnifiedTopology: true},
(err, database)=>{
    if(err) throw err;
    console.log("Database connected.!!!");
});

app.use(express.json())

app.get("/v1/josaa-data", (req, res)=>getData(req, res));


app.listen(process.env.PORT|| 80, ()=>console.log("Server Up and good!!")); 