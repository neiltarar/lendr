const express = require('express');
const session = express.Router();

session.delete("/" , (req, res) => {  
    req.session.destroy();
    res.json({"message":"You have successfully logged out"});
});

module.exports = session;