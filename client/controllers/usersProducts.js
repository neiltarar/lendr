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
const cloudinary = require("cloudinary");

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
    console.log(userId)

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
    } else if (price === undefined || price === '' ) { 
        res.status(400).json({ message: 'price not defined' })
    } else {
        // todo: save image onto cloudinary before saving to the database
        console.log(image);
        function uploadToCloudinary(image){
            cloudinary.uploader.upload(image, result => {

                // This will return the output after the code is exercuted both in the terminal and web browser
                // When successful, the output will consist of the metadata of the uploaded file one after the other. These include the name, type, size and many more.
                console.log(result)
                if (result.public_id) {
                
                // The results in the web browser will be returned inform of plain text formart. We shall use the util that we required at the top of this code to do this.
                    res.writeHead(200, { 'content-type': 'text/plain' });
                    res.write('received uploads:\n\n');
                    res.end(util.inspect({ fields: fields, files: files }));
                }
            });

        }
        
        // provide a random name to the image
        usersProductsDB.addNewProduct(name, description, address, availability, image, category, price, userId).then((products) => {
            res.status(201).send(products)
            console.log(products)
            console.log(`added product: ${name}`);
        })
    }
}); 

usersProductsController.patch("/:id", sessionAuth, (req, res) => { //update product all parameters
    const { name, description, address, availability, image, category, price } = req.body
    console.log(req.body)
    const productId = req.params.id
    console.log(productId)
    const userId = req.session.userId
    console.log(userId)

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
    } else if (price === undefined || price === '' ) { 
        res.status(400).json({ message: 'price not defined' })
    } else {
        usersProductsDB.addNewProduct(name, description, address, availability, image, category, price, productId, userId).then((products) => {
            res.status(201).json( products, {message: "Product updated" } );
            console.log(`updated product: ${name}`);
        });
    }
});

//Need to add update product by ONE Parameter
module.exports = usersProductsController;