const express = require('express');
const session = express.Router();
const Sessions = require("../models/sessions");

session.get("/", (req, res) => {
    Sessions.getAll().then((sessions)=> {
        res.json(sessions);
    });
})

session.delete("/" , (req, res) => {  
    req.session.destroy();
    res.json({"message":"You have successfully logged out"});
});

module.exports = session;