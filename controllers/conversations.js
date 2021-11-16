const express = require("express");
// // const router = require("../middleware/logger");
const conversationsController = express.Router();
const productsDB = require("../models/products");

conversationsController.get(`/product/:id`, (req, res) => {
  console.log("req received: " + req.params.id);
  const productId = req.params.id;
  const username = req.session.username;
  // username: `${username}`, products: `${product}`

  productsDB.getById(productId).then((product) => {
    // const response = product + username;
    res.json({ user: username, products: product });
  });
});

module.exports = conversationsController;
