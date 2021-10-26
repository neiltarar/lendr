const express = require('express');
const session = express.Router();

session.delete("/" , (req, res) => {  
    res.json({"status":"ok"});
});

module.exports = session;