const express = require("express");
const productsController = express.Router();
const productsDB = require("../models/users");
const sessionAuth = require("../middleware/sessionAuth")