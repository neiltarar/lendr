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

//conversations controller
const conversationsController = require("./client/controllers/conversations");
const messagesController = require("./client/controllers/messages");

//Cloudinary 
const cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});

// //Google Maps // https://github.com/googlemaps/google-maps-services-js
// const {Client} = require("@googlemaps/google-maps-services-js");
// const client = new Client({});

// client
//   .elevation({
//     params: {
//       locations: [{ lat: 45, lng: -110 }],
//       key: process.env.GOOGLE_MAPS_API_KEY
//     },
//     timeout: 1000 // milliseconds
//   }, axiosInstance)
//   .then(r => {
//     console.log(r.data.results[0].elevation);
//   })
//   .catch(e => {
//     console.log(e);
//   });

//Node geo-coder//
const NodeGeocoder = require('node-geocoder');
  const options = {
  provider: 'google',
 
  // Optional depending on the providers
  // fetch: customFetchImplementation,
  apiKey: 'GOOGLE_MAPS_API_KEY', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};
const geocoderController = NodeGeocoder(options);

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
app.use("/api/users/location", geocoderController);
app.use("/api/conversations", conversationsController);
app.use("/api/messages", messagesController);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});