const schema = require("../models/schema");
const mongo = require('mongoose')
const getInstitute = require('./getInstitute')

const getData = (req, res) => {
    const model = mongo.model(req.query.year, schema)
    const institute = req.query.institute;
    const branch = decodeURIComponent(req.query.branch);
    var dataFound;
    model.findOne({"shortID": institute}, (err, data)=> {
        if(err) throw err;
        if(!data){
            dataFound = [{round: "null", opening: 0, closing: 0}];
            return res.render('searchResult', {iiit: getInstitute(req.query.institute),
                            year: req.query.year,
                            category: req.query.category,
                            title: getInstitute(req.query.institute).name+" - "+req.query.year,
                            branch: decodeURIComponent(req.query.branch),
                            data: dataFound});
        }
        dataFound = [{round: "null", opening: 0, closing: 0}];
        data[req.query.category].forEach(item => {
            if(item.branch == branch) dataFound = item.data;
        });
        
        return res.render('searchResult', {iiit: getInstitute(req.query.institute),
            title: getInstitute(req.query.institute).name+" - "+req.query.year,
            year: req.query.year,
            category: req.query.category,
            branch: decodeURIComponent(req.query.branch),
            data: dataFound});
    })
}

module.exports = getData;