const express = require("express");
const signupChecker = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcrypt");

signupChecker.post('/', (req, res) => {
    console.log("lets add a new user!");
    const { username, email, password, confirm_password } = req.body

    if (username === undefined || username === '' || username.length > 20) {
        res.status(400).json({error: 'username not defined'})
        return
      } else if (email === undefined || email === '' || email.length > 50 || !email.includes('@')) {
        res.status(400).json({error: 'email not defined'})
        return
      } else if (password === undefined || password === '') {
        res.status(400).json({error: 'password not defined'})
        return
      } else if (password === confirm_password) {
        console.log("Passwords match")

        const generateHash = (password) => {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        };
        let password_hash = generateHash(confirm_password)

        users.create(username, email, password_hash).then((users) => {
          res.status(201).json(users)
          console.log('added user successfully')
        })
      }
    })
module.exports = signupChecker;