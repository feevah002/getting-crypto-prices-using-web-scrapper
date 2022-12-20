const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const priceApiRoute = require("./coinPrices/route")
app.use(priceApiRoute)

main().catch(err=>{
  console.log(err)
})

async function main(){
  await mongoose.connect("mongodb://localhost:27017/webScrapper")
}

app.listen(3000, ()=>{
  console.log("started server")
})
