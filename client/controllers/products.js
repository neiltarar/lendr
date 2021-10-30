const express = require("express");
const productsController = express.Router();
const usersDB = require("../models/users");
const productsDB = require("../models/products");

productsController.post('/review', (req, res) => {
    const {rating, review} = req.body;
    const userEmail = req.session.username;
    usersDB.getUser(userEmail).then((res) => {
     const userID = res[0].user_id;
     productsDB.getProductID(userID).then((res) => {
       const productID = res[0].id;
       productsDB.insertReview(review, rating, userID, productID);
     })
   });
  });

module.exports = productsController;
