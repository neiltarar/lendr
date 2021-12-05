const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

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
const imagesController = require("./controllers/images");



app.use(express.static("client"));
app.use(express.json({ limit: "10mb" }));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;


//Cloudinary
const cloudinary = require("cloudinary").v2;


// // cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

app.get("/api/images", (req, res) => {
    res.json({ message: "image upload" });
  });
  
  // image upload API
  app.post("/api/images", (req, res) => {
    console.log(req.body)
    const data = {
        image: req.body.image, 
        }
        console.log(data)
        // upload image here
        cloudinary.uploader.upload(data.image)
        .then((result) => {
            response.status(200).send({
              message: "success",
              result,
            });
          }).catch((error) => {
            response.status(500).send({
              message: "failure",
              error,
            });
          });
    }
  );

//Cloudinary end

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
app.use("/api/users/products", usersProductsController);
app.use("/api/conversations", conversationsController);
app.use("/api/messages", messagesController);
// app.use("/api/images", imagesController);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
