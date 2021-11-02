const express = require("express");
const usersController = express.Router();
const usersDB = require("../models/users");
const bcrypt = require("bcrypt");

usersController.post('/login', (req, res) => {
  
  const { email, password } = req.body
  // Get user's name from request, look up in the database, check the password etc. 
  usersDB.getUser(email).then((response) => {
    console.log(response)
    const password_hash = response[0]['password']
    const userId = response[0]['user_id'];
    console.log(password_hash)
    //   // res is our sql enquiry to see if there is a user with the 
    //   // same email and password, which comes as a list,
    //   // therefore if its lengts is zero it means that there is no match
    if (response.length > 0) {
      const isValidPassword = (plainTextPassword, passwordHash) => {
        return bcrypt.compareSync(plainTextPassword, passwordHash);
      };
      console.log(isValidPassword(password, password_hash))


      if (isValidPassword(password, password_hash)) {
        req.session.username = email;
        req.session.userId = userId;
        console.log(userId);
        res.json({ message: `Logged in as ${email}` });
        console.log("correct login")
      } else {
        // if the username/password is not found in the db we throw an error
        // and we manage the error in login.js (component) by giving an alert
        // 403 means "forbidden"
        console.log("incorrect login")
        res.status(403).json({ message: "Password or Email not valid" });
      };
    };
  });
});

usersController.post('/signup', (req, res) => {
  console.log("lets add a new user!");
  console.log(req.body);
  res.json({ "status": "post req received" });
  const { username, email, password, confirm_password } = req.body;

  if (username === undefined || username === '' || username.length > 20) {
    res.status(400).json({ error: 'username not defined' });
    return;
  } else if (email === undefined || email === '' || email.length > 50 || !email.includes('@')) {
    res.status(400).json({ error: 'email not defined' });
    return;
  } else if (password === undefined || password === '') {
    res.status(400).json({ error: 'password not defined' })
    return;
  } else if (password === confirm_password) {
    console.log("Passwords match");
    const generateHash = (password) => {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };
    let password_hash = generateHash(confirm_password);
    usersDB.create(username, email, password_hash).then((users) => {
      res.status(201).json(users)
      console.log('added user successfully')
    });
    
  };
});

module.exports = usersController;