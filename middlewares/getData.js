const schema = require("../models/schema");
const mongo = require('mongoose')

const getData = (req, res) => {
    const institute = req.query.institute;
    const branch = decodeURIComponent(req.query.branch);
    const year = req.query.year;
    if(institute && branch && year){
        const model = mongo.model(year, schema)
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
            
            return res.json(dataFound);
        })
    }
    else return res.json({error: "Invalid parameters", params: req.query});
}

module.exports = getData;