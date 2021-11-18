const express = require("express");
// // const router = require("../middleware/logger");
const conversationsController = express.Router();
const productsDB = require("../models/products");
const conversationsDB = require("../models/conversations");

conversationsController.get(`/product/:id`, (req, res) => {
  console.log("req received: " + req.params.id);
  const productId = req.params.id;
  const username = req.session.username;
  conversationsDB.insertConversation(productId, 4, req.session.userId);
  productsDB.getById(productId).then((product) => {
    res.json({ user: username, products: product });
  });
});

module.exports = conversationsController;
