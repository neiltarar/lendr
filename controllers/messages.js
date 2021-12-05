const express = require("express");
const messagesController = express.Router();
const MessagesDB = require("../models/messages");
const conversationsDB = require("../models/conversations");
const usersDB = require("../models/users");
const sessionAuth = require("../middleware/sessionAuth");
const { content } = require("googleapis/build/src/apis/content");
const today = new Date();

messagesController.post("/myMessages", (req, res) => {
  const { conversation_id, author, message } = req.body;
  console.log(message);
  MessagesDB.insertMessage(today, message, author, conversation_id);
  res.json({ status: `OK` });
});
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

messagesController.get("/:ID", (req, res) => {
  console.log("request: ", req.params.ID);
  const sentById = req.params.ID;
  console.log(sentById);
  usersDB.getUserName(sentById).then((content) => {
    sentBy = content[0]["username"];
    console.log("sent by " + sentBy);
    res.json({ sentBy: sentBy });
  });
});

messagesController.get("/", (req, res) => {
  const userId = req.session.userId;
  console.log("iser id: ", userId);
  const username = req.session.username;
  MessagesDB.getAllMessages(userId).then((content) => {
    res.json({ message: content, userName: username, userID: userId });
  });
});
module.exports = messagesController;
