const express = require("express");
const sessionAuth = express();
const dbModels = require('../models/users');

// Session Authentication Handled By Middleware Handler:
sessionAuth.use((req, res, next) => {
    const{ email, password } = req.body;

    // Get user's name from request, look up in the database, check the password etc. 
    
    dbModels.getUser(email, password).then((response) => {
    
    // res is our sql enquiry to see if there is a user with the 
    // same email and password, which comes as a list,
    // therefore if its lengts is zero it means that there is no match

    if (response.length > 0 && response !== undefined) {
      res.json({ message: `Logged in as ${email}` });
      next();
    } else {
        // if the username/password is not found in the db we throw an error
        // and we manage the error in login.js (component) by giving an alert
        // 403 means "forbidden"
        res.status(403).json({ message: "Not logged in" });
        next();
    };
  });
});
  
module.exports = sessionAuth; 

