const express = require("express");
// // const router = require("../middleware/logger");
const conversationsController = express.Router();

conversationsController.get("/product", (req, res) => {
  console.log("hello");
  res.json({ message: res });
});

module.exports = conversationsController;
