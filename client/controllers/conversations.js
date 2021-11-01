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
    const sessionUserId = req.session.userId;
    const productOwnerId = 
    console.log("getting convo by product id", id);
    Conversations.getConvoData(id, productOwnerId, sessionUserId).then((conversation) => {
        if(conversation){
            res.json(conversation);
        }else {
            res.status(500).json({ message: "Cannot fetch conversation" });
        }
        
      })
      .catch((err)=> console.log(err))
});

conversationsController.post("/", (req, res)=>{
    console.log(req.body);
    const sessionuser_id = req.session.userId;
    
    Conversations.insertConversation(subject, date, productowner_id, sessionuser_id ).then((conversation) => {
        
        
      })
      
});


module.exports = conversationsController;