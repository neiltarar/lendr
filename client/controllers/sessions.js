const express = require('express');
const session = express.Router();

session.get("/", (req, res) => {
    if (req.session.username) {
        res.json({message: `You are logged in as ${req.session.username}`});
        console.log(req.session.username)
    } else {
        res.json({message: "You are not logged in"});
    }
})

session.delete("/" , (req, res) => {  
    req.session.destroy();
    res.json({message: "You have successfully logged out"});
});

module.exports = session;