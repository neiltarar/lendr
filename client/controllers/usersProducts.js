const sessionAuth = require("../middleware/sessionAuth");
const usersDB = require("../models/users");
const usersProductsDB = require("../models/usersProducts");
const express = require("express");
const usersProductsController = express.Router();

usersProductsController.post('/review', sessionAuth, (req, res) => {
    const { rating, review } = req.body;
    const userEmail = req.session.username;
    usersDB.getUser(userEmail).then((res) => {
        const userID = res[0].user_id;
        usersProductsDB.getProductID(userID).then((res) => {
            const productID = res[0].id;
            productsDB.insertReview(review, rating, userID, productID);
        })
    });
});
usersProductsController.delete("/:id", sessionAuth, (req, res) => { //delete product by id
    const id = req.params.id

    usersProductsDB.getById(id).then((products) => {
        if (products.length > 0) {
            res.json(products)
            console.log(`delete product: ${id}`)
        } else {
            res.status(500).json({ message: `Cannot delete product_id: ${id}` });
        }
    })
});

usersProductsController.post("/add", sessionAuth, (req, res) => { //add product
    const { name, description, address, availability, category } = req.body

    const user_id = req.session.userId //getting user_id from sessions

    if (name === undefined || name === '' || name.length > 20) {
        res.status(400).json({ message: 'name not defined' })
        return
    } else if (description === undefined || description === '' || description.length > 50) {
        res.status(400).json({ message: 'description not defined' })
        return
    } else if (address === undefined || address === '' || address.length > 20) {
        res.status(400).json({ message: 'address not defined' })
        return
    } else if (availability === undefined || availability === '') {
        res.status(400).json({ message: 'availbility not defined' })
        return
    } else if (category === undefined || category === '') { //category will just be a drop down option?
        res.status(400).json({ message: 'category not defined' })
    } else {
        usersProductsDB.addNewProduct(name, description, address, availability, category, user_id).then((products) => {
            res.status(201)
            res.json(products);
            console.log(`added product: ${name}`);
        })
    }
}); //do we need an error handler here?

usersProductsController.post("/:id", sessionAuth, (req, res) => { //update product all parameters
    const { name, description, address, availability, category } = req.body

    const product_id = req.params.id

    if (name === undefined || name === '' || name.length > 20) {
        res.status(400).json({ message: 'name not defined' })
        return
    } else if (description === undefined || description === '' || description.length > 50) {
        res.status(400).json({ message: 'description not defined' })
        return
    } else if (address === undefined || address === '' || address.length > 20) {
        res.status(400).json({ message: 'address not defined' })
        return
    } else if (availability === undefined || availability === '') {
        res.status(400).json({ message: 'availbility not defined' })
        return
    } else if (category === undefined || category === '') { //category will just be a drop down option?
        res.status(400).json({ message: 'category not defined' })
    } else {
        usersProductsDB.addNewProduct(name, description, address, availability, category, product_id).then((products) => {
            res.status(201)
            res.json(products);
            console.log(`updated product: ${name}`);
        });
    }
});

//Need to add update product by ONE Parameter
module.exports = usersProductsController;