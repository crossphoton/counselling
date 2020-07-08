const iiitData = require("../assets/iiitList.json");
const schema = require('../models/schema');
const mongo = require("mongoose");

const saveData = (req, res) =>{
    const model = mongo.model(req.params.year, schema)
    var branch = req.body.branch;
    var recievedData = req.body.data;
    var institute = req.params.institute;
    var category = req.params.category;
    model.findOne({"shortID" : institute}, async (err, data)=>{
        if(err) throw err;
        if(!data){
            var instituteData;
            iiitData.forEach(item => {
                if(item.shortID == institute) instituteData = item
            })
            const toSave = new model({
                name: instituteData.name,
                shortID: institute,
                fullName: instituteData.fullName
            })
            toSave[category].push({
                branch: branch,
                data: recievedData
            });
            const save = await toSave.save();
        }
        else {
            if(data[category][0]){
                var updated = false;
                data[category].forEach(item =>{
                    if(item.branch == branch) {
                        updated = true;
                        return item.data = recievedData;
                    }
                });
                if(!updated) {
                    data[category].push({
                        branch: branch,
                        data: recievedData
                    })
                }
            }
            else {
                data[category].push({
                    branch: branch,
                    data: recievedData
                })
            }
            model.replaceOne({_id: data._id}, data, (err, data)=>{
                if(err) throw err;
            })
        };
        res.sendStatus(200);
    })
}

module.exports = saveData;