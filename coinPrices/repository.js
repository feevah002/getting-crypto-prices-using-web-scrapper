const axios = require("axios")

exports.addPri
exports.getPrices = async (url)=>{
// collects data(url) from the controller js
    const data = await axios.get(url)
    return data
}
