const express = require('express');
const signup = express.Router();

signup.post("/" , (req, res) => {
    console.log(req.body);
    res.json({ "status" : "post req received"})
});

module.exports = signup;