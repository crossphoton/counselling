const express = require('express');
const app = express();
const mongo = require('mongoose');
const iiit = require("./assets/iiitList.json");
const getInstitute = require('./middlewares/getInstitute');
const saveData = require('./middlewares/saveData');
const getData = require('./middlewares/getData');

mongo.connect(process.env.dbUrl,
{useNewUrlParser: true, useUnifiedTopology: true},
(err, database)=>{
    if(err) throw err;
    console.log("Database connected.!!!");
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json())
// app.use(bp.json())

app.get("/feed", (req, res)=> {
    res.render('feedMain', {list: iiit, title: "Data Feeding Portal"});
});

app.get("/feed/:year/:institute/:category", (req, res) =>{
    const institute  = getInstitute(String(req.params.institute));
    res.render('feedForm',
    {institute: institute,
        category: req.params.category,
        title: institute.name+"-"+req.params.year});
});

app.post("/feed/:year/:institute/:category", (req, res)=> saveData(req, res));

app.get("/", (req, res)=>{
    res.render('search', {iiitList: iiit, title: "Counselling Helper"});
})

app.get("/result", (req, res)=>getData(req, res));


app.listen(process.env.PORT|| 80, ()=>console.log("Server running on http://localhost"));