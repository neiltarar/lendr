const express = require("express");
const messagesController = express.Router();

messagesController.post("/", (req, res)=> {
    console.log(req.body);
})