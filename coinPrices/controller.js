const{
  getPrices
} = require("./repository")
const cryptoPrice = require("./model")
const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")

exports.getCryptoPrice = async(req,res)=>{
  try{
    // creating a mini model to match the schema
    const keys = [
      "rank",
      "name",
      "price",
      "24h",
      "7d",
      "marketCap",
      "volume",
      "circulatingSupply",
      "7 days graph"
    ]
    const coinArr = []
    // website being scrapped
    const url = "https://coinmarketcap.com/"
      
    const { data } = await getPrices(url)
    const elmSelector = "#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div:nth-child(1) > div.sc-f7a61dda-2.efhsPu > table > tbody > tr"
    const $ = cheerio.load(data)
    // getting each crypto with its details
    $(elmSelector).each((parentIndx, parentElm)=>{
      let keyIndx = 0
      const coinObj = {}
      // getting the first 10 crypto prices
      if(parentIndx < 10){ 
        // getting the details from each crypto
        $(parentElm).children().each((childIndx, childElm)=>{
          let values = $(childElm).text()
          if(values){
            if(keyIndx === 1 ){
              values = $('p:nth-child(1)', $(childElm).html()).text()
            }
            if(keyIndx === 6){
              values = $('p > span:nth-child(2)', $(childElm).html()).text()
            }
            coinObj[keys[keyIndx]] = values
        
            keyIndx++
          }
        })
        coinArr.push(coinObj)
      }
      
    })
    const prices = await cryptoPrice.findOne({})
    // this application creates the data once in the db then checks the created one and keeps updating it anytime the user refeshes
      if(prices.length !== 0){
        const priceUpd =await cryptoPrice.findOneAndUpdate({},{cryptoPrices:coinArr})
        res.status(200).json({
          data:priceUpd
        })
      } else{
       const cryptoPrice = await cryptoPrice.create({
        cryptoPrices:coinArr
       })
       res.status(200).json({
        data:cryptoPrice
      })
     
      }
  } catch(err){
    console.error(err.message)
  }
}

