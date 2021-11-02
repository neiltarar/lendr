const express = require('express');
const session = express.Router();
const Sessions = require("../models/sessions");

session.get("/", (req, res) => {
    Sessions.getSession().then((sessions)=> {

        if (sessions) {
            for (const [key,value] of Object.entries(sessions)) {

                if (key, value["username"] && value["userId"]) {
                    return res.json(sessions)
                } 
            }
        } else {
            console.log("no user in session")
        }
    });
})

session.delete("/" , (req, res) => {  
    req.session.destroy();
    res.json({message: "You have successfully logged out"});
});

module.exports = session;