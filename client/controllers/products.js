const express = require("express");
const productsController = express.Router();
const productsDB = require("../models/products");

productsController.get("/", (req, res) => { //getting all products
    productsDB.getAll().then((products) => {

        if (products.length > 0) {
            res.json(products)
            console.log("getting all products")
        } else {
            res.status(500).json({ message: "Cannot fetch products" });
        }
    })
});

productsController.get("/:id", (req, res) => { //getting product by id
    const id = req.params.id

    productsDB.getById(id).then((products) => {
        if (products) {
            res.json(products)
            console.log(products)
            console.log(`getting a single product, product_id: ${id}`)
        } else {
            res.status(500).json({ message: `Cannot fetch product_id: ${id}` });
        }
    })
});

module.exports = productsController;