const express = require("express");
const messagesController = express.Router();
const MessagesDB = require("../models/messages");
const conversationsDB = require("../models/conversations");
const sessionAuth = require("../middleware/sessionAuth");
const { content } = require("googleapis/build/src/apis/content");
const today = new Date();

messagesController.post("/", (req, res) => {
  const { productowner_id, sessionuser_id, productid, message } = req.body;

  //   console.log("here is the request: " + req.body["message"]);
  console.log(productowner_id, sessionuser_id, productid);
  conversationsDB
    .getConversationId(productowner_id, sessionuser_id, productid)
    .then((res) => {
      const conversation_id = res[0]["conversation_id"];
      MessagesDB.insertMessage(today, message, sessionuser_id, conversation_id);
    });
  res.json({ status: `OK` });
});

messagesController.get("/", (req, res) => {
  const userId = req.session.userId;
  const username = req.session.username;
  MessagesDB.getAllMessages(userId).then((content) => {
    console.log(content);
    res.json({ message: content, userName: username });
  });
});
module.exports = messagesController;
