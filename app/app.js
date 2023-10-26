const express = require('express');
const morgan = require('morgan');
const { readdirSync } = require('fs');
const path = require('path');

// Initialize the Express application
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Log requests to the console (Express 4)

// Initialize staff route
const staffPath = path.join(__dirname, '../routes/staff');

// Use readdirSync to read the files in the staff directory
readdirSync(staffPath).forEach((fileName) => {
  // Construct the full path to the route file
  const routeFilePath = path.join(staffPath, fileName);

  // Require the route file and use it with '/api/v1' as the base path
  app.use('/api/v1', require(routeFilePath));
});

// const academicPath = path.join(__dirname,"../routes/academic")
// Define a default route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Handle invalid routes
app.all('*', (req, res) => {
  res.send('Invalid Route');
});

module.exports = app;
