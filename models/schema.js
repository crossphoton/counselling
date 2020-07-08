const mongo = require("mongoose")

const schema = new mongo.Schema({
    name: String,
    shortID: String,
    fullName: String,
    gen : [{branch: String, data:[]}],
    obc : [{branch: String, data:[]}],
    sc : [{branch: String, data:[]}],
    st : [{branch: String, data:[]}],
    ews : [{branch: String, data:[]}],
    gen_fem : [{branch: String, data:[]}],
    st_fem : [{branch: String, data:[]}],
    sc_fem : [{branch: String, data:[]}],
    obc_pwd : [{branch: String, data:[]}],
    gen_pwd : [{branch: String, data:[]}],
    obc_fem : [{branch: String, data:[]}],
    ews_fem : [{branch: String, data:[]}]
});

module.exports = schema;
