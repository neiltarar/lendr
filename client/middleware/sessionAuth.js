const express = require("express");
const sessionAuth = express();
const dbModels = require('../models/users');
const bcrypt = require("bcrypt");

// Session Authentication Handled By Middleware Handler:
sessionAuth.use((req, res, next) => {
  const { email, password } = req.body;
  // Get user's name from request, look up in the database, check the password etc. 
  dbModels.getUser(email, password).then((response) => {
    const password_hash = response['password']
    console.log(password_hash)
    // res is our sql enquiry to see if there is a user with the 
    // same email and password, which comes as a list,
    // therefore if its lengts is zero it means that there is no match
    if (response.length > 0 && response !== undefined) {
      const isValidPassword = (plainTextPassword, passwordHash) => {
        return bcrypt.compareSync(plainTextPassword, passwordHash);
      };
      console.log(isValidPassword(password, password_hash))

      if (isValidPassword) {
        req.session.username = email;
        res.json({ message: `Logged in as ${email}` });
        next();
      } else {
        // if the username/password is not found in the db we throw an error
        // and we manage the error in login.js (component) by giving an alert
        // 403 means "forbidden"
        res.status(403).json({ message: "Password or Email not valid" });
        next();
      };
    };
  });
});

module.exports = sessionAuth;