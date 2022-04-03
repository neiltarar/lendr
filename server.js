const express = require("express");
const app = express();
const port = process.env.PORT || 6455;
const sessionAuth = require("./middleware/sessionAuth");
const sessionLogger = require("./middleware/logger");
const sessionController = require("./controllers/sessions");
const usersController = require("./controllers/users");
const productsController = require("./controllers/products");
const usersProductsController = require("./controllers/usersProducts");
const db = require("./database/db");
const dotenv = require("dotenv");
dotenv.config();
const expressSession = require("express-session");

// Connect to the DB and create session Table
const connectPgSimple = require("connect-pg-simple");
const pgSession = connectPgSimple(expressSession);

//conversations controller
const conversationsController = require("./controllers/conversations");
const messagesController = require("./controllers/messages");

//Images controller

app.use(express.static("client"));
app.use(express.json({ limit: "10mb" }));

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
    saveUninitialized: false, //gets rid of deprecated pmessages
  })
);

app.use("/", sessionLogger);
app.use("/api/users", usersController);
app.use("/api/sessions", sessionController);
app.use("/api/products", productsController);
app.use("/api/users/products", sessionAuth, usersProductsController);
app.use("/api/conversations", conversationsController);
app.use("/api/messages", messagesController);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
