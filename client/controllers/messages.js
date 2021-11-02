const express = require("express");
const messagesController = express.Router();
const Messages = require("../models/messages");
const sessionAuth = require("../middleware/sessionAuth");

messagesController.get("/", (req, res)=> {
    Messages.getAll().then((messages)=>{
        res.json(messages);
    })
})

messagesController.get("/product/:id", (req, res)=>{
    const id = req.params.id;
    console.log("getting messages by convo id", id);
    Messages.getMessagesByProductId(id).then((messages) => {
        res.json(messages);
      })
      .catch((err)=> console.log(err))
});


module.exports = messagesController;