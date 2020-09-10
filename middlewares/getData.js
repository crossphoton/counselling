const schema = require("../models/schema");
const mongo = require('mongoose')

const getData = (req, res) => {
    const model = mongo.model(req.query.year, schema)
    const institute = req.query.institute;
    const branch = decodeURIComponent(req.query.branch);
    var dataFound;
    model.findOne({"shortID": institute}, (err, data)=> {
        if(err) throw err;
        if(!data){
            dataFound = [{round: "null", opening: 0, closing: 0}];
            return res.json(dataFound);
        }
        dataFound = [{round: "null", opening: 0, closing: 0}];
        data[req.query.category].forEach(item => {
            if(item.branch == branch) dataFound = item.data;
        });
        
        return res.json({dataFound});
    })
}

module.exports = getData;