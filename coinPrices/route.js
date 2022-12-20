const router = require("express").Router()
const {
  getCryptoPrice
} = require("./controller")

router.get("/api/coin-prices", getCryptoPrice)

module.exports= router