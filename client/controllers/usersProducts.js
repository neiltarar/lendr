const sessionAuth = require("../middleware/sessionAuth");
const usersDB = require("../models/users");
const usersProductsDB = require("../models/usersProducts");
const express = require("express");
const connectPgSimple = require("connect-pg-simple");
const usersProductsController = express.Router();
// Get date and time to use in reviews
const today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

usersProductsController.post('/review', sessionAuth, (req, res) => {
    dateTime = date+" "+time;
    const { rating, productId, review } = req.body;
    const userEmail = req.session.username;
    usersDB.getUser(userEmail).then((res) => {
        const userId = res[0].user_id;
        usersProductsDB.addReview(review, rating, dateTime, userId, productId);
    });
    
    res.json({"status":"review added"});
});
usersProductsController.delete("/:id", sessionAuth, (req, res) => { //delete product by id
    const id = req.params.id
    const userId = req.session.userId
    console.log(userId)

    usersProductsDB.deleteProduct(id, userId).then(() => {
            res.status(200).send()
            console.log(`deleted product: ${id}`)
    })
});

usersProductsController.post("/host", sessionAuth, (req, res) => { //add product
    const { name, description, address, availability, image, category, price } = req.body
    console.log(req.body)
    const userId = req.session.userId //getting user_id from sessions

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
    } else if (image === undefined || image === '') {
        res.status(400).json({ message: 'imageurl not defined' })
        return
    } else if (category === undefined || category === '') { 
        res.status(400).json({ message: 'category not defined' })
    } else if (price === undefined || price === '') { 
        res.status(400).json({ message: 'category not defined' })
    } else {
        usersProductsDB.addNewProduct(name, description, address, availability, image, category, price, userId).then((products) => {
            res.status(201).send()
            res.json(products);
            console.log(`added product: ${name}`);
        })
    }
}); //do we need an error handler here?

usersProductsController.post("/:id", sessionAuth, (req, res) => { //update product all parameters
    const { name, description, address, availability, category } = req.body

    const product_id = req.params.id
    const userId = req.session.userId

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
        usersProductsDB.addNewProduct(name, description, address, availability, category, product_id, userId).then((products) => {
            res.status(201).send()
            res.json(products);
            console.log(`updated product: ${name}`);
        });
    }
});

//Need to add update product by ONE Parameter
module.exports = usersProductsController;