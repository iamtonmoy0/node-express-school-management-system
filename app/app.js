const express = require('express');
const morgan = require('morgan');

// initialize application
const app = express();

// middleware
app.use(morgan('dev')); // log requests to the console (Express4)

module.exports=app