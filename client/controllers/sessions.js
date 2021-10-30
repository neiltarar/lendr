const express = require('express');
const session = express.Router();
const Sessions = require("../models/sessions");

session.get("/", (req, res) => {
    Sessions.getAll().then((sessions)=> {
        res.json(sessions);
    });
})

session.delete("/" , (req, res) => {  
    res.json({"status":"ok"});
});

module.exports = session;