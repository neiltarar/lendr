const express = require('express');
const session = express.Router();

session.get("/", (req, res) => {
    if (req.session.username) {
        res.status(200).json({message: `Welcome back, ${req.session.username}`, username: req.session.username, userId: req.session.userId});
        
    } else {
        res.status(401).json({message: "You are not logged in"});
    }
})

session.delete("/" , (req, res) => {  
    req.session.destroy();
    res.json({message: "You have successfully logged out"});
});

module.exports = session;