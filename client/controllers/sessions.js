const express = require('express');
const session = express.Router();

session.post("/" , (req, res) => {
    console.log(req.body);
    res.json({"status":"ok"});
});

module.exports = session;