const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const sessionAuth = require('./client/middleware/sessionAuth');
const sessionLogger = require('./client/middleware/logger');
const sessionController = require('./client/controllers/sessions');
const usersController = require('./client/controllers/users');
const db = require('./client/database/db');
const dotenv = require("dotenv");
dotenv.config();
const expressSession = require("express-session");

// Connect to the DB and create session Table
const connectPgSimple = require("connect-pg-simple");
const pgSession = connectPgSimple(expressSession);

app.use(express.static("client"));
app.use(express.json());
app.use(
    expressSession({
      store: new pgSession({
        pool: db, // Connects to our postgres db
        createTableIfMissing: true, // Creates a session table in your database (go look at it!)
      }),
      secret: process.env.EXPRESS_SESSION_SECRET_KEY,
    })
  );
// app.use("/api/sessionAuth" , sessionAuth);
app.use("/" , sessionLogger);
app.use("/api/users" , usersController);
app.use("/api/sessions" , sessionController);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});