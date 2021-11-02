const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const sessionAuth = require('./client/middleware/sessionAuth');
const sessionLogger = require('./client/middleware/logger');
const sessionController = require('./client/controllers/sessions');
const usersController = require('./client/controllers/users');
const productsController = require('./client/controllers/products')
const usersProductsController = require('./client/controllers/usersProducts');

const db = require('./client/database/db');
const dotenv = require("dotenv");
dotenv.config();
const expressSession = require("express-session");


// Connect to the DB and create session Table
const connectPgSimple = require("connect-pg-simple");
const pgSession = connectPgSimple(expressSession);

app.use(express.static("client"));
app.use(express.json());

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

app.use(
    expressSession({
      store: new pgSession({
        pool: db, // Connects to our postgres db
        createTableIfMissing: true, // Creates a session table in your database (go look at it!)
      }),
      secret: process.env.EXPRESS_SESSION_SECRET_KEY,
      cookie: { maxAge: oneDay },
      resave: false, //gets rid of deprecated messages
      saveUninitialized: false //gets rid of deprecated messages
    })
  );

app.use("/" , sessionLogger);
app.use("/api/users" , usersController);
app.use("/api/sessions" , sessionController);
app.use("/api/products", productsController);
app.use("/api/users/products" , usersProductsController);
//conversations controller
const conversationsController = require("./client/controllers/conversations"); //Which controller to use?
const messagesController = require("./client/controllers/messages");

//Conversations
app.use("/api/conversations", conversationsController); //Which controller to use?
//Messages
// app.use("api/messages", messagesController);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});