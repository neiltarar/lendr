const express = require('express');
const streamifier = require('streamifier');
//Cloudinary
const cloudinary = require("cloudinary").v2;
const imagesController = express.Router();


// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
  
    api_secret: process.env.API_SECRET,
    secure: true,
  });
  
  imagesController.get("/api/images", (req, res) => {
      res.json({ message: "image upload" });
    });
    
    // image upload API
    imagesController.post("/api/images/upload-image", (req, res) => {
      const data = {
          image: req.body.image, 
          }
          // upload image here
          cloudinary.uploader.upload(data.image)
          .then((result) => {
              response.status(200).send({
                message: "success",
                result,
              });
            }).catch((error) => {
              response.status(500).send({
                message: "failure",
                error,
              });
            });
      }
    );
