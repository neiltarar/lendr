const express = require("express");
const messagesController = express.Router();
const Messages = require("../models/messages");
const sessionAuth = require("../middleware/sessionAuth");

messagesController.get("/", (req, res)=> {
    Messages.getAll().then((messages)=>{
        res.json(messages);
    })
})

messagesController.get("/conversation/:id", (req, res)=>{
    const id = req.params.id;
    // const authorId = req.session.userId;
    console.log("getting messages by convo id", id);
    // const conversationId = 1;
    Messages.getMessagesByProductId(id).then((messages) => {
        res.json(messages);
      })
      .catch((err)=> console.log(err))
});


module.exports = messagesController;