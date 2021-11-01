const express = require("express");
const conversationsController = express.Router();
const Conversations = require("../models/conversations");
const sessionAuth = require("../middleware/sessionAuth");

conversationsController.get("/", (req, res)=> {
    Conversations.getAll().then((conversations)=>{
        res.json(conversations);
    })
})

conversationsController.get("/product/:id", (req, res)=>{
    const id = req.params.id;
    console.log("getting convo by product id", id);
    Conversations.getConvoData(id).then((conversation) => {
        res.json(conversation);
      })
      .catch((err)=> console.log(err))
});


module.exports = conversationsController;