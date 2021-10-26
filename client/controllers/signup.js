const express = require('express');
const signup = express.Router();

signup.post("/" , (req, res) => {
    console.log(req.body);
    // const {email, password} = req.body;
    // res.json({ message: `Logged in as ${email}` });
    res.json({ "status" : "post req received"})
});

module.exports = signup;