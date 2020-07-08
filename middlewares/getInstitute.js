const data = require("../assets/iiitList.json")

const getInstitute = (insti) =>{
    var institute;
    data.forEach(item =>{
        if(insti == item.shortID) institute = item
    })
    return institute;
}

module.exports = getInstitute;