const express = require("express");
const resultsRouter = express.Router();
// middleware
const isLoggedIn = require("../../../middlewares/isLoggedIn");
const isStudent = require("../../../middlewares/isStudent");


module.exports = resultsRouter;
