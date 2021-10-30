const express = require("express");
const conversationsController = express.Router();
const Conversations = require("../models/conversations");

conversationsController.get("/", (req, res)=>{
    console.log("getting convo by users id");
    Conversations.getByUserId(productrowner_id, sessionuser_id).then((conversation) => {
        res.json(conversation);
      });
});
//not using it yet
// conversationsController.get("/:id", (req, res)=> {
//     const id = req.params.id;
//     console.log("get convo by id", id);
//     Conversations.getById(id).then((conversations)=> {
//         res.json(conversations);
//     });
// });

module.exports = conversationsController;