const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
require('colors');
// ports
const port = process.env.PORT || 3001;
// initialize application
const app = express();





app.listen(port,()=>{
	console.log(` server is running on port : ${port} `.black.bgGreen.bold)
})