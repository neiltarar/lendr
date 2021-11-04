const express = require("express");
const geocoderController = express.Router();

const res = await geocoder.geocode('29 champs elysée paris');
console.log(res)

module.exports = geocoderController;