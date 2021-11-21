const express = require("express");
const messagesController = express.Router();
const Messages = require("../models/messages");
const sessionAuth = require("../middleware/sessionAuth");

messagesController.post("/", (req, res) => {
  console.log("here is the request: " + req.body["message"]);
  res.json({ status: `OK` });
});

module.exports = messagesController;
