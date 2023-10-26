const express = require('express');
const morgan = require('morgan');
const {readdirSync} = require('fs')
const path = require('path')

// initialize application
const app = express();
// parsing json
app.use(express.json());
// middleware
app.use(morgan('dev')); // log requests to the console (Express4)

// // initialize staff route
// const staffPath = path.join(__dirname,'../routes/staff')
// readdirSync(staffPath).map(fileName =>app.use('/api/v1',require(staffPath+fileName)));
// // initialize academic route
// const academicPath = path.join(__dirname,'../routes/academic')
// readdirSync(academicPath).map(fileName =>app.use('/api/v1',require(academicPath+fileName)));
app.get('/',(req,res)=>{
	res.send('Server is running !')
})
app.all('*',(req,res)=>{
	res.send('Invalid Route')
})

module.exports=app