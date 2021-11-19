const express = require("express");
// // const router = require("../middleware/logger");
const conversationsController = express.Router();
const productsDB = require("../models/products");
const conversationsDB = require("../models/conversations");
const usersDB = require("../models/users");

conversationsController.get(`/product/:id`, (req, res) => {
  const productId = req.params.id;
  const username = req.session.username;
  let userID = 0;
  usersDB.getUser(username).then((user) => {
    userID = user[0].user_id;
  });
  // Get product information to be put on the conversations database
  productsDB.getById(productId).then((product) => {
    // check if any conversation has started for the given product
    conversationsDB.getByProductId(productId).then((res) => {
      if (
        res === undefined ||
        (productId !== res.productid && userID !== res.sessionuser_id)
      ) {
        // if this is the message create a conversation in conversations DB
        conversationsDB.insertConversation(
          product.name,
          product.user_id,
          userID,
          productId
        );
      }
    });

    res.json({ user: username, products: product });
  });
});

module.exports = conversationsController;
