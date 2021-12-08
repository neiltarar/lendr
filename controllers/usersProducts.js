const sessionAuth = require("../middleware/sessionAuth");
const usersDB = require("../models/users");
const usersProductsDB = require("../models/usersProducts");
const express = require("express");
const connectPgSimple = require("connect-pg-simple");
const usersProductsController = express.Router();
// Get date and time to use in reviews
const today = new Date();
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
const time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//Node geo-coder//
const dotenv = require("dotenv");
const key = process.env.GEOCODING_API_KEY;
const NodeGeocoder = require("node-geocoder");
const { response } = require("express");
const options = {
  provider: "google",

  // Optional depending on the providers
  apiKey: key, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);

//Cloudinary
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
// // cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "LENDR-PRODUCT-IMAGES",
  },
});

const upload = multer({ storage: storage });

// REVIEW SECTION
usersProductsController.post("/review", sessionAuth, (req, res, next) => {
  dateTime = date + " " + time;
  let { rating, productId, review } = req.body;
  console.log(req.body);
  // If no rating is chosen it assigns it to 0 to avoid rendering NAN on the webpage.
  if (rating === undefined) {
    rating = 0;
  }
  const userEmail = req.session.username;
  usersDB.getUser(userEmail).then((res) => {
    const userId = res[0].user_id;
    usersProductsDB.addReview(review, rating, dateTime, userId, productId);
  });

  res.json({ status: "review added" });
});

// DELETE PRODUCT
usersProductsController.delete("/:id", sessionAuth, (req, res) => {
  //delete product by id
  const id = req.params.id;
  const userId = req.session.userId;
  console.log(userId);

  usersProductsDB.deleteProduct(id, userId).then(() => {
    res.status(200).send();
    console.log(`deleted product: ${id}`);
  });
});

// ADD A NEW PRODUCT (HOST A NEW ITEM)
usersProductsController.post(
  "/host",
  upload.single("product-image"),
  function (req, res, next) {
    // req.file is the `profile-file` file
    console.log(JSON.stringify(req.file.path));
    res.json({ status: "image uploaded" });
    next();
  }
);

// usersProductsController.post("/host", sessionAuth, (req, res) => { //add product
//     const { name, description, availability, formattedaddress, longitude, latitude, image, category, price } = req.body
//     console.log(req.body)

//     const userId = req.session.userId //getting user_id from sessions
//     console.log(userId)

//     if (name === undefined || name === '' || name.length > 20) {
//         res.status(400).json({ message: 'name not defined' })
//         return
//     } else if (description === undefined || description === '' || description.length > 50) {
//         res.status(400).json({ message: 'description not defined' })
//         return
//     } else if (formattedaddress === undefined || formattedaddress === '') {
//         console.log(formattedaddress)
//         console.log("formatted address not found")
//         return
//     } else if (longitude === undefined || longitude === '') {
//         console.log("longitude not found")
//         return
//     } else if (latitude === undefined || latitude === '') {
//         console.log("latitude not found")
//         return
//     } else if (availability === undefined || availability === '') {
//         res.status(400).json({ message: 'availability not defined' })
//         return
//     } else if (image === undefined || image === '') {
//         res.status(400).json({ message: 'imageurl not defined' })
//         return
//     } else if (category === undefined || category === '') {
//         res.status(400).json({ message: 'category not defined' })
//     } else if (price === undefined || price === '') {
//         res.status(400).json({ message: 'price not defined' })
//     } else {
//         console.log("adding product")
//         // geocode(address).then((geocodedaddress) => {
//         //     console.log(geocodedaddress)

//         usersProductsDB.addNewProduct(name, description, formattedaddress, longitude, latitude, availability, image, category, price, userId).then((products) => {
//             res.status(201).send(products)
//             console.log(`added product: ${name}`);
//         })
//     };
// });
// geocode(address).then((geocodedaddress) => {
//     console.log(geocodedaddress)

//     usersProductsDB.addNewProduct(name, description, address, geocodedaddress[0].longitude, geocodedaddress[0].latitude, availability, image, category, price, userId).then((products) => {
//         res.status(201).send(products)
//         console.log(products)
//         console.log(`added product: ${name}`);
//     })
// });

// usersProductsController.patch("/:id", sessionAuth, (req, res) => { //update product all parameters
//     const { name, description, address, availability, image, category, price } = req.body
//     console.log(req.body)
//     const productId = req.params.id
//     console.log(productId)
//     const userId = req.session.userId
//     console.log(userId)

//     if (name === undefined || name === '' || name.length > 20) {
//         res.status(400).json({ message: 'name not defined' })
//         return
//     } else if (description === undefined || description === '' || description.length > 50) {
//         res.status(400).json({ message: 'description not defined' })
//         return
//     } else if (address === undefined || address === '' || address.length > 20) {
//         res.status(400).json({ message: 'address not defined' })
//         return
//     } else if (availability === undefined || availability === '') {
//         res.status(400).json({ message: 'availbility not defined' })
//         return
//     } else if (image === undefined || image === '') {
//         res.status(400).json({ message: 'imageurl not defined' })
//         return
//     } else if (category === undefined || category === '') {
//         res.status(400).json({ message: 'category not defined' })
//     } else if (price === undefined || price === '' ) {
//         res.status(400).json({ message: 'price not defined' })
//     } else {
//         usersProductsDB.addNewProduct(name, description, address, availability, image, category, price, productId, userId).then((products) => {
//             res.status(201).json( products, {message: "Product updated" } );
//             console.log(`updated product: ${name}`);
//         });
//     }
// });
// async function geocode(address) {
//     const geocodedresponse = await geocoder.geocode(address)
//     return geocodedresponse;
// }
//Need to add update product by ONE Parameter
module.exports = usersProductsController;
