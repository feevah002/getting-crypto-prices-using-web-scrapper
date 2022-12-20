const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  rank:{type:String},
  name:{type:String},
  price:{type:String},
  "24h":{type:String},
  "7d":{type:String},
  marketCap:{type:String},
  volume:{type:String},
  circulatingSupply:{type:String},
  "7 days graph":{type:String},
})

const cryptoPriceSchema = new  mongoose.Schema({
  cryptoPrices:[priceSchema]
},{
  timestamps:true
})



module.exports = mongoose.model("cryptoPrice", cryptoPriceSchema)